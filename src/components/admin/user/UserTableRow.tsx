
import { useState } from "react";
import { toast } from "sonner";
import { TableRow, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Edit, MoreHorizontal, Shield, Ban, Trash } from "lucide-react";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar: string;
  createdAt: string;
  status: string;
}

interface UserTableRowProps {
  user: User;
  isSelected: boolean;
  onSelect: (id: string) => void;
  onDelete: (ids: string[]) => void;
}

export const UserTableRow = ({
  user,
  isSelected,
  onSelect,
  onDelete
}: UserTableRowProps) => {
  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <TableRow>
      <TableCell>
        <Checkbox 
          checked={isSelected} 
          onCheckedChange={() => onSelect(user.id)}
          aria-label={`Select ${user.name}`}
        />
      </TableCell>
      <TableCell>
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-muted overflow-hidden">
            <img 
              src={user.avatar} 
              alt={user.name}
              className="w-full h-full object-cover" 
            />
          </div>
          <span className="font-medium">{user.name}</span>
        </div>
      </TableCell>
      <TableCell className="hidden md:table-cell">
        {user.email}
      </TableCell>
      <TableCell className="hidden md:table-cell">
        <Badge variant={user.role === "admin" ? "default" : "outline"}>
          {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
        </Badge>
      </TableCell>
      <TableCell className="hidden lg:table-cell">
        {formatDate(user.createdAt)}
      </TableCell>
      <TableCell className="hidden lg:table-cell">
        <Badge 
          variant={user.status === "active" ? "outline" : "secondary"}
          className={user.status === "active" ? "text-green-500" : ""}
        >
          {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
        </Badge>
      </TableCell>
      <TableCell className="text-right">
        <div className="flex justify-end gap-2">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => toast.success(`Editing ${user.name}`)}
          >
            <Edit className="h-4 w-4" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={() => toast.success(
                  user.role === "admin" 
                    ? "User role changed to author" 
                    : "User promoted to admin"
                )}
              >
                <Shield className="mr-2 h-4 w-4" />
                {user.role === "admin" ? "Demote to Author" : "Promote to Admin"}
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => toast.success(
                  user.status === "active" 
                    ? "User has been blocked" 
                    : "User has been activated"
                )}
              >
                <Ban className="mr-2 h-4 w-4" />
                {user.status === "active" ? "Block User" : "Activate User"}
              </DropdownMenuItem>
              <DropdownMenuItem 
                className="text-destructive focus:text-destructive"
                onClick={() => onDelete([user.id])}
              >
                <Trash className="mr-2 h-4 w-4" />
                Delete User
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </TableCell>
    </TableRow>
  );
};
