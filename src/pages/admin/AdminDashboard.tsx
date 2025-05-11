import { AdminLayout } from "@/components/admin-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useBlog } from "@/contexts/blog-context";
import { Plus, FileText, User, Eye, MessageSquare, Settings } from "lucide-react";
import { Link } from "react-router-dom";

import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const data = [
  {
    name: "Jan",
    total: 2400,
    views: 1200,
  },
  {
    name: "Feb",
    total: 1398,
    views: 980,
  },
  {
    name: "Mar",
    total: 9800,
    views: 4800,
  },
  {
    name: "Apr",
    total: 3908,
    views: 2600,
  },
  {
    name: "May",
    total: 4800,
    views: 3200,
  },
  {
    name: "Jun",
    total: 3800,
    views: 2900,
  },
  {
    name: "Jul",
    total: 4300,
    views: 3100,
  },
];

const AdminDashboard = () => {
  const { posts, users } = useBlog();
  
  const recentPosts = [...posts]
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, 5);

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
            <p className="text-muted-foreground">
              Welcome to your blog administration dashboard.
            </p>
          </div>
          <Button asChild>
            <Link to="/admin/posts/new">
              <Plus className="mr-2 h-4 w-4" /> New Post
            </Link>
          </Button>
        </div>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Posts
              </CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{posts.length}</div>
              <p className="text-xs text-muted-foreground">
                +2 posts this month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Page Views
              </CardTitle>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24,589</div>
              <p className="text-xs text-muted-foreground">
                +18% from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Users
              </CardTitle>
              <User className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{users.length}</div>
              <p className="text-xs text-muted-foreground">
                +2 new users this week
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Comments
              </CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">127</div>
              <p className="text-xs text-muted-foreground">
                +8% from last month
              </p>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="lg:col-span-4">
            <CardHeader>
              <CardTitle>Analytics Overview</CardTitle>
              <CardDescription>
                Views and engagement for your blog in the last 7 months.
              </CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              <ResponsiveContainer width="100%" height={350}>
                <LineChart data={data}>
                  <XAxis
                    dataKey="name"
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `${value}`}
                  />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="total"
                    stroke="#4f46e5"
                    strokeWidth={2}
                    name="Engagement"
                  />
                  <Line
                    type="monotone"
                    dataKey="views"
                    stroke="#16a34a"
                    strokeWidth={2}
                    name="Views"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle>Recent Posts</CardTitle>
              <CardDescription>
                Your most recent blog publications.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentPosts.map(post => (
                  <div key={post.id} className="flex items-start gap-4">
                    <div className="shrink-0 w-12 h-12 rounded overflow-hidden bg-muted">
                      <img 
                        src={post.coverImage} 
                        alt={post.title}
                        className="w-full h-full object-cover" 
                      />
                    </div>
                    <div className="space-y-1">
                      <Link 
                        to={`/blog/${post.id}`} 
                        className="font-medium hover:underline line-clamp-1"
                      >
                        {post.title}
                      </Link>
                      <p className="text-xs text-muted-foreground">
                        {post.publishedAt} · {post.category}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="lg:col-span-4">
            <CardHeader>
              <CardTitle>Popular Categories</CardTitle>
              <CardDescription>
                Which topics are trending on your blog.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {Array.from(new Set(posts.map(post => post.category))).map((category, index) => (
                  <div key={category} className="flex items-center">
                    <div className="w-full flex items-center">
                      <div className="w-full max-w-[50%]">
                        <p className="text-sm font-medium">{category}</p>
                      </div>
                      <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-primary" 
                          style={{ 
                            width: `${(posts.filter(post => post.category === category).length / posts.length) * 100}%` 
                          }} 
                        />
                      </div>
                      <div className="w-12 text-right">
                        <p className="text-sm text-muted-foreground">
                          {posts.filter(post => post.category === category).length}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
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
              <Button variant="outline" asChild className="w-full justify-start">
                <Link to="/admin/users">
                  <User className="mr-2 h-4 w-4" />
                  Manage users
                </Link>
              </Button>
              <Button variant="outline" asChild className="w-full justify-start">
                <Link to="/admin/posts">
                  <FileText className="mr-2 h-4 w-4" />
                  View all posts
                </Link>
              </Button>
              <Button variant="outline" asChild className="w-full justify-start">
                <Link to="/admin/settings">
                  <Settings className="mr-2 h-4 w-4" />
                  Blog settings
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

// Adding missing icons for this file
function FileText(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" x2="8" y1="13" y2="13" />
      <line x1="16" x2="8" y1="17" y2="17" />
      <line x1="10" x2="8" y1="9" y2="9" />
    </svg>
  );
}

function Eye(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function MessageSquare(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
}

export default AdminDashboard;
