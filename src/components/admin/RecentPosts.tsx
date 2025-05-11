
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BlogPost } from "@/contexts/blog-context";

interface RecentPostsProps {
  posts: BlogPost[];
}

const RecentPosts = ({ posts }: RecentPostsProps) => {
  return (
    <Card className="lg:col-span-3">
      <CardHeader>
        <CardTitle>Recent Posts</CardTitle>
        <CardDescription>
          Your most recent blog publications.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {posts.map(post => (
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
  );
};

export default RecentPosts;
