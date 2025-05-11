
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BlogPost } from "@/contexts/blog-context";

interface PopularCategoriesProps {
  posts: BlogPost[];
}

const PopularCategories = ({ posts }: PopularCategoriesProps) => {
  const categories = Array.from(new Set(posts.map(post => post.category)));
  
  return (
    <Card className="lg:col-span-4">
      <CardHeader>
        <CardTitle>Popular Categories</CardTitle>
        <CardDescription>
          Which topics are trending on your blog.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {categories.map((category) => (
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
  );
};

export default PopularCategories;
