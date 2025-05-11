
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
        <Button asChild className="w-full justify-start">
          <Link to="/admin/posts/new">
            <Plus className="mr-2 h-4 w-4" />
            Create new post
          </Link>
        </Button>
        <Button asChild variant="outline" className="w-full justify-start">
          <Link to="/admin/users">
            <User className="mr-2 h-4 w-4" />
            Manage users
          </Link>
        </Button>
        <Button asChild variant="outline" className="w-full justify-start">
          <Link to="/admin/posts">
            <FileText className="mr-2 h-4 w-4" />
            View all posts
          </Link>
        </Button>
        <Button asChild variant="outline" className="w-full justify-start">
          <Link to="/admin/settings">
            <Settings className="mr-2 h-4 w-4" />
            Site settings
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
};

export default QuickActions;
