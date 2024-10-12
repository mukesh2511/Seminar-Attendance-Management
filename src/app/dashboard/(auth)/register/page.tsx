"use client";
import React, { FormEvent, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signUpSchema } from "@/schemas/signUpSchema";

const Register = () => {
  const Router = useRouter();
  const [disable, setDisable] = useState(true);
  const [loading, setLoading] = useState(false);
  const [isStudent, setIsStudent] = useState(false);

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
    division: "",
    className: "",
    rollNo: 0,
    isVerified: "true",
  });

  useEffect(() => {
    if (user.role === "STUDENT") {
      setIsStudent(true);
    } else {
      setIsStudent(false);
    }
  }, [user.role]);

  // Validate user based on the role and other fields
  const validateUser = () => {
    const { name, email, password, role } = user;

    // Common validation for all users
    if (
      name.trim() === "" ||
      email.trim() === "" ||
      password.trim() === "" ||
      role.trim() === ""
    ) {
      return false;
    }

    // Additional validation for students
    if (isStudent) {
      const { className, division, rollNo } = user;
      if (
        className.trim() === "" ||
        division.trim() === "" ||
        rollNo <= 0 // Roll number must be greater than 0
      ) {
        return false;
      }
    }

    return true;
  };

  // Update button disable state based on form validation
  useEffect(() => {
    if (validateUser()) {
      setDisable(false); // Enable button if valid
    } else {
      setDisable(true); // Disable button if invalid
    }
  }, [user, isStudent]);

  const onSignUp = async (e: FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      const result = signUpSchema.safeParse(user);
      if (!result.success) {
        toast.error(result.error.issues[0].message);
        setLoading(false);
        return;
      }

      // Using toast.promise to handle the API call and toast notifications
      await toast.promise(axios.post("/api/auth/register", user), {
        loading: "Registering...",
        success: "Registered Successfully!",
        error: "Registration failed. Please try again.",
      });

      setLoading(false);
      Router.push("/dashboard/login");
    } catch (error: any) {
      setLoading(false);
      console.log("Signup failed", error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
      <Toaster />
      <div className="flex justify-center items-center h-[calc(100%-5rem)] mt-10 my-auto mx-auto">
        <div className="shadow-lg bg-white w-full max-w-4xl h-auto flex flex-col md:flex-row rounded-lg overflow-hidden">
          {/* Left Section - Form */}
          <div className="w-full md:w-1/2 p-8">
            <h2 className="text-2xl font-bold text-gray-700">Register</h2>
            <p className="text-gray-500 mb-6">Sign up to get started</p>

            <form className="space-y-4" onSubmit={onSignUp}>
              <input
                value={user.name}
                onChange={(e) => setUser({ ...user, name: e.target.value })}
                type="text"
                placeholder="Name"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
              />
              <input
                type="password"
                placeholder="Password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
              />
              <select
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                value={user.role}
                onChange={(e) => setUser({ ...user, role: e.target.value })}
              >
                <option value="">Select Role</option>
                <option value="STUDENT">STUDENT</option>
                <option value="TEACHER">TEACHER</option>
              </select>

              {isStudent && (
                <>
                  <input
                    type="text"
                    placeholder="Class"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                    value={user.className}
                    onChange={(e) =>
                      setUser({ ...user, className: e.target.value })
                    }
                  />
                  <input
                    type="text"
                    placeholder="Division"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                    value={user.division}
                    onChange={(e) =>
                      setUser({ ...user, division: e.target.value })
                    }
                  />
                  <input
                    type="number"
                    placeholder={
                      user.rollNo === 0
                        ? "Roll No (must be greater than 0)"
                        : "Roll No"
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                    value={user.rollNo}
                    onChange={(e) =>
                      setUser({ ...user, rollNo: +e.target.value })
                    }
                  />
                </>
              )}

              <button
                type="submit"
                className={`w-full py-2 rounded-lg text-white transition duration-300 ${
                  disable
                    ? "bg-gray-400 cursor-not-allowed "
                    : loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-[#5fda45] hover:bg-blue-600"
                }`}
                disabled={disable || loading}
              >
                {loading ? (
                  <img
                    src="/spinner.gif"
                    alt="Loading..."
                    className="w-6 h-6 mx-auto"
                  />
                ) : (
                  "Register"
                )}
              </button>
            </form>
            <p className="text-gray-500 mb-6 text-center mt-2">
              {`already have an Account?`}{" "}
              <Link href={"/dashboard/login"}>
                <b className="hover:text-[#5fda45]">Click here</b>
              </Link>
            </p>
          </div>

          {/* Right Section - Image and Text */}
          <div
            className="w-full md:w-1/2 bg-cover bg-center relative p-2 hidden md:flex"
            style={{
              backgroundImage:
                "url(https://wpschoolpress.com/wp-content/uploads/2023/05/Attendance-Management-System.png)",
              backgroundSize: "cover",
            }}
          >
            <div className="absolute inset-0 top-7 bg-opacity-10">
              <h3 className="text-[#374151] text-xl md:text-2xl font-semibold text-center">
                {`Attendance Made Simple, Anywhere You Are!`}
              </h3>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
