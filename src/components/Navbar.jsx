import { useState } from "react";
import { NavLink } from "react-router";
import { RxHamburgerMenu } from "react-icons/rx";
import blogLogo from "../assets/images/blogging.png";
import authServices from "../services/authServices";
import { useNavigate } from "react-router";
import { IoIosArrowDown } from "react-icons/io";
import { LuPenLine } from "react-icons/lu";

import { useAuth } from "../contexts/AuthContext";

const Navbar = () => {
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();
  const { user, setUser, setToken } = useAuth();
  const userName = user && user.username;

  const handleSubmitLogout = async (e) => {
    e.preventDefault();
    const response = await authServices.logoutUser();
    if (response.status === 200) {
      setUser(null);
      setToken(null);
      setIsMobile(false);
      navigate("/");
    }
  };

  return (
    <nav className="px-4 py-4">
      <div>
        <div className="flex items-center text-lg">
          <div className="mr-auto flex text-4xl">
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <div className="flex font-bold text-sky-400">
                <img
                  className="w-10 bg-white object-contain"
                  src={blogLogo}
                  alt="a browser tab where Blog text is displayed"
                />
                App
              </div>
            </NavLink>
          </div>
          <div className="hidden gap-8 sm:flex">
            {user && (
              <>
                <NavLink
                  to="/stories"
                  className={({ isActive }) =>
                    isActive ? "text-sky-400" : "text-gray-300"
                  }
                >
                  Stories
                </NavLink>

                <NavLink
                  to="/write"
                  className={({ isActive }) =>
                    `flex items-center gap-1 ${isActive ? "text-sky-400" : "text-gray-300"}`
                  }
                >
                  <LuPenLine /> write
                </NavLink>

                <div className="group relative hover:cursor-pointer">
                  <span className="flex items-center font-bold text-gray-300">
                    Welcome, {userName} <IoIosArrowDown size={15} />
                  </span>
                  <div className="absolute hidden w-full rounded bg-gray-800 p-2 text-white group-hover:block group-hover:cursor-pointer">
                    <form onSubmit={handleSubmitLogout} className="text-center">
                      <button
                        className="w-full hover:cursor-pointer"
                        type="submit"
                      >
                        Logout
                      </button>
                    </form>
                  </div>
                </div>
              </>
            )}
          </div>
          <div
            onClick={() => setIsMobile(!isMobile)}
            className="hover:cursor-pointer sm:hidden"
          >
            <RxHamburgerMenu size={30} color="white" />
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        {isMobile && (
          <>
            {user ? (
              <>
                <NavLink
                  to="/stories"
                  onClick={() => setIsMobile(false)}
                  className={({ isActive }) =>
                    `pt-4 hover:cursor-pointer ${isActive ? "text-sky-400" : "text-gray-300"}`
                  }
                >
                  Stories
                </NavLink>
                <NavLink
                  to="/write"
                  onClick={() => setIsMobile(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-1 pt-4 hover:cursor-pointer ${isActive ? "text-sky-400" : "text-gray-300"}`
                  }
                >
                  <LuPenLine /> write
                </NavLink>

                <div className="text-gray-300">
                  <span className="inline-block pt-4 hover:cursor-pointer">
                    Welcome, {userName}
                  </span>
                  <form onSubmit={handleSubmitLogout}>
                    <button
                      className="inline-block w-full pt-4 text-left hover:cursor-pointer"
                      type="submit"
                    >
                      Logout
                    </button>
                  </form>
                </div>
              </>
            ) : (
              <>
                <NavLink
                  to="/register"
                  onClick={() => setIsMobile(false)}
                  className={({ isActive }) =>
                    isActive ? "text-sky-400" : "text-gray-300"
                  }
                >
                  Sign up
                </NavLink>
              </>
            )}
          </>
        )}
      </div>
    </nav>
  );
};
export default Navbar;
