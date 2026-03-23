import { useEffect, useState } from "react";
import api from "@/utils/api";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Plus, Pencil, Trash2, Search } from "lucide-react";
import { toast } from "sonner";

const categoryOptions = [
  "Academics",
  "Admissions",
  "Fees",
  "Attendance",
  "Placements",
  "Hostel",
  "General",
];

export const KnowledgeBaseTab = () => {
  const [kbEntries, setKbEntries] = useState<any[]>([]);
  const [filteredEntries, setFilteredEntries] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingEntry, setEditingEntry] = useState<any>(null);

  const [formData, setFormData] = useState({
    question: "",
    answer: "",
    category: "General",
    keywords: "",
  });

  useEffect(() => {
    fetchKBEntries();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const filtered = kbEntries.filter(
        (entry) =>
          entry.question?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          entry.answer?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredEntries(filtered);
    } else {
      setFilteredEntries(kbEntries);
    }
  }, [searchTerm, kbEntries]);

  const fetchKBEntries = async () => {
    try {
      const { data } = await api.get("/admin/queries");
      setKbEntries(data || []);
      setFilteredEntries(data || []);
    } catch (error) {
      console.error("Error fetching KB entries:", error);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      question: "",
      answer: "",
      category: "General",
      keywords: "",
    });
    setEditingEntry(null);
  };

  const handleOpenDialog = (entry?: any) => {
    if (entry) {
      setEditingEntry(entry);
      setFormData({
        question: entry.question,
        answer: entry.answer,
        category: entry.category,
        keywords: entry.keywords?.join(", ") || "",
      });
    } else {
      resetForm();
    }
    setDialogOpen(true);
  };

  const handleSave = async () => {
    if (!formData.question || !formData.answer) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      const payload = {
        question: formData.question,
        answer: formData.answer,
        category: formData.category,
        keywords: formData.keywords ? formData.keywords.split(",").map((t) => t.trim()) : [],
      };

      if (editingEntry) {
        await api.put(`/admin/queries/${editingEntry._id}`, payload);
        toast.success("Query updated successfully!");
      } else {
        await api.post("/admin/queries", payload);
        toast.success("Query added successfully!");
      }

      fetchKBEntries();
      setDialogOpen(false);
      resetForm();
    } catch (error) {
      console.error("Error saving KB entry:", error);
      toast.error("Failed to save KB entry");
    }
  };

  const handleDelete = async (entry: any) => {
    if (!confirm("Are you sure you want to delete this entry?")) return;

    try {
      await api.delete(`/admin/queries/${entry._id}`);
      toast.success("Query deleted successfully!");
      fetchKBEntries();
    } catch (error) {
      console.error("Error deleting KB entry:", error);
      toast.error("Failed to delete KB entry");
    }
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="py-8">
          <div className="text-center text-muted-foreground">Loading knowledge base...</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Knowledge Base Management</CardTitle>
            <CardDescription>Manage Q&A entries for the AI assistant</CardDescription>
          </div>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => handleOpenDialog()}>
                <Plus className="w-4 h-4 mr-2" />
                Add Entry
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>{editingEntry ? "Edit" : "Add"} KB Entry</DialogTitle>
                <DialogDescription>
                  {editingEntry ? "Update" : "Create"} a knowledge base entry
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div>
                  <Label htmlFor="question">Question *</Label>
                  <Input
                    id="question"
                    value={formData.question}
                    onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                    placeholder="e.g. When do exams start?"
                  />
                </div>
                <div>
                  <Label htmlFor="answer">Answer *</Label>
                  <Textarea
                    id="answer"
                    value={formData.answer}
                    onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
                    placeholder="Detailed answer..."
                    className="min-h-[100px]"
                  />
                </div>
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => setFormData({ ...formData, category: value })}
                  >
                    <SelectTrigger id="category">
                      <SelectValue />
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
                <div>
                  <Label htmlFor="keywords">Keywords (comma-separated)</Label>
                  <Input
                    id="keywords"
                    value={formData.keywords}
                    onChange={(e) => setFormData({ ...formData, keywords: e.target.value })}
                    placeholder="exams, date, schedule"
                  />
                </div>
                <Button onClick={handleSave} className="w-full">
                  {editingEntry ? "Update" : "Add"} Entry
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
        <div className="relative mt-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search knowledge base..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </CardHeader>
      <CardContent>
        {filteredEntries.length === 0 ? (
          <div className="text-center text-muted-foreground py-8">
            {searchTerm ? "No entries found matching your search" : "No knowledge base entries yet"}
          </div>
        ) : (
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Question</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Keywords</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredEntries.map((entry) => (
                  <TableRow key={entry._id}>
                    <TableCell className="font-medium max-w-xs truncate">
                      {entry.question}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{entry.category}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {entry.keywords?.slice(0, 3).map((tag: string) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => handleOpenDialog(entry)}
                        >
                          <Pencil className="w-4 h-4" />
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => handleDelete(entry)}
                        >
                          <Trash2 className="w-4 h-4 text-destructive" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
