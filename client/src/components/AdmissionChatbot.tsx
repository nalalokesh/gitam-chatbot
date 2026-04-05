import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Loader2 } from "lucide-react";
import api from "@/utils/api";
import { toast } from "sonner";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export const AdmissionChatbot = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "👋 Hello! I'm your GITAM Admission Assistant. Ask me anything about admissions, courses, fees, campus life, or placements!",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll to bottom when messages change
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setLoading(true);

    try {
      const response = await api.post("/chat/ask", {
        question: userMessage,
      });

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: response.data.answer || "I'm sorry, I couldn't process that." },
      ]);
    } catch (error: any) {
      console.error("Chat error:", error);
      toast.error("Failed to get response");
      const errorMessage = error.response?.data?.answer || "I'm having trouble connecting. Please try again.";
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: errorMessage,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[500px]">
      <ScrollArea ref={scrollAreaRef} className="flex-1 pr-4">
        <div className="space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.role === "user" ? "justify-end" : "justify-start"
                }`}
            >
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 ${message.role === "user"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-foreground"
                  }`}
              >
                <p className="text-sm whitespace-pre-wrap">{message.content}</p>
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="bg-muted rounded-2xl px-4 py-3">
                <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      <div className="flex gap-2 mt-4">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSend()}
          placeholder="Ask about admissions..."
          disabled={loading}
          className="flex-1"
        />
        <Button
          onClick={handleSend}
          disabled={loading || !input.trim()}
          size="icon"
          className="bg-secondary hover:bg-secondary-hover"
        >
          <Send className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};
