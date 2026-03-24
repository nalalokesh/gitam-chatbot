import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { LogOut, MessageSquare, User, TrendingUp, Calendar, DollarSign } from "lucide-react";
import { toast } from "sonner";
import { StudentChatbot } from "@/components/StudentChatbot";
import api from "@/utils/api";

const StudentDashboard = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<any>(null);
  const [academicData] = useState<any>({
    cgpa: 8.5,
    attendance_percentage: 92.0,
    sgpa: 8.8,
    tuition_paid: true
  });
  const [loading, setLoading] = useState(true);
  const [randomSemester] = useState(() => Math.floor(Math.random() * 8) + 1);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await api.get('/auth/profile');
      setProfile(response.data);
    } catch (error: any) {
      console.error("Error fetching profile:", error);
      if (error.response?.status === 401) {
        toast.error("Session expired. Please log in again.");
      } else {
        toast.error("Failed to load profile data");
      }
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('role');
      navigate("/");
    } finally {
      setLoading(false);
    }
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

  const userEmail = profile?.email || "";
  const derivedUsername = profile?.username && profile.username !== "Not set" 
    ? profile.username 
    : userEmail.split('@')[0] || "Student";

  const initials = derivedUsername.charAt(0).toUpperCase() || "S";

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold">GITAM Student Portal</h1>
              <p className="text-sm text-muted-foreground">Welcome back, {derivedUsername}</p>
            </div>
          </div>
          <Button onClick={handleLogout} variant="outline" size="sm">
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left side - Profile and Academic Info */}
          <div className="lg:col-span-1 space-y-6">
            {/* Profile Card */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-4">
                  <Avatar className="w-16 h-16">
                    <AvatarFallback className="bg-gradient-primary text-white text-xl">
                      {initials}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle>{derivedUsername}</CardTitle>
                    <CardDescription>{profile?.registration_no || "Not set"}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-sm">
                  <span className="text-muted-foreground">Username:</span>
                  <p className="font-medium">{derivedUsername}</p>
                </div>
                <div className="text-sm">
                  <span className="text-muted-foreground">Email:</span>
                  <p className="font-medium">{profile?.email}</p>
                </div>
                <div className="text-sm">
                  <span className="text-muted-foreground">Campus:</span>
                  <p className="font-medium">{profile?.campus || "VSKP"}</p>
                </div>
                <div className="text-sm">
                  <span className="text-muted-foreground">Branch:</span>
                  <p className="font-medium">{profile?.branch || "CSE"}</p>
                </div>
                <div className="text-sm">
                  <span className="text-muted-foreground">Semester:</span>
                  <p className="font-medium">{profile?.semester || randomSemester}</p>
                </div>
              </CardContent>
            </Card>

            {/* Academic Cards */}
            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardHeader className="pb-3">
                  <TrendingUp className="w-5 h-5 text-primary mb-2" />
                  <CardTitle className="text-sm">CGPA</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">{academicData?.cgpa?.toFixed(2) || "N/A"}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <Calendar className="w-5 h-5 text-secondary mb-2" />
                  <CardTitle className="text-sm">Attendance</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">
                    {academicData?.attendance_percentage?.toFixed(1) || "N/A"}%
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <TrendingUp className="w-5 h-5 text-primary mb-2" />
                  <CardTitle className="text-sm">SGPA</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">{academicData?.sgpa?.toFixed(2) || "N/A"}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <DollarSign className="w-5 h-5 text-success mb-2" />
                  <CardTitle className="text-sm">Tuition</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm font-medium">
                    {academicData?.tuition_paid ? "Paid ✓" : "Pending"}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Right side - Chatbot */}
          <div className="lg:col-span-2">
            <Card className="h-[calc(100vh-12rem)]">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
                    <MessageSquare className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <CardTitle>AI Student Assistant</CardTitle>
                    <CardDescription>
                      Ask me anything about academics, fees, placements, or campus life
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="h-[calc(100%-6rem)]">
                <StudentChatbot />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
