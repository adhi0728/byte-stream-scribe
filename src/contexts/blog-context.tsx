
import { createContext, useContext, ReactNode } from "react";
import { blogPosts, sampleUsers, BlogPost } from "@/data/blog-data";

interface BlogContextType {
  posts: BlogPost[];
  featuredPosts: BlogPost[];
  getPostById: (id: string) => BlogPost | undefined;
  users: any[];
}

const BlogContext = createContext<BlogContextType | undefined>(undefined);

export function BlogProvider({ children }: { children: ReactNode }) {
  const posts = blogPosts;
  const featuredPosts = posts.filter(post => post.featured);
  const users = sampleUsers;

  const getPostById = (id: string) => {
    return posts.find(post => post.id === id);
  };

  return (
    <BlogContext.Provider value={{ posts, featuredPosts, getPostById, users }}>
      {children}
    </BlogContext.Provider>
  );
}

export function useBlog() {
  const context = useContext(BlogContext);
  
  if (context === undefined) {
    throw new Error("useBlog must be used within a BlogProvider");
  }
  
  return context;
}
