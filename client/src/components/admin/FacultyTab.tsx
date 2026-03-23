import { useEffect, useState } from "react";
import api from "@/utils/api";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Search, Plus, Trash2, Edit2, Save, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

export const FacultyTab = () => {
  const [faculty, setFaculty] = useState<any[]>([]);
  const [filteredFaculty, setFilteredFaculty] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  // Edit states
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editFormData, setEditFormData] = useState<any>({});

  // Form states
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [name, setName] = useState("");
  const [facultyId, setFacultyId] = useState("");
  const [designation, setDesignation] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [room, setRoom] = useState("");

  useEffect(() => {
    fetchFaculty();
  }, []);

  const fetchFaculty = async () => {
    try {
      setLoading(true);
      const { data } = await api.get('/admin/faculty');
      setFaculty(data || []);
    } catch (err) {
      console.error("Failed to fetch faculty", err);
      toast.error("Failed to load faculty details.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (searchTerm) {
      const filtered = faculty.filter(
        (fac) =>
          fac.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          fac.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          fac.id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          fac.designation?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredFaculty(filtered);
    } else {
      setFilteredFaculty(faculty);
    }
  }, [searchTerm, faculty]);

  const handleAddFaculty = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        name,
        id: facultyId,
        designation,
        phone,
        email,
        room_no: room
      };

      await api.post('/admin/faculty', payload);
      toast.success("Faculty member added successfully!");
      setIsDialogOpen(false);
      resetForm();
      fetchFaculty();
    } catch (err) {
      toast.error("Error adding faculty member.");
      console.error(err);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (window.confirm(`Are you absolutely sure you want to delete ${name}?`)) {
      try {
        await api.delete(`/admin/faculty/${id}`);
        toast.success("Faculty member deleted!");
        fetchFaculty();
      } catch (err) {
        toast.error("Error deleting faculty member.");
        console.error(err);
      }
    }
  };

  const handleEditClick = (fac: any) => {
    setEditingId(fac.id);
    setEditFormData(fac);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditFormData({});
  };

  const handleEditChange = (field: string, value: string) => {
    setEditFormData((prev: any) => ({ ...prev, [field]: value }));
  };

  const handleSaveEdit = async (id: string) => {
    if (window.confirm("Are you sure you want to save these changes?")) {
      try {
        await api.put(`/admin/faculty/${id}`, editFormData);
        toast.success("Faculty member updated successfully!");
        setEditingId(null);
        fetchFaculty();
      } catch (err) {
        toast.error("Error updating faculty member.");
        console.error(err);
      }
    }
  };

  const resetForm = () => {
    setName("");
    setFacultyId("");
    setDesignation("");
    setPhone("");
    setEmail("");
    setRoom("");
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center flex-wrap gap-4">
          <div>
            <CardTitle>Faculty Directory</CardTitle>
            <CardDescription>Manage university faculty details</CardDescription>
          </div>
          
          <Dialog open={isDialogOpen} onOpenChange={(open) => {
            if (!open) resetForm();
            setIsDialogOpen(open);
          }}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-primary">
                <Plus className="w-4 h-4 mr-2" />
                Add Faculty
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add New Faculty</DialogTitle>
                <DialogDescription>
                  Enter the faculty details below to add them to the directory.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleAddFaculty} className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name (with Title)</Label>
                  <Input id="name" required value={name} onChange={e => setName(e.target.value)} placeholder="Dr. John Doe" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                   <div className="space-y-2">
                    <Label htmlFor="facultyId">Faculty ID</Label>
                    <Input id="facultyId" required value={facultyId} onChange={e => setFacultyId(e.target.value)} placeholder="e.g. 500241" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="designation">Designation</Label>
                    <Input id="designation" required value={designation} onChange={e => setDesignation(e.target.value)} placeholder="Professor" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" value={phone} onChange={e => setPhone(e.target.value)} placeholder="9876543210" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="room">Room No.</Label>
                    <Input id="room" value={room} onChange={e => setRoom(e.target.value)} placeholder="304 - 05" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="jdoe@gitam.edu" />
                </div>
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                  <Button type="submit">Save Faculty</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>

        </div>

        <div className="relative mt-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search faculty by name, email, or employee ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="text-center text-muted-foreground py-8">Loading faculty data...</div>
        ) : (
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Faculty Name</TableHead>
                  <TableHead>Faculty ID</TableHead>
                  <TableHead>Designation</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Room</TableHead>
                  <TableHead className="w-[80px] text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredFaculty.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                      No faculty members found.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredFaculty.map((fac) => (
                    <TableRow key={fac.id}>
                      {editingId === fac.id ? (
                        <>
                          <TableCell className="p-2"><Input value={editFormData.name || ''} onChange={(e) => handleEditChange('name', e.target.value)} /></TableCell>
                          <TableCell>{fac.id}</TableCell>
                          <TableCell className="p-2"><Input value={editFormData.designation || ''} onChange={(e) => handleEditChange('designation', e.target.value)} /></TableCell>
                          <TableCell className="p-2"><Input value={editFormData.email || ''} onChange={(e) => handleEditChange('email', e.target.value)} /></TableCell>
                          <TableCell className="p-2"><Input value={editFormData.phone || ''} onChange={(e) => handleEditChange('phone', e.target.value)} /></TableCell>
                          <TableCell className="p-2"><Input value={editFormData.room_no || ''} onChange={(e) => handleEditChange('room_no', e.target.value)} /></TableCell>
                          <TableCell className="text-right flex items-center justify-end space-x-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleSaveEdit(fac.id)}
                              title="Save Changes"
                            >
                              <Save className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={handleCancelEdit}
                              title="Cancel Edit"
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          </TableCell>
                        </>
                      ) : (
                        <>
                          <TableCell className="font-medium">{fac.name}</TableCell>
                          <TableCell>{fac.id}</TableCell>
                          <TableCell>{fac.designation}</TableCell>
                          <TableCell>{fac.email}</TableCell>
                          <TableCell>{fac.phone}</TableCell>
                          <TableCell>{fac.room_no}</TableCell>
                          <TableCell className="text-right flex items-center justify-end space-x-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleEditClick(fac)}
                              title="Edit Faculty"
                            >
                              <Edit2 className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleDelete(fac.id, fac.name)}
                              className="hover:bg-destructive hover:text-destructive-foreground"
                              title="Delete Faculty"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </TableCell>
                        </>
                      )}
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
