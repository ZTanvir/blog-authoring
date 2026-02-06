import { Outlet } from "react-router";
import Navbar from "../components/Navbar";

const BlogLayout = () => {
  return (
    <div className="flex h-screen flex-col">
      <header className="sticky top-0 bg-gray-900">
        <Navbar />
      </header>
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
};
export default BlogLayout;
