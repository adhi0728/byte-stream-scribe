
import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Layout } from "@/components/layout";
import { ThemeProvider } from "@/components/theme-provider";
import { useBlog } from "@/contexts/blog-context";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { BlogCard } from "@/components/blog-card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import ReactMarkdown from 'react-markdown';

const BlogPost = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { posts, getPostById } = useBlog();
  const [post, setPost] = useState(id ? getPostById(id) : undefined);
  const [commentName, setCommentName] = useState("");
  const [commentEmail, setCommentEmail] = useState("");
  const [commentBody, setCommentBody] = useState("");

  useEffect(() => {
    // If post doesn't exist, redirect to 404
    if (id && !post) {
      navigate("/404");
    }
    
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, [id, post, navigate]);
  
  // Get related posts (same category, excluding current)
  const relatedPosts = post
    ? posts.filter(p => p.category === post.category && p.id !== post.id).slice(0, 3)
    : [];

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Comment submitted for review");
    setCommentName("");
    setCommentEmail("");
    setCommentBody("");
  };

  if (!post) {
    return null; // Will redirect to 404 via useEffect
  }

  return (
    <ThemeProvider defaultTheme="light">
      <Layout>
        <article className="w-full">
          {/* Hero section with post title and meta */}
          <div className="w-full py-12 md:py-16 bg-accent">
            <div className="container px-4 md:px-6">
              <Link 
                to="/blog" 
                className="inline-flex items-center mb-6 text-sm font-medium text-primary hover:underline"
              >
                <ArrowLeft className="mr-1 h-4 w-4" /> Back to all posts
              </Link>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex flex-wrap gap-2 mb-3">
                    <Badge>{post.category}</Badge>
                    {post.tags.map((tag) => (
                      <Badge key={tag} variant="outline">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                    {post.title}
                  </h1>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={post.author.avatar} alt={post.author.name} />
                      <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{post.author.name}</p>
                    </div>
                  </div>
                  <Separator orientation="vertical" className="h-4" />
                  <div>{post.publishedAt}</div>
                  <Separator orientation="vertical" className="h-4" />
                  <div>{post.readTime} read</div>
                </div>
              </div>
            </div>
          </div>

          {/* Featured Image */}
          <div className="container px-4 md:px-6 my-8">
            <div className="aspect-[21/9] overflow-hidden rounded-lg">
              <img
                src={post.coverImage}
                alt={post.title}
                className="object-cover w-full h-full"
              />
            </div>
          </div>

          {/* Article content */}
          <div className="container px-4 md:px-6 py-6">
            <div className="mx-auto max-w-3xl prose prose-lg dark:prose-invert">
              <ReactMarkdown>
                {post.content}
              </ReactMarkdown>
            </div>
          </div>

          {/* Author bio */}
          <div className="container px-4 md:px-6 py-6">
            <div className="mx-auto max-w-3xl">
              <Separator className="mb-6" />
              <div className="flex flex-col sm:flex-row gap-6 items-start">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={post.author.avatar} alt={post.author.name} />
                  <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold">
                    Written by {post.author.name}
                  </h3>
                  <p className="text-muted-foreground">{post.author.bio}</p>
                </div>
              </div>
              <Separator className="mt-6" />
            </div>
          </div>

          {/* Comments section */}
          <div className="container px-4 md:px-6 py-6">
            <div className="mx-auto max-w-3xl space-y-8">
              <h3 className="text-2xl font-bold">Comments</h3>
              
              {/* Comment form */}
              <form onSubmit={handleCommentSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">
                      Name
                    </label>
                    <Input
                      id="name"
                      value={commentName}
                      onChange={(e) => setCommentName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      Email
                    </label>
                    <Input
                      id="email"
                      type="email"
                      value={commentEmail}
                      onChange={(e) => setCommentEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="comment" className="text-sm font-medium">
                    Comment
                  </label>
                  <Textarea
                    id="comment"
                    rows={4}
                    value={commentBody}
                    onChange={(e) => setCommentBody(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit">Submit Comment</Button>
              </form>
              
              {/* Sample comments */}
              <div className="space-y-6">
                <div className="bg-accent rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="https://i.pravatar.cc/150?img=32" alt="Comment Author" />
                      <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">User One</p>
                      <p className="text-xs text-muted-foreground">2 days ago</p>
                    </div>
                  </div>
                  <p>
                    This was incredibly helpful! I've been looking for a clear explanation of these concepts for a while now.
                  </p>
                </div>
                
                <div className="bg-accent rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="https://i.pravatar.cc/150?img=45" alt="Comment Author" />
                      <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">User Two</p>
                      <p className="text-xs text-muted-foreground">4 days ago</p>
                    </div>
                  </div>
                  <p>
                    Great article! I'd love to see a follow-up that discusses more advanced techniques.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Related posts */}
          {relatedPosts.length > 0 && (
            <div className="bg-muted/50 py-12">
              <div className="container px-4 md:px-6">
                <h3 className="text-2xl font-bold mb-6">Related Posts</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {relatedPosts.map((relatedPost) => (
                    <BlogCard
                      key={relatedPost.id}
                      id={relatedPost.id}
                      title={relatedPost.title}
                      excerpt={relatedPost.excerpt}
                      coverImage={relatedPost.coverImage}
                      category={relatedPost.category}
                      author={relatedPost.author}
                      publishedAt={relatedPost.publishedAt}
                      readTime={relatedPost.readTime}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
        </article>
      </Layout>
    </ThemeProvider>
  );
};

export default BlogPost;
