import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AdminLayout } from "@/components/admin-layout";
import { useBlog } from "@/contexts/blog-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";
import { Save, ArrowLeft, Image, XCircle } from "lucide-react";

const PostEditor = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getPostById } = useBlog();
  
  const isNewPost = id === "new";
  const existingPost = !isNewPost && id ? getPostById(id) : undefined;
  
  const [title, setTitle] = useState(existingPost?.title || "");
  const [excerpt, setExcerpt] = useState(existingPost?.excerpt || "");
  const [content, setContent] = useState(existingPost?.content || "");
  const [category, setCategory] = useState(existingPost?.category || "");
  const [tags, setTags] = useState(existingPost?.tags?.join(", ") || "");
  const [coverImage, setCoverImage] = useState(existingPost?.coverImage || "");
  const [isFeatured, setIsFeatured] = useState(existingPost?.featured || false);
  const [previewImage, setPreviewImage] = useState(existingPost?.coverImage || "");
  
  // Available categories
  const categories = [
    "React",
    "TypeScript",
    "JavaScript",
    "Backend",
    "CSS",
    "Performance",
    "DevOps"
  ];
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!title.trim()) {
      toast.error("Please enter a title");
      return;
    }
    
    if (!content.trim()) {
      toast.error("Please enter content");
      return;
    }
    
    if (!category) {
      toast.error("Please select a category");
      return;
    }
    
    // Process tags
    const processedTags = tags
      .split(",")
      .map(tag => tag.trim())
      .filter(tag => tag);
      
    // Create new post object
    const postData = {
      id: existingPost?.id || Date.now().toString(),
      title,
      excerpt,
      content,
      category,
      tags: processedTags,
      coverImage: coverImage || "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b", // Default image if none provided
      featured: isFeatured,
      // Other fields would be added here in a real app
    };
    
    toast.success(isNewPost ? "Post created successfully!" : "Post updated successfully!");
    
    // In a real app, we would save the post to the database here
    
    // Navigate back to posts list
    navigate("/admin/posts");
  };
  
  // Handle cover image change
  const handleCoverImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    setCoverImage(url);
    
    // Check if URL is valid for preview
    if (url.match(/\.(jpeg|jpg|gif|png)$/) || url.startsWith('http')) {
      setPreviewImage(url);
    } else {
      setPreviewImage("");
    }
  };
  
  // Clear cover image
  const clearCoverImage = () => {
    setCoverImage("");
    setPreviewImage("");
  };

  return (
    <AdminLayout>
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-2">
            <Button 
              type="button" 
              variant="ghost" 
              size="icon" 
              onClick={() => navigate("/admin/posts")}
            >
              <ArrowLeft className="h-5 w-5" />
              <span className="sr-only">Back</span>
            </Button>
            <div>
              <h2 className="text-3xl font-bold tracking-tight">
                {isNewPost ? "Create New Post" : "Edit Post"}
              </h2>
              <p className="text-muted-foreground">
                {isNewPost ? "Create a new blog post" : "Update your blog post"}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button type="button" variant="outline" onClick={() => navigate("/admin/posts")}>
              Cancel
            </Button>
            <Button type="submit">
              <Save className="mr-2 h-4 w-4" />
              {isNewPost ? "Publish Post" : "Update Post"}
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                placeholder="Enter post title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="excerpt">Excerpt</Label>
              <Textarea
                id="excerpt"
                placeholder="Brief summary of the post"
                rows={2}
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="content">Content (Markdown)</Label>
              <Textarea
                id="content"
                placeholder="Write your post content using Markdown..."
                rows={20}
                className="font-mono"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                This editor supports Markdown syntax for formatting.
              </p>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Post Settings</CardTitle>
                <CardDescription>
                  Configure your post details
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select 
                    value={category} 
                    onValueChange={(value) => setCategory(value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(cat => (
                        <SelectItem key={cat} value={cat}>
                          {cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="tags">Tags</Label>
                  <Input
                    id="tags"
                    placeholder="React, TypeScript, Web Development"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">
                    Separate tags with commas
                  </p>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch
                    id="featured"
                    checked={isFeatured}
                    onCheckedChange={setIsFeatured}
                  />
                  <Label htmlFor="featured">Featured Post</Label>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Cover Image</CardTitle>
                <CardDescription>
                  Add an image for your post
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {previewImage && (
                  <div className="relative aspect-video rounded-md overflow-hidden bg-muted">
                    <img 
                      src={previewImage} 
                      alt="Cover preview" 
                      className="object-cover w-full h-full"
                      onError={() => setPreviewImage("")} 
                    />
                  </div>
                )}
                
                <div className="space-y-2">
                  <Label htmlFor="coverImage">Image URL</Label>
                  <div className="flex space-x-2">
                    <Input
                      id="coverImage"
                      placeholder="https://example.com/image.jpg"
                      value={coverImage}
                      onChange={handleCoverImageChange}
                    />
                    {coverImage && (
                      <Button 
                        type="button"
                        variant="ghost" 
                        size="icon" 
                        onClick={clearCoverImage}
                      >
                        <XCircle className="h-4 w-4" />
                        <span className="sr-only">Clear</span>
                      </Button>
                    )}
                  </div>
                  {!previewImage && (
                    <div className="flex items-center justify-center rounded-md border border-dashed h-32 bg-muted">
                      <div className="flex flex-col items-center text-muted-foreground">
                        <Image className="h-8 w-8 mb-2" />
                        <span className="text-sm">No image preview</span>
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="flex items-center">
                  <Button 
                    type="button" 
                    variant="outline" 
                    className="w-full"
                    onClick={() => setCoverImage("https://images.unsplash.com/photo-1488590528505-98d2b5aba04b")}
                  >
                    Use Default Image
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </AdminLayout>
  );
};

export default PostEditor;
