
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, FileText, User, Settings } from "lucide-react";

const QuickActions = () => {
  return (
    <Card className="lg:col-span-3">
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
        <CardDescription>
          Common administration tasks.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <Button className="w-full justify-start">
          <Link to="/admin/posts/new" className="flex items-center w-full">
            <Plus className="mr-2 h-4 w-4" />
            <span>Create new post</span>
          </Link>
        </Button>
        <Button variant="outline" className="w-full justify-start">
          <Link to="/admin/users" className="flex items-center w-full">
            <User className="mr-2 h-4 w-4" />
            <span>Manage users</span>
          </Link>
        </Button>
        <Button variant="outline" className="w-full justify-start">
          <Link to="/admin/posts" className="flex items-center w-full">
            <FileText className="mr-2 h-4 w-4" />
            <span>View all posts</span>
          </Link>
        </Button>
        <Button variant="outline" className="w-full justify-start">
          <Link to="/admin/settings" className="flex items-center w-full">
            <Settings className="mr-2 h-4 w-4" />
            <span>Blog settings</span>
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
};

export default QuickActions;
