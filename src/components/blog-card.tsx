
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface BlogCardProps {
  id: string;
  title: string;
  excerpt: string;
  coverImage: string;
  category: string;
  author: {
    name: string;
    avatar: string;
  };
  publishedAt: string;
  readTime: string;
  featured?: boolean;
}

export function BlogCard({
  id,
  title,
  excerpt,
  coverImage,
  category,
  author,
  publishedAt,
  readTime,
  featured = false,
}: BlogCardProps) {
  return (
    <Link to={`/blog/${id}`}>
      <Card className={`blog-card overflow-hidden h-full ${featured ? 'border-primary/20' : ''}`}>
        <div className="aspect-video relative overflow-hidden">
          <img
            src={coverImage}
            alt={title}
            className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
          />
          {featured && (
            <div className="absolute top-2 right-2">
              <Badge variant="secondary" className="bg-primary text-primary-foreground">Featured</Badge>
            </div>
          )}
        </div>
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <Badge variant="outline" className="blog-tag">{category}</Badge>
            <span className="text-xs text-muted-foreground">{readTime} read</span>
          </div>
          <h3 className="font-heading text-xl font-semibold line-clamp-2 mt-2">{title}</h3>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground line-clamp-2">{excerpt}</p>
        </CardContent>
        <CardFooter className="flex justify-between items-center border-t pt-4">
          <div className="flex items-center space-x-2">
            <Avatar className="h-7 w-7">
              <AvatarImage src={author.avatar} alt={author.name} />
              <AvatarFallback>{author.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <span className="text-sm font-medium">{author.name}</span>
          </div>
          <span className="text-xs text-muted-foreground">{publishedAt}</span>
        </CardFooter>
      </Card>
    </Link>
  );
}
