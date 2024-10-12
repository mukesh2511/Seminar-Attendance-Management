"use client";
import { signInSchema } from "@/schemas/signInSchema";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { FormEvent, useContext, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { AuthContext } from "@/context/userContext";

const Login = () => {
  const { error, dispatch } = useContext(AuthContext);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [disable, setDisable] = useState(false);

  // const data = useContext(AuthContext);
  // if (!data.user) {
  //   router.push("/home");
  // }

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  // console.log({ user });

  const validateUser = () => {
    const { email, password } = user;
    return email !== "" && password !== "";
  };
  useEffect(() => {
    if (validateUser()) {
      setDisable(false);
    } else {
      setDisable(true);
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSignIn = async (e: FormEvent) => {
    e.preventDefault();
    if (disable) {
      return; // Prevent further execution if the button is disabled
    }

    dispatch({ type: "LOGIN_START" });
    try {
      setLoading(true);
      const result = signInSchema.safeParse(user);
      if (!result.success) {
        setLoading(false);
        toast.error(result.error.issues[0].message);
        return;
      }
      const res = await toast.promise(axios.post("/api/auth/login", user), {
        loading: "Logging In...",
        success: "Loggin Successfull!",
        error: "Logging failed. Please try again.",
      });
      // console.log("kog", res.data);
      const sendUser = {
        id: res.data.user._id,
        name: res.data.user.name,
        email: res.data.user.email,
        role: res.data.user.role,
        token: res.data.token,
      };
      dispatch({ type: "LOGIN_SUCCESS", payload: sendUser });
      setLoading(false);
      router.push("/home");
    } catch (error: any) {
      // console.error(error);
      setLoading(false); // Stop loading if there's an error
      toast.error(error.response.data.message);
    }
  };

  const handleClick = () => {
    router.push("/dashboard/register");
  };

  return (
    <>
      <Toaster />
      <div className="flex justify-center items-center h-[calc(100%-5rem)] mt-10 my-auto mx-auto w-full">
        <div className="shadow-lg bg-white  max-w-4xl h-[70%] w-[60%] flex flex-col  md:flex-row rounded-lg overflow-hidden">
          {/* Left Section - Form */}
          <div className="w-full md:w-1/2 p-8">
            <h2 className="text-2xl font-bold text-gray-700">Login</h2>
            <p className="text-gray-500 mb-6">One step behind. SignIn</p>

            <form className="space-y-4" onSubmit={handleSignIn}>
              <input
                type="email"
                name="email"
                value={user.email}
                onChange={handleChange}
                placeholder="Email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              />
              <input
                type="password"
                name="password"
                value={user.password}
                onChange={handleChange}
                placeholder="Password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              />

              <button
                type="submit"
                className={`w-full py-2 rounded-lg text-white transition duration-300 ${
                  disable
                    ? "bg-gray-400 cursor-not-allowed "
                    : loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-[#5fda45] hover:bg-blue-600"
                } 

                `}
                disabled={loading}
              >
                {loading ? (
                  <img
                    src="/spinner.gif"
                    alt="Loading..."
                    className="w-6 h-6 mx-auto"
                  />
                ) : (
                  "Sign In"
                )}
              </button>
            </form>
            <p className="text-gray-500 mb-6 text-center mt-2 ">
              Don't have an account?{" "}
              <b
                className="hover:text-[#5fda45] cursor-pointer"
                onClick={handleClick}
              >
                Click here
              </b>
            </p>
          </div>

          {/* Right Section - Image and Text */}
          <div
            className="w-full md:w-1/2 bg-cover bg-center relative p-2 hidden md:flex items-center justify-center"
            style={{
              backgroundImage:
                "url(https://wpschoolpress.com/wp-content/uploads/2023/05/Attendance-Management-System.png)",
              backgroundSize: "cover",
            }}
          >
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
              <h3 className="text-white text-2xl md:text-lg font-semibold text-center px-4">
                Attendance Made Simple, Anywhere You Are!
              </h3>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
