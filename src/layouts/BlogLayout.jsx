import { Outlet } from "react-router";
import Navbar from "../components/Navbar";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router";

const BlogLayout = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  return (
    <div className="flex h-screen flex-col">
      <header className="sticky top-0 bg-gray-900">
        <Navbar />
      </header>
      <main className="flex-1 px-2 pt-4">
        {user ? <Outlet /> : navigate("/")}
      </main>
    </div>
  );
};
export default BlogLayout;
