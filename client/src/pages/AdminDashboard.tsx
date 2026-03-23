import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LogOut, Users, MessageSquareText, Database, FileText } from "lucide-react";
import { toast } from "sonner";
import { UsersTab } from "@/components/admin/UsersTab";
import { UnansweredQueriesTab } from "@/components/admin/UnansweredQueriesTab";
import { KnowledgeBaseTab } from "@/components/admin/KnowledgeBaseTab";
import { ChangeLogsTab } from "@/components/admin/ChangeLogsTab";
import { FacultyTab } from "@/components/admin/FacultyTab";
import { UserCheck } from "lucide-react";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [profile] = useState<any>({ full_name: "Admin User", role: "admin" });

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = () => {
    const token = sessionStorage.getItem('token');
    const role = sessionStorage.getItem('role');

    if (!token || role !== 'admin') {
      navigate("/");
    }
    setLoading(false);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('role');
    navigate("/");
    toast.success("Logged out successfully");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
            <p className="text-sm text-muted-foreground">Welcome, {profile?.full_name}</p>
          </div>
          <Button onClick={handleLogout} variant="outline" size="sm">
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="kb" className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-8">
            {/* Swapped order to prioritize KB */}
            <TabsTrigger value="kb" className="gap-2">
              <Database className="w-4 h-4" />
              Knowledge Base
            </TabsTrigger>
            <TabsTrigger value="queries" className="gap-2">
              <MessageSquareText className="w-4 h-4" />
              Unanswered Queries
            </TabsTrigger>
            <TabsTrigger value="users" className="gap-2">
              <Users className="w-4 h-4" />
              Users
            </TabsTrigger>
            <TabsTrigger value="faculty" className="gap-2">
              <UserCheck className="w-4 h-4" />
              Faculty
            </TabsTrigger>
            <TabsTrigger value="logs" className="gap-2">
              <FileText className="w-4 h-4" />
              Change Logs
            </TabsTrigger>
          </TabsList>

          <TabsContent value="users">
            <UsersTab />
          </TabsContent>

          <TabsContent value="faculty">
            <FacultyTab />
          </TabsContent>

          <TabsContent value="queries">
            <UnansweredQueriesTab />
          </TabsContent>

          <TabsContent value="kb">
            <KnowledgeBaseTab />
          </TabsContent>

          <TabsContent value="logs">
            <ChangeLogsTab />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
