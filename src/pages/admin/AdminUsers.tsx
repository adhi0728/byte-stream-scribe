
import { useState } from "react";
import { AdminLayout } from "@/components/admin-layout";
import { useBlog } from "@/contexts/blog-context";
import { toast } from "sonner";
import { UsersHeader } from "@/components/admin/user/UsersHeader";
import { UsersFilter } from "@/components/admin/user/UsersFilter";
import { UsersTable } from "@/components/admin/user/UsersTable";
import { DeleteUserDialog } from "@/components/admin/user/DeleteUserDialog";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar: string;
  createdAt: string;
  status: string;
}

const AdminUsers = () => {
  const { users: initialUsers } = useBlog();
  const users = initialUsers as User[];
  
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState("all");
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [usersToDelete, setUsersToDelete] = useState<string[]>([]);
  
  // Get unique roles
  const roles = ["all", ...Array.from(new Set(users.map(user => user.role)))];

  // Filter users
  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesRole = selectedRole === "all" || user.role === selectedRole;
    
    return matchesSearch && matchesRole;
  });

  // Handle select all users
  const toggleSelectAll = () => {
    if (selectedUsers.length === filteredUsers.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(filteredUsers.map(user => user.id));
    }
  };

  // Handle select user
  const toggleSelectUser = (id: string) => {
    if (selectedUsers.includes(id)) {
      setSelectedUsers(selectedUsers.filter(userId => userId !== id));
    } else {
      setSelectedUsers([...selectedUsers, id]);
    }
  };

  // Handle delete confirmation
  const confirmDelete = (ids: string[]) => {
    setUsersToDelete(ids);
    setDeleteDialogOpen(true);
  };

  // Handle delete user(s)
  const handleDeleteUsers = () => {
    toast.success(`${usersToDelete.length} user(s) deleted`);
    setSelectedUsers(selectedUsers.filter(id => !usersToDelete.includes(id)));
    setDeleteDialogOpen(false);
    setUsersToDelete([]);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <UsersHeader />
        
        <UsersFilter 
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedRole={selectedRole}
          setSelectedRole={setSelectedRole}
          roles={roles}
          selectedUsers={selectedUsers}
          confirmDelete={confirmDelete}
        />
        
        <UsersTable 
          users={filteredUsers}
          selectedUsers={selectedUsers}
          toggleSelectUser={toggleSelectUser}
          toggleSelectAll={toggleSelectAll}
          confirmDelete={confirmDelete}
        />
        
        <DeleteUserDialog 
          open={deleteDialogOpen}
          setOpen={setDeleteDialogOpen}
          usersToDelete={usersToDelete}
          onDelete={handleDeleteUsers}
        />
      </div>
    </AdminLayout>
  );
};

export default AdminUsers;
