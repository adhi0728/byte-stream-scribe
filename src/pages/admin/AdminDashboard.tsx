
import { AdminLayout } from "@/components/admin-layout";
import { useBlog } from "@/contexts/blog-context";
import DashboardHeader from "@/components/admin/DashboardHeader";
import DashboardStats from "@/components/admin/DashboardStats";
import AnalyticsChart from "@/components/admin/AnalyticsChart";
import RecentPosts from "@/components/admin/RecentPosts";
import PopularCategories from "@/components/admin/PopularCategories";
import QuickActions from "@/components/admin/QuickActions";

const AdminDashboard = () => {
  console.log("Rendering AdminDashboard");
  const { posts, users } = useBlog();
  
  const recentPosts = [...posts]
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, 5);

  console.log("AdminDashboard - posts:", posts.length);
  console.log("AdminDashboard - users:", users.length);
  console.log("AdminDashboard - recentPosts:", recentPosts.length);

  return (
    <AdminLayout>
      <div className="space-y-6">
        <DashboardHeader />
        <DashboardStats postsCount={posts.length} usersCount={users.length} />
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <AnalyticsChart />
          <RecentPosts posts={recentPosts} />
        </div>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <PopularCategories posts={posts} />
          <QuickActions />
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
