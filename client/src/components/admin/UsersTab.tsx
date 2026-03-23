import { useEffect, useState } from "react";
import api from "@/utils/api";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";

export const UsersTab = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [viewType, setViewType] = useState<'student' | 'teacher'>('student');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const { data } = await api.get('/admin/users');
      setUsers(data || []);
    } catch (err) {
      console.error("Failed to fetch users", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // 1. Filter by View Type
    let filtered = users.filter(user => {
      if (viewType === 'student') {
        return user.role === 'student';
      }
      if (viewType === 'teacher') {
        // Include admins and anyone with a designation
        return user.role === 'admin' || user.role === 'faculty' || !!user.designation;
      }
      return true;
    });

    // 2. Filter by Search Term
    if (searchTerm) {
      filtered = filtered.filter(
        (user) =>
          user.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.registration_no?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (user.designation && user.designation.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    setFilteredUsers(filtered);
  }, [searchTerm, users, viewType]);

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center flex-wrap gap-4">
          <div>
            <CardTitle>User Management</CardTitle>
            <CardDescription>View and manage {viewType} accounts</CardDescription>
          </div>
          {/* <div className="flex gap-2 bg-muted p-1 rounded-lg">
            <Button
              variant={viewType === 'student' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewType('student')}
            >
              Students
            </Button>
            <Button
              variant={viewType === 'teacher' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewType('teacher')}
            >
              Teachers
            </Button>
          </div> */}
        </div>

        <div className="relative mt-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder={`Search ${viewType}s by name, email, or ID...`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="text-center text-muted-foreground py-8">Loading users...</div>
        ) : (
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>
                    {viewType === 'student' ? 'Student Name' : 'Faculty Name'}
                  </TableHead>
                  <TableHead>Email</TableHead>
                  {viewType === 'teacher' && <TableHead>Designation</TableHead>}
                  <TableHead>{viewType === 'student' ? 'Reg No.' : 'Emp ID'}</TableHead>
                  <TableHead>Campus</TableHead>
                  <TableHead>{viewType === 'teacher' ? 'Department' : 'Branch'}</TableHead>
                  <TableHead>Phone</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                      No {viewType}s found.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredUsers.map((user) => (
                    <TableRow key={user._id}>
                      <TableCell className="font-medium">{user.username}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      {viewType === 'teacher' && <TableCell>{user.designation || 'Faculty'}</TableCell>}
                      <TableCell>{user.registration_no || "-"}</TableCell>
                      <TableCell>{user.campus || "-"}</TableCell>
                      <TableCell>{user.branch || "-"}</TableCell>
                      <TableCell>{user.phone || "-"}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
