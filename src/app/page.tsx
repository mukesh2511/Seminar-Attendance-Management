"use client";
import CreateSeminar from "@/components/CreateSeminar";
import JoinSeminar from "@/components/JoinSeminar";
import Link from "next/link";
import React, { useContext, useEffect, useRef } from "react";
import { ReactTyped } from "react-typed";
import ArrowCircleDownIcon from "@mui/icons-material/ArrowCircleDown";
import CallMadeIcon from "@mui/icons-material/CallMade";
import { AuthContext } from "@/context/userContext";
import { jwtVerify, decodeProtectedHeader } from "jose";
import toast, { Toaster } from "react-hot-toast";

const Home = () => {
  //
  // console.log({ user });
  const secondRef = useRef<HTMLDivElement>(null);
  const { user, dispatch } = useContext(AuthContext);

  /////check token expired
  const isTokenExpired = async (token: string) => {
    try {
      console.log("Token expiration inside", token);
      if (!token) {
        return toast.error("Login to continue!!");
      }

      const secretKeyString = "mijsuh87we3hrjn";
      if (!secretKeyString) {
        console.error("JWTSECRET is not defined");
        return false;
      }
      const secretKey = new TextEncoder().encode(secretKeyString);

      // Verify the token
      const { payload } = await jwtVerify(token, secretKey);
      console.log({ payload }, "Decoded Token");

      // Manual expiration check
      const currentTime = Math.floor(Date.now() / 1000);
      if (!payload.exp) {
        console.log("No expiration time");
        return false;
      }
      console.log({ expirTime: payload.exp });

      // Return true if expired, otherwise false
      return payload.exp < currentTime;
    } catch (error: any) {
      if (error.code === "ERR_JWT_EXPIRED") {
        console.error("Token has expired:", error);
        return true; // Token is expired
      } else {
        console.error("Error verifying token:", error);
        return false; // Other errors
      }
    }
  };

  useEffect(() => {
    const checkToken = async () => {
      if (user) {
        const token = user.token;

        // Check if the token is expired
        const expired = await isTokenExpired(token);
        if (expired) {
          toast.error("Login to continue!!");
          console.log("Token expired");
          dispatch({ type: "LOGOUT" });
          localStorage.removeItem("user");
        }
      }
    };

    checkToken();
  }, [user]); // Make sure to add user as a dependency

  const scrollToSection = () => {
    secondRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <Toaster />
      <div className="w-full flex flex-col items-center min-h-screen gap-10 overflow-y-auto">
        {/* First Section - Full Screen Hero */}
        <div className="relative w-full h-[80vh] shadow-xl flex flex-col md:flex-row justify-between items-center rounded-lg overflow-hidden md:pl-2 my-10">
          {/* Background with opacity */}
          <div className="absolute inset-0 bg-[#cfdcff] opacity-30 rounded-lg"></div>

          {/* Content */}
          <div className="relative z-10 flex-1 flex flex-col justify-center my-5 md:my-0 pl-10">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Welcome to</h1>
            <ReactTyped
              strings={["Seminar Attendance Management"]}
              typeSpeed={50}
              backSpeed={40}
              showCursor={false}
              className="text-2xl md:text-3xl text-Black font-semibold mb-4"
            />
            <ReactTyped
              strings={[
                "Efficient Tracking for Teachers",
                "Easy Participation for Students",
              ]}
              typeSpeed={50}
              backSpeed={40}
              startDelay={2000}
              fadeOut={true}
              loop
              className="text-2xl md:text-3xl text-blue-600 font-semibold"
            />
            <ArrowCircleDownIcon
              className="text-6xl hidden md:flex justify-center mt-20 animate-bounce text-blue-600 cursor-pointer"
              onClick={scrollToSection}
            />
          </div>

          {/* Image with clip-path */}
          <div className="z-10 flex-1 w-full h-full">
            <img
              src="/hero.png"
              alt="heroImg"
              className="w-full h-full object-cover hidden md:inline-block"
              style={{
                clipPath:
                  "polygon(25% 0%, 100% 0%, 100% 100%, 25% 100%, 0% 50%)",
              }}
            />
            <img
              src="/hero.png"
              alt="heroImg"
              className="w-full h-full object-cover md:hidden"
            />
          </div>
        </div>
        {/* ////////title  */}
        <h1 className="text-4xl font-bold" ref={secondRef}>
          Attendance Made Simple
        </h1>

        {/* Second Section - Smaller Card */}
        <div className="relative w-full h-[50vh] shadow-xl flex flex-row justify-between items-center rounded-lg overflow-hidden md:pl-2 mb-10">
          {/* Background with opacity */}
          <div className="absolute inset-0 bg-[#cfdcff] opacity-30 rounded-lg"></div>

          {/* Image */}
          <div className="z-10 flex-1 w-full h-full">
            <img
              src="/hero2.png"
              alt="heroImg"
              className="w-full h-full object-cover hidden md:inline-block"
              style={{
                clipPath: "polygon(0% 0%, 75% 0%, 100% 50%, 75% 100%, 0% 100%)",
              }}
            />
            <img
              src="/hero2.png"
              alt="heroImg"
              className="w-full h-full object-cover md:hidden"
            />
          </div>

          {/* Content */}
          <div className="relative z-10 flex-1 flex flex-col justify-center md:my-0 px-2 md:px-10 gap-3">
            <h1 className="text-xl md:text-3xl  font-bold mb-1 md:mb-4">
              Create Seminar
            </h1>
            <p className="text-xs md:text-sm text-gray-500 ">
              Easily create your seminar in just two steps! Set the class name
              and location, and you're done. A unique code is instantly
              generated for sharing, making attendance tracking seamless for
              teachers and participation effortless for students.
            </p>
            <div className="bg-[#5fda45] p-2 rounded-xl flex hover:bg-blue-600 transition duration-300 w-max text-white font-bold">
              <Link href="/">
                Try Now <CallMadeIcon />
              </Link>
            </div>
          </div>
        </div>

        {/* Third Section - Smaller Card */}
        <div className="relative w-full h-[50vh] shadow-xl flex flex-row justify-between items-center rounded-lg overflow-hidden md:pl-2 mb-10">
          {/* Background with opacity */}
          <div className="absolute inset-0 bg-[#cfdcff] opacity-30 rounded-lg"></div>

          {/* Image */}

          {/* Content */}
          <div className="relative z-10 flex-1 flex flex-col justify-center md:my-0 px-2 md:px-10 gap-3">
            <h1 className="text-xl md:text-3xl  font-bold mb-1 md:mb-4">
              Join Seminar
            </h1>
            <p className="text-xs md:text-sm text-gray-500 ">
              Joining a seminar is as simple as it gets! Just enter the passcode
              shared by your teacher, and mark your attendance instantly. With
              location-based verification, you can easily check in with minimal
              effort—quick, secure, and hassle-free!
            </p>
            <div className="bg-[#5fda45] p-2 rounded-xl flex hover:bg-blue-600 transition duration-300 w-max text-white font-bold">
              <Link href="/">
                Try Now <CallMadeIcon />
              </Link>
            </div>
          </div>
          <div className="z-10 flex-1 w-full h-full">
            <img
              src="/hero3.png"
              alt="heroImg"
              className="w-full h-full object-cover hidden md:inline-block"
              style={{
                clipPath:
                  "polygon(25% 0%, 100% 0%, 100% 100%, 25% 100%, 0% 50%)",
              }}
            />
            <img
              src="/hero3.png"
              alt="heroImg"
              className="w-full h-full object-cover md:hidden rounded-l-sm"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
