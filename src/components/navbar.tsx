
import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./theme-toggle";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center space-x-2">
            <span className="hidden sm:inline-block font-heading text-2xl font-bold bg-gradient-to-r from-primary to-indigo-600 bg-clip-text text-transparent">
              ByteStream
            </span>
            <span className="sm:hidden font-heading text-2xl font-bold">BS</span>
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link to="/" className="text-foreground/80 hover:text-foreground transition-colors">
              Home
            </Link>
            <Link to="/blog" className="text-foreground/80 hover:text-foreground transition-colors">
              Blog
            </Link>
            <Link to="/about" className="text-foreground/80 hover:text-foreground transition-colors">
              About
            </Link>
          </nav>
        </div>
        
        <div className="flex items-center gap-4">
          <form className="hidden sm:flex relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <input
              type="search"
              placeholder="Search..."
              className="pl-8 h-9 w-[180px] md:w-[240px] bg-background ring-offset-background rounded-md border border-input text-sm"
            />
          </form>
          <ThemeToggle />
          <div className="hidden sm:flex space-x-2">
            <Button asChild variant="outline">
              <Link to="/login">Log in</Link>
            </Button>
            <Button asChild>
              <Link to="/register">Sign up</Link>
            </Button>
          </div>
          
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden focus-visible:ring-0 focus-visible:ring-offset-0"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="container mx-auto py-4 md:hidden animate-fade-in">
          <nav className="flex flex-col space-y-4 mb-4">
            <Link 
              to="/" 
              className="text-foreground px-2 py-1 rounded hover:bg-accent transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/blog" 
              className="text-foreground px-2 py-1 rounded hover:bg-accent transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Blog
            </Link>
            <Link 
              to="/about" 
              className="text-foreground px-2 py-1 rounded hover:bg-accent transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
          </nav>
          <form className="relative mb-4">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <input
              type="search"
              placeholder="Search..."
              className="pl-8 h-9 w-full bg-background ring-offset-background rounded-md border border-input text-sm"
            />
          </form>
          <div className="flex space-x-2">
            <Button asChild variant="outline" className="flex-1">
              <Link to="/login" onClick={() => setIsMenuOpen(false)}>Log in</Link>
            </Button>
            <Button asChild className="flex-1">
              <Link to="/register" onClick={() => setIsMenuOpen(false)}>Sign up</Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
