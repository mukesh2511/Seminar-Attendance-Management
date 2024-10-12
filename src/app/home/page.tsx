"use client";

import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/context/userContext"; // AuthContext from your code
import { useRouter } from "next/navigation";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import toast, { Toaster } from "react-hot-toast";

const Main = () => {
  const Router = useRouter();
  const { user } = useContext(AuthContext); // Get user from context
  console.log({ user });

  const [hydrated, setHydrated] = useState(false); // Track hydration status
  const router = useRouter();
  const options = { loop: true };
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [Autoplay()]);

  // Ensure the component is hydrated before rendering
  useEffect(() => {
    setHydrated(true); // Mark the component as hydrated
  }, []);

  // Redirect to login if no user after hydration
  useEffect(() => {
    if (hydrated && !user) {
      console.log({ home: user });
      router.push("/dashboard/login");
    }
  }, [hydrated, user, router]);

  // Prevent rendering on the server (before hydration) or if user is not available
  if (!hydrated || !user) {
    return null; // Prevent SSR mismatch by not rendering until hydrated
  }

  return (
    <>
      <Toaster />
      <div className="w-full flex flex-col items-center min-h-screen gap-10 overflow-y-auto">
        {/* First Section - Full Screen Hero */}
        <div className="relative w-full md:h-[80vh] shadow-xl flex flex-col md:flex-row justify-between items-center rounded-lg overflow-hidden md:pl-2 my-10 gap-5">
          {/* Background with opacity */}
          <div className="absolute inset-0 bg-[#cfdcff] opacity-30 rounded-lg"></div>

          {/* Content */}
          <div className="relative z-10 flex-1 flex flex-col justify-center  my-5 md:my-0 p-5 ">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 italic text-[#345068]">
              Welcome {user?.name}
            </h1>

            {/* Role-based content */}
            {hydrated ? (
              user?.role === "TEACHER" ? (
                <>
                  <h2 className="text-2xl font-semibold mb-2">
                    Simplify Your Seminar Management
                  </h2>
                  <p className="mb-4">
                    {`Effortlessly create and manage your seminars. With just a
                    few clicks, set up new seminars, track attendance, and view
                    detailed reports of past sessions.`}
                  </p>
                  <div className="flex items-center gap-5">
                    <button
                      className="bg-[#5fda45] text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
                      onClick={() => {
                        router.push("/createseminar");
                      }}
                    >
                      Create Seminar
                    </button>
                    <button
                      className="bg-[#5fda45] text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
                      onClick={() => Router.push("/Class")}
                    >
                      View Past Seminars
                    </button>
                  </div>
                </>
              ) : user?.role === "STUDENT" ? (
                <>
                  <h2 className="text-2xl font-semibold mb-2 text-[#345068]">
                    Join and Track Your Learning
                  </h2>
                  <p className="mb-4 font-serif text-[#345068]">
                    {`Easily join seminars with location-based attendance,
                    ensuring you're counted when it matters. Stay on top of your
                    academic journey by viewing all your past seminars in one
                    place.`}
                  </p>
                  <div className="flex items-center gap-5">
                    <button
                      className="bg-[#5fda45] text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
                      onClick={() => {
                        router.push("/joinseminar");
                      }}
                    >
                      Join Seminar
                    </button>
                    <button
                      className="bg-[#5fda45] text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
                      onClick={() => Router.push("/Class")}
                    >
                      View Past Seminars Attended
                    </button>
                  </div>
                </>
              ) : null
            ) : null}
          </div>

          {/* Embla Image Slider */}
          <div
            className="z-10 flex-1 w-full h-full embla overflow-hidden"
            ref={emblaRef}
          >
            <div className="embla__container flex w-full h-full">
              {/* First slide */}
              <div className="embla__slide flex-[0_0_100%] min-w-0 w-full h-full">
                <img
                  src="/hero2.png"
                  alt="heroImg"
                  className="w-full h-full object-cover hidden md:inline-block"
                  style={{
                    clipPath:
                      "polygon(25% 0%, 100% 0%, 100% 100%, 25% 100%, 0% 50%)",
                  }}
                />
                <img
                  src="/hero2.png"
                  alt="heroImg"
                  className="w-full h-full object-cover md:hidden"
                />
              </div>
              <div className="embla__slide flex-[0_0_100%] min-w-0 w-full h-full ">
                <img
                  src="/logo.png"
                  alt="heroImg"
                  className="w-full h-full object-cover hidden md:inline-block"
                  style={{
                    clipPath:
                      "polygon(25% 0%, 100% 0%, 100% 100%, 25% 100%, 0% 50%)",
                  }}
                />
                <img
                  src="/logo.png"
                  alt="heroImg"
                  className="w-full h-full object-cover md:hidden"
                />
              </div>

              {/* Second slide */}

              <div className="embla__slide flex-[0_0_100%] min-w-0 w-full h-full">
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
                  className="w-full h-full object-cover md:hidden"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Main;
