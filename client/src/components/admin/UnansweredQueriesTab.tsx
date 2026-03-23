import { useEffect, useState } from "react";
import api from "@/utils/api";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Loader2, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const categoryOptions = [
  "Academics",
  "Admissions",
  "Fees",
  "Attendance",
  "Placements",
  "Hostel",
  "General",
];

export const UnansweredQueriesTab = () => {
  const [queries, setQueries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [answerText, setAnswerText] = useState<Record<string, string>>({});
  const [selectedCategory, setSelectedCategory] = useState<Record<string, string>>({});
  const [generatingFor, setGeneratingFor] = useState<string | null>(null);
  const [savingFor, setSavingFor] = useState<string | null>(null);

  useEffect(() => {
    fetchUnansweredQueries();
  }, []);

  const fetchUnansweredQueries = async () => {
    try {
      const { data } = await api.get("/admin/unanswered");
      setQueries(data || []);
    } catch (error) {
      console.error("Error fetching queries:", error);
    } finally {
      setLoading(false);
    }
  };

  const generateSuggestion = async (queryId: string, question: string) => {
    setGeneratingFor(queryId);
    try {
      // Use our own chat bot to see if it can generate a draft
      const { data } = await api.post("/chat/ask", {
        question: question,
        userId: 'admin_test'
      });

      setAnswerText((prev) => ({ ...prev, [queryId]: data.answer }));
      toast.success("Answer suggestion generated!");
    } catch (error: any) {
      console.error("Error generating answer:", error);
      toast.error("Failed to generate suggestion");
    } finally {
      setGeneratingFor(null);
    }
  };

  const saveAnswer = async (queryId: string, question: string, answer: string, category: string) => {
    if (!answer.trim()) {
      toast.error("Please provide an answer");
      return;
    }

    setSavingFor(queryId);
    try {
      await api.post(`/admin/resolve/${queryId}`, {
        answer,
        category: category || "General",
        keywords: question.split(" ") // Simple keyword extraction
      });

      toast.success("Answer saved and added to knowledge base!");
      fetchUnansweredQueries();
      setAnswerText((prev) => {
        const newState = { ...prev };
        delete newState[queryId];
        return newState;
      });
    } catch (error: any) {
      console.error("Error saving answer:", error);
      toast.error("Failed to save answer");
    } finally {
      setSavingFor(null);
    }
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="py-8">
          <div className="text-center text-muted-foreground">Loading queries...</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Unanswered Queries</CardTitle>
        <CardDescription>
          Review and answer student queries not found in the knowledge base
        </CardDescription>
      </CardHeader>
      <CardContent>
        {queries.length === 0 ? (
          <div className="text-center text-muted-foreground py-8">
            No unanswered queries at the moment!
          </div>
        ) : (
          <div className="space-y-6">
            {queries.map((query) => (
              <Card key={query._id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-base">
                        Guest / Student ({query.askedBy})
                      </CardTitle>
                      <CardDescription>
                        {new Date(query.date).toLocaleString()}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="font-medium text-sm text-muted-foreground mb-1">Question:</p>
                    <p className="text-sm bg-muted p-3 rounded-lg">{query.question}</p>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-medium text-sm text-muted-foreground">Your Answer:</p>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => generateSuggestion(query._id, query.question)}
                        disabled={generatingFor === query._id}
                      >
                        {generatingFor === query._id ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Generating...
                          </>
                        ) : (
                          <>
                            <Sparkles className="w-4 h-4 mr-2" />
                            Generate with AI
                          </>
                        )}
                      </Button>
                    </div>
                    <Textarea
                      value={answerText[query._id] || ""}
                      onChange={(e) =>
                        setAnswerText((prev) => ({ ...prev, [query._id]: e.target.value }))
                      }
                      placeholder="Type your answer here..."
                      className="min-h-[100px] mb-2"
                    />
                    <Select
                      value={selectedCategory[query._id] || "General"}
                      onValueChange={(value) => setSelectedCategory(prev => ({ ...prev, [query._id]: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select Category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categoryOptions.map((cat) => (
                          <SelectItem key={cat} value={cat}>
                            {cat}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <Button
                    onClick={() => saveAnswer(query._id, query.question, answerText[query._id] || "", selectedCategory[query._id])}
                    disabled={!answerText[query._id] || savingFor === query._id}
                    className="w-full"
                  >
                    {savingFor === query._id ? "Saving..." : "Save Answer & Add to KB"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
