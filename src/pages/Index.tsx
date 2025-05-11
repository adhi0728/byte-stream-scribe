
import { useState } from "react";
import { Link } from "react-router-dom";
import { Layout } from "@/components/layout";
import { ThemeProvider } from "@/components/theme-provider";
import { BlogCard } from "@/components/blog-card";
import { useBlog } from "@/contexts/blog-context";
import { Button } from "@/components/ui/button";
import { 
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Index = () => {
  const { posts, featuredPosts } = useBlog();
  const [visiblePosts, setVisiblePosts] = useState(6);
  
  const loadMorePosts = () => {
    setVisiblePosts(prev => Math.min(prev + 3, posts.length));
  };

  return (
    <ThemeProvider defaultTheme="light">
      <Layout>
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-accent dark:bg-accent">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none bg-gradient-to-r from-primary to-indigo-600 bg-clip-text text-transparent">
                  ByteStream Blog
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  A modern platform for developers to share their knowledge and experiences
                </p>
              </div>
              <div className="space-x-4">
                <Button asChild>
                  <Link to="/blog">
                    Explore Posts
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link to="/register">
                    Join Community
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Posts Section */}
        <section className="w-full py-12 md:py-24 bg-background">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-between gap-4 md:flex-row mb-8">
              <div>
                <h2 className="text-3xl font-bold tracking-tighter">Featured Posts</h2>
                <p className="text-muted-foreground">
                  Discover our most impactful articles
                </p>
              </div>
              <Button variant="ghost" asChild>
                <Link to="/blog">View All Posts</Link>
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredPosts.map((post) => (
                <BlogCard
                  key={post.id}
                  id={post.id}
                  title={post.title}
                  excerpt={post.excerpt}
                  coverImage={post.coverImage}
                  category={post.category}
                  author={post.author}
                  publishedAt={post.publishedAt}
                  readTime={post.readTime}
                  featured={post.featured}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Latest Posts Section */}
        <section className="w-full py-12 md:py-24 bg-muted/50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-between gap-4 md:flex-row mb-8">
              <div>
                <h2 className="text-3xl font-bold tracking-tighter">Latest Posts</h2>
                <p className="text-muted-foreground">
                  Stay updated with our newest content
                </p>
              </div>
            </div>
            
            <Tabs defaultValue="all" className="mb-8">
              <TabsList className="grid w-full sm:w-auto grid-cols-3 sm:grid-cols-4 h-auto">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="react">React</TabsTrigger>
                <TabsTrigger value="backend">Backend</TabsTrigger>
                <TabsTrigger value="css">CSS</TabsTrigger>
              </TabsList>
              <TabsContent value="all" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {posts.slice(0, visiblePosts).map((post) => (
                    <BlogCard
                      key={post.id}
                      id={post.id}
                      title={post.title}
                      excerpt={post.excerpt}
                      coverImage={post.coverImage}
                      category={post.category}
                      author={post.author}
                      publishedAt={post.publishedAt}
                      readTime={post.readTime}
                    />
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="react" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {posts.filter(post => post.category === "React").map((post) => (
                    <BlogCard
                      key={post.id}
                      id={post.id}
                      title={post.title}
                      excerpt={post.excerpt}
                      coverImage={post.coverImage}
                      category={post.category}
                      author={post.author}
                      publishedAt={post.publishedAt}
                      readTime={post.readTime}
                    />
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="backend" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {posts.filter(post => post.category === "Backend").map((post) => (
                    <BlogCard
                      key={post.id}
                      id={post.id}
                      title={post.title}
                      excerpt={post.excerpt}
                      coverImage={post.coverImage}
                      category={post.category}
                      author={post.author}
                      publishedAt={post.publishedAt}
                      readTime={post.readTime}
                    />
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="css" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {posts.filter(post => post.category === "CSS").map((post) => (
                    <BlogCard
                      key={post.id}
                      id={post.id}
                      title={post.title}
                      excerpt={post.excerpt}
                      coverImage={post.coverImage}
                      category={post.category}
                      author={post.author}
                      publishedAt={post.publishedAt}
                      readTime={post.readTime}
                    />
                  ))}
                </div>
              </TabsContent>
            </Tabs>
            
            {visiblePosts < posts.length && (
              <div className="flex justify-center mt-8">
                <Button onClick={loadMorePosts} variant="outline">Load More</Button>
              </div>
            )}
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="w-full py-12 md:py-24 bg-primary text-primary-foreground">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4">
                <div className="inline-block rounded-lg bg-primary-foreground/10 px-3 py-1 text-sm">
                  Stay Updated
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  Subscribe to our newsletter
                </h2>
                <p className="text-primary-foreground/90 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Get the latest articles, tutorials, and updates delivered straight to your inbox.
                </p>
              </div>
              <div className="flex flex-col space-y-4">
                <form className="flex flex-col sm:flex-row gap-3">
                  <input 
                    className="min-w-0 flex-auto rounded-md border-0 bg-primary-foreground/10 px-3.5 py-2 text-primary-foreground shadow-sm ring-1 ring-inset ring-primary-foreground/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-foreground sm:text-sm sm:leading-6 placeholder:text-primary-foreground/50"
                    placeholder="Enter your email"
                    type="email"
                  />
                  <Button type="submit" variant="secondary">
                    Subscribe
                  </Button>
                </form>
                <p className="text-xs text-primary-foreground/70">
                  We respect your privacy. Unsubscribe at any time.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Topics Section */}
        <section className="w-full py-12 md:py-24 bg-background">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                  Explore Topics
                </h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Dive into our diverse range of technical subjects
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              <Card className="group hover:shadow-lg transition-all duration-300">
                <Link to="/blog?category=React">
                  <CardHeader className="pb-2">
                    <CardTitle>React</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>
                      Modern UI development with React and its ecosystem
                    </CardDescription>
                  </CardContent>
                  <CardFooter className="text-sm text-muted-foreground pt-2">
                    {posts.filter(post => post.category === "React").length} articles
                  </CardFooter>
                </Link>
              </Card>
              <Card className="group hover:shadow-lg transition-all duration-300">
                <Link to="/blog?category=Backend">
                  <CardHeader className="pb-2">
                    <CardTitle>Backend</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>
                      Server-side development, APIs, and databases
                    </CardDescription>
                  </CardContent>
                  <CardFooter className="text-sm text-muted-foreground pt-2">
                    {posts.filter(post => post.category === "Backend").length} articles
                  </CardFooter>
                </Link>
              </Card>
              <Card className="group hover:shadow-lg transition-all duration-300">
                <Link to="/blog?category=CSS">
                  <CardHeader className="pb-2">
                    <CardTitle>CSS</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>
                      Styling techniques, layouts, and design systems
                    </CardDescription>
                  </CardContent>
                  <CardFooter className="text-sm text-muted-foreground pt-2">
                    {posts.filter(post => post.category === "CSS").length} articles
                  </CardFooter>
                </Link>
              </Card>
              <Card className="group hover:shadow-lg transition-all duration-300">
                <Link to="/blog?category=TypeScript">
                  <CardHeader className="pb-2">
                    <CardTitle>TypeScript</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>
                      Type-safe JavaScript development and best practices
                    </CardDescription>
                  </CardContent>
                  <CardFooter className="text-sm text-muted-foreground pt-2">
                    {posts.filter(post => post.category === "TypeScript").length} articles
                  </CardFooter>
                </Link>
              </Card>
            </div>
          </div>
        </section>
      </Layout>
    </ThemeProvider>
  );
};

export default Index;
