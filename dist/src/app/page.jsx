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
var react_typed_1 = require("react-typed");
var ArrowCircleDown_1 = __importDefault(require("@mui/icons-material/ArrowCircleDown"));
var CallMade_1 = __importDefault(require("@mui/icons-material/CallMade"));
var userContext_1 = require("@/context/userContext");
var jose_1 = require("jose");
var react_hot_toast_1 = __importStar(require("react-hot-toast"));
var Home = function () {
    //
    // console.log({ user });
    var secondRef = (0, react_1.useRef)(null);
    var _a = (0, react_1.useContext)(userContext_1.AuthContext), user = _a.user, dispatch = _a.dispatch;
    /////check token expired
    var isTokenExpired = function (token) { return __awaiter(void 0, void 0, void 0, function () {
        var secretKeyString, secretKey, payload, currentTime, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    console.log("Token expiration inside", token);
                    if (!token) {
                        return [2 /*return*/, react_hot_toast_1.default.error("Login to continue!!")];
                    }
                    secretKeyString = "mijsuh87we3hrjn";
                    if (!secretKeyString) {
                        console.error("JWTSECRET is not defined");
                        return [2 /*return*/, false];
                    }
                    secretKey = new TextEncoder().encode(secretKeyString);
                    return [4 /*yield*/, (0, jose_1.jwtVerify)(token, secretKey)];
                case 1:
                    payload = (_a.sent()).payload;
                    console.log({ payload: payload }, "Decoded Token");
                    currentTime = Math.floor(Date.now() / 1000);
                    if (!payload.exp) {
                        console.log("No expiration time");
                        return [2 /*return*/, false];
                    }
                    console.log({ expirTime: payload.exp });
                    // Return true if expired, otherwise false
                    return [2 /*return*/, payload.exp < currentTime];
                case 2:
                    error_1 = _a.sent();
                    if (error_1.code === "ERR_JWT_EXPIRED") {
                        console.error("Token has expired:", error_1);
                        return [2 /*return*/, true]; // Token is expired
                    }
                    else {
                        console.error("Error verifying token:", error_1);
                        return [2 /*return*/, false]; // Other errors
                    }
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    (0, react_1.useEffect)(function () {
        var checkToken = function () { return __awaiter(void 0, void 0, void 0, function () {
            var token, expired;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!user) return [3 /*break*/, 2];
                        token = user.token;
                        return [4 /*yield*/, isTokenExpired(token)];
                    case 1:
                        expired = _a.sent();
                        if (expired) {
                            react_hot_toast_1.default.error("Login to continue!!");
                            console.log("Token expired");
                            dispatch({ type: "LOGOUT" });
                            localStorage.removeItem("user");
                        }
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        }); };
        checkToken();
    }, [user]); // Make sure to add user as a dependency
    var scrollToSection = function () {
        var _a;
        (_a = secondRef.current) === null || _a === void 0 ? void 0 : _a.scrollIntoView({ behavior: "smooth" });
    };
    return (<>
      <react_hot_toast_1.Toaster />
      <div className="w-full flex flex-col items-center min-h-screen gap-10 overflow-y-auto">
        {/* First Section - Full Screen Hero */}
        <div className="relative w-full h-[80vh] shadow-xl flex flex-col md:flex-row justify-between items-center rounded-lg overflow-hidden md:pl-2 my-10">
          {/* Background with opacity */}
          <div className="absolute inset-0 bg-[#cfdcff] opacity-30 rounded-lg"></div>

          {/* Content */}
          <div className="relative z-10 flex-1 flex flex-col justify-center my-5 md:my-0 pl-10">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Welcome to</h1>
            <react_typed_1.ReactTyped strings={["Seminar Attendance Management"]} typeSpeed={50} backSpeed={40} showCursor={false} className="text-2xl md:text-3xl text-Black font-semibold mb-4"/>
            <react_typed_1.ReactTyped strings={[
            "Efficient Tracking for Teachers",
            "Easy Participation for Students",
        ]} typeSpeed={50} backSpeed={40} startDelay={2000} fadeOut={true} loop className="text-2xl md:text-3xl text-blue-600 font-semibold"/>
            <ArrowCircleDown_1.default className="text-6xl hidden md:flex justify-center mt-20 animate-bounce text-blue-600 cursor-pointer" onClick={scrollToSection}/>
          </div>

          {/* Image with clip-path */}
          <div className="z-10 flex-1 w-full h-full">
            <img src="/hero.png" alt="heroImg" className="w-full h-full object-cover hidden md:inline-block" style={{
            clipPath: "polygon(25% 0%, 100% 0%, 100% 100%, 25% 100%, 0% 50%)",
        }}/>
            <img src="/hero.png" alt="heroImg" className="w-full h-full object-cover md:hidden"/>
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
            <img src="/hero2.png" alt="heroImg" className="w-full h-full object-cover hidden md:inline-block" style={{
            clipPath: "polygon(0% 0%, 75% 0%, 100% 50%, 75% 100%, 0% 100%)",
        }}/>
            <img src="/hero2.png" alt="heroImg" className="w-full h-full object-cover md:hidden"/>
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
              <link_1.default href="/">
                Try Now <CallMade_1.default />
              </link_1.default>
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
              <link_1.default href="/">
                Try Now <CallMade_1.default />
              </link_1.default>
            </div>
          </div>
          <div className="z-10 flex-1 w-full h-full">
            <img src="/hero3.png" alt="heroImg" className="w-full h-full object-cover hidden md:inline-block" style={{
            clipPath: "polygon(25% 0%, 100% 0%, 100% 100%, 25% 100%, 0% 50%)",
        }}/>
            <img src="/hero3.png" alt="heroImg" className="w-full h-full object-cover md:hidden rounded-l-sm"/>
          </div>
        </div>
      </div>
    </>);
};
exports.default = Home;
