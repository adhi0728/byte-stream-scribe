
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
  SidebarProvider 
} from "@/components/ui/sidebar";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Home, FileText, User, LogOut, Settings, Book, Menu } from "lucide-react";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  
  const isActivePath = (path: string) => location.pathname === path;

  return (
    <ThemeProvider defaultTheme="light">
      <SidebarProvider defaultOpen={!collapsed} onOpenChange={setCollapsed}>
        <div className="min-h-screen flex w-full">
          <Sidebar className="border-r">
            <SidebarHeader className="h-16 flex items-center px-6">
              <Link 
                to="/" 
                className={`flex items-center gap-2 ${collapsed ? 'justify-center' : ''}`}
              >
                <Book className="h-6 w-6 text-primary" />
                {!collapsed && (
                  <span className="font-heading text-xl font-bold">ByteStream</span>
                )}
              </Link>
            </SidebarHeader>
            <SidebarContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    asChild
                    isActive={isActivePath("/admin")}
                  >
                    <Link to="/admin">
                      <Home className="h-4 w-4" />
                      Dashboard
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    asChild
                    isActive={isActivePath("/admin/posts")}
                  >
                    <Link to="/admin/posts">
                      <FileText className="h-4 w-4" />
                      Posts
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    asChild
                    isActive={isActivePath("/admin/users")}
                  >
                    <Link to="/admin/users">
                      <User className="h-4 w-4" />
                      Users
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    asChild
                    isActive={isActivePath("/admin/settings")}
                  >
                    <Link to="/admin/settings">
                      <Settings className="h-4 w-4" />
                      Settings
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarContent>
            <SidebarFooter className="p-6">
              <div className="mt-auto">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="w-full justify-start px-2">
                      <div className="flex items-center">
                        <Avatar className="h-6 w-6 mr-2">
                          <AvatarImage src="https://i.pravatar.cc/150?img=11" />
                          <AvatarFallback>AD</AvatarFallback>
                        </Avatar>
                        {!collapsed && "Admin User"}
                      </div>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="w-56">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      Settings
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <LogOut className="mr-2 h-4 w-4" />
                      Log out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </SidebarFooter>
          </Sidebar>

          <div className="flex flex-col flex-1 overflow-hidden">
            <header className="h-16 flex items-center gap-4 border-b px-6">
              <SidebarTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SidebarTrigger>
              <div className="flex-1" />
              <ThemeToggle />
              <Button asChild variant="ghost">
                <Link to="/">View Blog</Link>
              </Button>
            </header>
            <main className="flex-1 overflow-auto">
              <div className="container py-6">{children}</div>
            </main>
          </div>
        </div>
      </SidebarProvider>
    </ThemeProvider>
  );
}
