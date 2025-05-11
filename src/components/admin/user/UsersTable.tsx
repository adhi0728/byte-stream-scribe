
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { UserTableRow } from "./UserTableRow";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar: string;
  createdAt: string;
  status: string;
}

interface UsersTableProps {
  users: User[];
  selectedUsers: string[];
  toggleSelectUser: (id: string) => void;
  toggleSelectAll: () => void;
  confirmDelete: (ids: string[]) => void;
}

export const UsersTable = ({
  users,
  selectedUsers,
  toggleSelectUser,
  toggleSelectAll,
  confirmDelete
}: UsersTableProps) => {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">
              <Checkbox 
                checked={
                  users.length > 0 && 
                  selectedUsers.length === users.length
                }
                onCheckedChange={toggleSelectAll}
                aria-label="Select all users"
              />
            </TableHead>
            <TableHead>User</TableHead>
            <TableHead className="hidden md:table-cell">Email</TableHead>
            <TableHead className="hidden md:table-cell">Role</TableHead>
            <TableHead className="hidden lg:table-cell">Created</TableHead>
            <TableHead className="hidden lg:table-cell">Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="h-24 text-center">
                No users found.
              </TableCell>
            </TableRow>
          ) : (
            users.map((user) => (
              <UserTableRow 
                key={user.id}
                user={user}
                isSelected={selectedUsers.includes(user.id)}
                onSelect={toggleSelectUser}
                onDelete={confirmDelete}
              />
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};
