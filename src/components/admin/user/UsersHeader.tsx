
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export const UsersHeader = () => {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Users</h2>
        <p className="text-muted-foreground">
          Manage user accounts and permissions.
        </p>
      </div>
      <Button>
        <Plus className="mr-2 h-4 w-4" />
        Add User
      </Button>
    </div>
  );
};
