
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
        <Link to="/admin/posts/new" className="block w-full">
          <Button className="w-full justify-start flex items-center">
            <Plus className="mr-2 h-4 w-4" />
            <span>Create new post</span>
          </Button>
        </Link>
        <Link to="/admin/users" className="block w-full">
          <Button variant="outline" className="w-full justify-start flex items-center">
            <User className="mr-2 h-4 w-4" />
            <span>Manage users</span>
          </Button>
        </Link>
        <Link to="/admin/posts" className="block w-full">
          <Button variant="outline" className="w-full justify-start flex items-center">
            <FileText className="mr-2 h-4 w-4" />
            <span>View all posts</span>
          </Button>
        </Link>
        <Link to="/admin/settings" className="block w-full">
          <Button variant="outline" className="w-full justify-start flex items-center">
            <Settings className="mr-2 h-4 w-4" />
            <span>Blog settings</span>
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
};

export default QuickActions;
