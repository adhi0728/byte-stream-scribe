
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const DashboardHeader = () => {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-muted-foreground">
          Welcome to your blog administration dashboard.
        </p>
      </div>
      <Button asChild>
        <Link to="/admin/posts/new">
          <div className="flex items-center">
            <Plus className="mr-2 h-4 w-4" />
            <span>New Post</span>
          </div>
        </Link>
      </Button>
    </div>
  );
};

export default DashboardHeader;
