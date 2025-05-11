
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Trash } from "lucide-react";

interface UsersFilterProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  selectedRole: string;
  setSelectedRole: (value: string) => void;
  roles: string[];
  selectedUsers: string[];
  confirmDelete: (ids: string[]) => void;
}

export const UsersFilter = ({
  searchTerm,
  setSearchTerm,
  selectedRole,
  setSelectedRole,
  roles,
  selectedUsers,
  confirmDelete
}: UsersFilterProps) => {
  return (
    <div className="flex flex-col md:flex-row items-center gap-4">
      <div className="relative w-full md:w-auto md:flex-1">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search users..."
          className="pl-8"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <Select
        value={selectedRole}
        onValueChange={(value) => setSelectedRole(value)}
      >
        <SelectTrigger className="w-full md:w-[180px]">
          <SelectValue placeholder="Role" />
        </SelectTrigger>
        <SelectContent>
          {roles.map(role => (
            <SelectItem key={role} value={role}>
              {role === "all" ? "All Roles" : role.charAt(0).toUpperCase() + role.slice(1)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {selectedUsers.length > 0 && (
        <Button 
          variant="destructive" 
          size="sm" 
          onClick={() => confirmDelete(selectedUsers)} 
          className="w-full md:w-auto"
        >
          <Trash className="mr-2 h-4 w-4" />
          Delete {selectedUsers.length} selected
        </Button>
      )}
    </div>
  );
};
