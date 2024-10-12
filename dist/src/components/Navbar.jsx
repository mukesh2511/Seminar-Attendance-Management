"use strict";
"use client";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var link_1 = __importDefault(require("next/link"));
var react_1 = __importStar(require("react"));
var Menu_1 = __importDefault(require("@mui/icons-material/Menu"));
var Close_1 = __importDefault(require("@mui/icons-material/Close"));
var userContext_1 = require("@/context/userContext");
var navigation_1 = require("next/navigation");
var react_hot_toast_1 = __importStar(require("react-hot-toast"));
var axios_1 = __importDefault(require("axios"));
var Navbar = function () {
    var _a, _b;
    var Router = (0, navigation_1.useRouter)();
    var _c = (0, react_1.useContext)(userContext_1.AuthContext), user = _c.user, dispatch = _c.dispatch;
    var _d = (0, react_1.useState)(false), hydrated = _d[0], setHydrated = _d[1];
    var clickRef = (0, react_1.useRef)(null);
    var _e = (0, react_1.useState)(false), open = _e[0], setOpen = _e[1];
    var _f = (0, react_1.useState)(false), active = _f[0], SetActive = _f[1];
    // Hydration state for client-only rendering
    (0, react_1.useEffect)(function () {
        setHydrated(true);
    }, []);
    (0, react_1.useEffect)(function () {
        var handleClickOutside = function (event) {
            if (clickRef.current &&
                !clickRef.current.contains(event.target)) {
                setOpen(false);
            }
        };
        if (open) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        else {
            document.removeEventListener("mousedown", handleClickOutside);
        }
        return function () {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [open]);
    var isActive = function () {
        window.scrollY > 0 ? SetActive(true) : SetActive(false);
    };
    (0, react_1.useEffect)(function () {
        window.addEventListener("scroll", isActive);
        return function () {
            window.removeEventListener("scroll", isActive);
        };
    }, []);
    var logout = function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            try {
                react_hot_toast_1.default.promise(axios_1.default.post("/api/auth/logout"), {
                    loading: "Logging Out...",
                    success: "Logged Out Successfully",
                    error: "Logout Failed!!",
                });
                localStorage.removeItem("user");
                dispatch({ type: "LOGOUT" });
                Router.push("/dashboard/login");
            }
            catch (error) {
                console.log("Error in logout");
                react_hot_toast_1.default.error(error.response.data.message);
            }
            return [2 /*return*/];
        });
    }); };
    return (<>
      <react_hot_toast_1.Toaster />
      <div className={"z-50\n        w-full h-20 inset-0 bg-opacity-30  rounded-b-lg sticky top-0 ".concat(active ? "bg-[#195665]" : "bg-[#9cdbeb]")}>
        <div className="px-5 py-1 flex justify-between items-center">
          <div className="w-16 h-16 rounded-[50%] overflow-hidden ">
            <link_1.default href={"/"}>
              <img src="/logo.png" alt="logo" className="w-full h-full object-cover"/>
            </link_1.default>
          </div>

          {user && hydrated ? (<div className="flex justify-center items-center gap-4 text-black font-bold relative">
              <link_1.default href="/home">Home</link_1.default>
              {user && user.role === "STUDENT" && (<div className="bg-[#5fda45] p-2 rounded-xl hidden md:flex hover:bg-blue-600 transition duration-300">
                  <link_1.default href="/">Join Seminar</link_1.default>
                </div>)}
              {user && user.role === "TEACHER" && (<div className="bg-[#5fda45] p-2 rounded-xl hidden md:flex hover:bg-blue-600 transition duration-300">
                  <link_1.default href="/createseminar">Create Seminar</link_1.default>
                </div>)}
              <div className=" hidden md:flex justify-center items-center gap-1">
                <div className="w-10 h-10 rounded-[50%] font-bold text-[#bbe6f1] bg-[#30495f] flex justify-center items-center text-lg">
                  {user.name.slice(0, 2)}
                </div>
              </div>
              <button onClick={logout} className="hidden md:flex">
                Logout
              </button>

              <div onClick={function () { return setOpen(!open); }} className="md:hidden">
                {open ? (<Close_1.default className=" text-red-700
                  font-extrabold"/> // Show CloseIcon when open
            ) : (<Menu_1.default className=""/> // Show MenuIcon when closed
            )}
              </div>

              {/* Sidebar */}
              {open && (<div ref={clickRef} className="w-[300px] bg-[#30495f] h-screen absolute top-24 -right-10 flex flex-col items-start gap-5 p-5 rounded-lg ">
                  {user && (<div className="flex justify-center items-center gap-1">
                      <div className="w-10 h-10 rounded-[50%] font-bold text-white bg-[#5fda45] flex justify-center items-center text-lg">
                        {(_a = user === null || user === void 0 ? void 0 : user.name) === null || _a === void 0 ? void 0 : _a.slice(0, 2)}
                      </div>
                      <p className="text-white font-bold">
                        {(_b = user === null || user === void 0 ? void 0 : user.name) === null || _b === void 0 ? void 0 : _b.split(" ")[0]}
                      </p>
                    </div>)}
                  {user && user.role === "STUDENT" && (<div className="bg-[#5fda45] p-2 rounded-xl">
                      <link_1.default href="/joinseminar" className="text-white font-bold">
                        Join Seminar
                      </link_1.default>
                    </div>)}
                  {user && user.role === "TEACHER" && (<div className="bg-[#5fda45] p-2 rounded-xl">
                      <link_1.default href="/" className="text-white font-bold">
                        Create Seminar
                      </link_1.default>
                    </div>)}
                  {user && user.role === "TEACHER" && (<div className="bg-[#5fda45] p-2 rounded-xl">
                      <link_1.default href="/" className="text-white font-bold">
                        View Created Seminars
                      </link_1.default>
                    </div>)}
                  {user && user.role === "STUDENT" && (<div className="bg-[#5fda45] p-2 rounded-xl">
                      <link_1.default href="/" className="text-white font-bold">
                        View Past Seminars Attended
                      </link_1.default>
                    </div>)}

                  <div onClick={logout} className="text-white font-bold">
                    Logout
                  </div>
                </div>)}
            </div>) : (<div className="flex justify-center items-center gap-4 text-black font-bold relative">
              <div className="bg-[#5fda45] p-2 rounded-xl">
                <link_1.default href="/dashboard/login" className="text-white font-bold">
                  Login
                </link_1.default>
              </div>
              <div className="bg-[#5fda45] p-2 rounded-xl">
                <link_1.default href="/dashboard/register" className="text-white font-bold">
                  Register
                </link_1.default>
              </div>
            </div>)}
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
    </>);
};
exports.default = Navbar;
