"use strict";
"use client";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var userContext_1 = require("@/context/userContext"); // AuthContext from your code
var navigation_1 = require("next/navigation");
var embla_carousel_react_1 = __importDefault(require("embla-carousel-react"));
var embla_carousel_autoplay_1 = __importDefault(require("embla-carousel-autoplay"));
var react_hot_toast_1 = require("react-hot-toast");
var Main = function () {
    var user = (0, react_1.useContext)(userContext_1.AuthContext).user; // Get user from context
    console.log({ user: user });
    var _a = (0, react_1.useState)(false), hydrated = _a[0], setHydrated = _a[1]; // Track hydration status
    var router = (0, navigation_1.useRouter)();
    var options = { loop: true };
    var _b = (0, embla_carousel_react_1.default)(options, [(0, embla_carousel_autoplay_1.default)()]), emblaRef = _b[0], emblaApi = _b[1];
    // Ensure the component is hydrated before rendering
    (0, react_1.useEffect)(function () {
        setHydrated(true); // Mark the component as hydrated
    }, []);
    // Redirect to login if no user after hydration
    (0, react_1.useEffect)(function () {
        if (hydrated && !user) {
            console.log({ home: user });
            router.push("/dashboard/login");
        }
    }, [hydrated, user, router]);
    // Prevent rendering on the server (before hydration) or if user is not available
    if (!hydrated || !user) {
        return null; // Prevent SSR mismatch by not rendering until hydrated
    }
    return (<>
      <react_hot_toast_1.Toaster />
      <div className="w-full flex flex-col items-center min-h-screen gap-10 overflow-y-auto">
        {/* First Section - Full Screen Hero */}
        <div className="relative w-full md:h-[80vh] shadow-xl flex flex-col md:flex-row justify-between items-center rounded-lg overflow-hidden md:pl-2 my-10 gap-5">
          {/* Background with opacity */}
          <div className="absolute inset-0 bg-[#cfdcff] opacity-30 rounded-lg"></div>

          {/* Content */}
          <div className="relative z-10 flex-1 flex flex-col justify-center  my-5 md:my-0 p-5 ">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 italic text-[#345068]">
              Welcome {user === null || user === void 0 ? void 0 : user.name}
            </h1>

            {/* Role-based content */}
            {hydrated ? ((user === null || user === void 0 ? void 0 : user.role) === "TEACHER" ? (<>
                  <h2 className="text-2xl font-semibold mb-2">
                    Simplify Your Seminar Management
                  </h2>
                  <p className="mb-4">
                    Effortlessly create and manage your seminars. With just a
                    few clicks, set up new seminars, track attendance, and view
                    detailed reports of past sessions.
                  </p>
                  <div className="flex items-center gap-5">
                    <button className="bg-[#5fda45] text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300" onClick={function () {
                router.push("/createseminar");
            }}>
                      Create Seminar
                    </button>
                    <button className="bg-[#5fda45] text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300">
                      View Past Seminars
                    </button>
                  </div>
                </>) : (user === null || user === void 0 ? void 0 : user.role) === "STUDENT" ? (<>
                  <h2 className="text-2xl font-semibold mb-2 text-[#345068]">
                    Join and Track Your Learning
                  </h2>
                  <p className="mb-4 font-serif text-[#345068]">
                    Easily join seminars with location-based attendance,
                    ensuring you're counted when it matters. Stay on top of your
                    academic journey by viewing all your past seminars in one
                    place.
                  </p>
                  <div className="flex items-center gap-5">
                    <button className="bg-[#5fda45] text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300" onClick={function () {
                router.push("/createseminar");
            }}>
                      Join Seminar
                    </button>
                    <button className="bg-[#5fda45] text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300">
                      View Past Seminars Attended
                    </button>
                  </div>
                </>) : null) : null}
          </div>

          {/* Embla Image Slider */}
          <div className="z-10 flex-1 w-full h-full embla overflow-hidden" ref={emblaRef}>
            <div className="embla__container flex w-full h-full">
              {/* First slide */}
              <div className="embla__slide flex-[0_0_100%] min-w-0 w-full h-full">
                <img src="/hero2.png" alt="heroImg" className="w-full h-full object-cover hidden md:inline-block" style={{
            clipPath: "polygon(25% 0%, 100% 0%, 100% 100%, 25% 100%, 0% 50%)",
        }}/>
                <img src="/hero2.png" alt="heroImg" className="w-full h-full object-cover md:hidden"/>
              </div>
              <div className="embla__slide flex-[0_0_100%] min-w-0 w-full h-full ">
                <img src="/logo.png" alt="heroImg" className="w-full h-full object-cover hidden md:inline-block" style={{
            clipPath: "polygon(25% 0%, 100% 0%, 100% 100%, 25% 100%, 0% 50%)",
        }}/>
                <img src="/logo.png" alt="heroImg" className="w-full h-full object-cover md:hidden"/>
              </div>

              {/* Second slide */}

              <div className="embla__slide flex-[0_0_100%] min-w-0 w-full h-full">
                <img src="/hero3.png" alt="heroImg" className="w-full h-full object-cover hidden md:inline-block" style={{
            clipPath: "polygon(25% 0%, 100% 0%, 100% 100%, 25% 100%, 0% 50%)",
        }}/>
                <img src="/hero3.png" alt="heroImg" className="w-full h-full object-cover md:hidden"/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>);
};
exports.default = Main;
