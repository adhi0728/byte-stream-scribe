
import { createContext, useContext, ReactNode } from "react";
import { blogPosts, sampleUsers } from "@/data/blog-data";

// Export the BlogPost type so it can be used in other components
export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: {
    id: string;
    name: string;
    avatar: string;
    bio: string;
  };
  publishedAt: string;
  category: string;
  tags: string[];
  coverImage: string;
  featured: boolean;
  readTime: string;
}

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
