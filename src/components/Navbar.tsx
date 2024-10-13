"use client";
import Link from "next/link";
import React, { useContext, useEffect, useRef, useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { AuthContext } from "@/context/userContext";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

const Navbar = () => {
  const Router = useRouter();
  const { user, dispatch } = useContext(AuthContext);
  const [hydrated, setHydrated] = useState(false);
  const clickRef = useRef<HTMLDivElement | null>(null);
  const [open, setOpen] = useState(false);
  const [active, SetActive] = useState(false);

  // Hydration state for client-only rendering
  useEffect(() => {
    setHydrated(true);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        clickRef.current &&
        !clickRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  const isActive = () => {
    window.scrollY > 0 ? SetActive(true) : SetActive(false);
  };
  useEffect(() => {
    window.addEventListener("scroll", isActive);
    return () => {
      window.removeEventListener("scroll", isActive);
    };
  }, []);

  const logout = async () => {
    try {
      toast.promise(axios.post("/api/auth/logout"), {
        loading: "Logging Out...",
        success: "Logged Out Successfully",
        error: "Logout Failed!!",
      });
      localStorage.removeItem("user");
      dispatch({ type: "LOGOUT" });
      Router.push("/dashboard/login");
    } catch (error: any) {
      console.log("Error in logout");
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
      <Toaster />
      <div
        className={`z-50
        w-full h-20 inset-0 bg-opacity-30  rounded-b-lg sticky top-0 ${
          active ? "bg-[#195665]" : "bg-[#9cdbeb]"
        }`}
      >
        <div className="px-5 py-1 flex justify-between items-center">
          <div className="w-16 h-16 rounded-[50%] overflow-hidden ">
            <Link href={"/"}>
              <img
                src="/logo.png"
                alt="logo"
                className="w-full h-full object-cover"
              />
            </Link>
          </div>

          {user && hydrated ? (
            <div className="flex justify-center items-center gap-4 text-black font-bold relative">
              <Link href="/home">Home</Link>
              {user && user.role === "STUDENT" && (
                <div className="bg-[#5fda45] p-2 rounded-xl hidden md:flex hover:bg-blue-600 transition duration-300">
                  <Link href="/joinseminar">Join Seminar</Link>
                </div>
              )}
              {user && user.role === "TEACHER" && (
                <div className="bg-[#5fda45] p-2 rounded-xl hidden md:flex hover:bg-blue-600 transition duration-300">
                  <Link href="/createseminar">Create Seminar</Link>
                </div>
              )}
              <div className=" hidden md:flex justify-center items-center gap-1">
                <div className="w-10 h-10 rounded-[50%] font-bold text-[#bbe6f1] bg-[#30495f] flex justify-center items-center text-lg">
                  {user.name.slice(0, 2)}
                </div>
              </div>
              <button onClick={logout} className="hidden md:flex">
                Logout
              </button>

              <div onClick={() => setOpen(!open)} className="md:hidden">
                {open ? (
                  <CloseIcon
                    className=" text-red-700
                  font-extrabold"
                  /> // Show CloseIcon when open
                ) : (
                  <MenuIcon className="" /> // Show MenuIcon when closed
                )}
              </div>

              {/* Sidebar */}
              {open && (
                <div
                  ref={clickRef}
                  className="w-[300px] bg-[#30495f] h-screen absolute top-24 -right-10 flex flex-col items-start gap-5 p-5 rounded-lg "
                >
                  {user && (
                    <div className="flex justify-center items-center gap-1">
                      <div className="w-10 h-10 rounded-[50%] font-bold text-white bg-[#5fda45] flex justify-center items-center text-lg">
                        {user?.name?.slice(0, 2)}
                      </div>
                      <p className="text-white font-bold">
                        {user?.name?.split(" ")[0]}
                      </p>
                    </div>
                  )}
                  {user && user.role === "STUDENT" && (
                    <div className="bg-[#5fda45] p-2 rounded-xl">
                      <Link
                        href="/joinseminar"
                        className="text-white font-bold"
                      >
                        Join Seminar
                      </Link>
                    </div>
                  )}
                  {user && user.role === "TEACHER" && (
                    <div className="bg-[#5fda45] p-2 rounded-xl">
                      <Link
                        href="/createseminar"
                        className="text-white font-bold"
                      >
                        Create Seminar
                      </Link>
                    </div>
                  )}
                  {user && user.role === "TEACHER" && (
                    <div className="bg-[#5fda45] p-2 rounded-xl">
                      <Link href="/Class" className="text-white font-bold">
                        View Created Seminars
                      </Link>
                    </div>
                  )}
                  {user && user.role === "STUDENT" && (
                    <div className="bg-[#5fda45] p-2 rounded-xl">
                      <Link href="/Class" className="text-white font-bold">
                        View Past Seminars Attended
                      </Link>
                    </div>
                  )}

                  <div onClick={logout} className="text-white font-bold">
                    Logout
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex justify-center items-center gap-4 text-black font-bold relative">
              <div className="bg-[#5fda45] p-2 rounded-xl">
                <Link href="/dashboard/login" className="text-white font-bold">
                  Login
                </Link>
              </div>
              <div className="bg-[#5fda45] p-2 rounded-xl">
                <Link
                  href="/dashboard/register"
                  className="text-white font-bold"
                >
                  Register
                </Link>
              </div>
            </div>
          )}
          {/* {!user && (
            <div className="flex justify-center items-center gap-4 text-black font-bold relative">
              <div className="bg-[#5fda45] p-2 rounded-xl">
                <Link href="/dashboard/login" className="text-white font-bold">
                  Login
                </Link>
              </div>
              <div className="bg-[#5fda45] p-2 rounded-xl">
                <Link
                  href="/dashboard/register"
                  className="text-white font-bold"
                >
                  Register
                </Link>
              </div>
            </div>
          )} */}
        </div>
      </div>
    </>
  );
};

export default Navbar;
