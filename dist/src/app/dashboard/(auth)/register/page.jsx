"use strict";
"use client";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var react_1 = __importStar(require("react"));
var react_hot_toast_1 = __importStar(require("react-hot-toast"));
var axios_1 = __importDefault(require("axios"));
var navigation_1 = require("next/navigation");
var link_1 = __importDefault(require("next/link"));
var signUpSchema_1 = require("@/schemas/signUpSchema");
var Register = function () {
    var Router = (0, navigation_1.useRouter)();
    var _a = (0, react_1.useState)(true), disable = _a[0], setDisable = _a[1];
    var _b = (0, react_1.useState)(false), loading = _b[0], setLoading = _b[1];
    var _c = (0, react_1.useState)({
        name: "",
        email: "",
        password: "",
        role: "STUDENT",
        division: "",
        className: "",
        rollNo: 0,
        isVerified: "true",
    }), user = _c[0], setUser = _c[1];
    var validateUser = function () {
        var name = user.name, email = user.email, password = user.password, role = user.role, division = user.division, className = user.className, rollNo = user.rollNo;
        // Check if any of the fields are empty or invalid
        return (name.trim() !== "" &&
            email.trim() !== "" &&
            password.trim() !== "" &&
            role.trim() !== "" &&
            division.trim() !== "" &&
            className.trim() !== "" &&
            rollNo > 0 // Roll number must be greater than 0
        );
    };
    (0, react_1.useEffect)(function () {
        if (validateUser()) {
            setDisable(false);
        }
        else {
            setDisable(true);
        }
    }, [user]);
    var onSignUp = function (e) { return __awaiter(void 0, void 0, void 0, function () {
        var result, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    e.preventDefault();
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    setLoading(true);
                    result = signUpSchema_1.signUpSchema.safeParse(user);
                    if (!result.success) {
                        react_hot_toast_1.default.error(result.error.issues[0].message);
                        setLoading(false);
                        return [2 /*return*/];
                    }
                    // Using toast.promise to handle the API call and toast notifications
                    return [4 /*yield*/, react_hot_toast_1.default.promise(axios_1.default.post("/api/auth/register", user), {
                            loading: "Registering...",
                            success: "Registered Successfully!",
                            error: "Registration failed. Please try again.",
                        })];
                case 2:
                    // Using toast.promise to handle the API call and toast notifications
                    _a.sent();
                    setLoading(false);
                    Router.push("/dashboard/login");
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    setLoading(false);
                    console.log("Signup failed", error_1);
                    react_hot_toast_1.default.error(error_1.response.data.message);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    return (<>
      <react_hot_toast_1.Toaster />
      <div className="flex justify-center items-center h-[calc(100%-5rem)] mt-10 my-auto mx-auto">
        <div className="shadow-lg bg-white w-full max-w-4xl h-auto flex flex-col md:flex-row rounded-lg overflow-hidden">
          {/* Left Section - Form */}
          <div className="w-full md:w-1/2 p-8">
            <h2 className="text-2xl font-bold text-gray-700">Register</h2>
            <p className="text-gray-500 mb-6">Sign up to get started</p>

            <form className="space-y-4" onSubmit={onSignUp}>
              <input value={user.name} onChange={function (e) { return setUser(__assign(__assign({}, user), { name: e.target.value })); }} type="text" placeholder="Name" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"/>
              <input type="email" placeholder="Email" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500" value={user.email} onChange={function (e) { return setUser(__assign(__assign({}, user), { email: e.target.value })); }}/>
              <input type="password" placeholder="Password" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500" value={user.password} onChange={function (e) { return setUser(__assign(__assign({}, user), { password: e.target.value })); }}/>
              <input type="text" placeholder="Class" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500" value={user.className} onChange={function (e) {
            return setUser(__assign(__assign({}, user), { className: e.target.value }));
        }}/>
              <input type="text" placeholder="Division" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500" value={user.division} onChange={function (e) { return setUser(__assign(__assign({}, user), { division: e.target.value })); }}/>
              <input type="number" placeholder="Roll No" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500" value={user.rollNo} onChange={function (e) { return setUser(__assign(__assign({}, user), { rollNo: +e.target.value })); }}/>
              <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500" value={user.role} onChange={function (e) { return setUser(__assign(__assign({}, user), { role: e.target.value })); }}>
                <option value="STUDENT">Select Role</option>
                <option value="STUDENT">STUDENT</option>
                <option value="TEACHER">TEACHER</option>
              </select>

              <button disabled={disable} type="submit" className={"w-full text-white py-2 rounded-lg transition duration-300 ".concat(disable ? "bg-[#5fda45]" : "bg-[#5fda45] hover:bg-blue-600", "\n                ").concat(loading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-[#5fda45] hover:bg-blue-600")}>
                {loading ? (<img src="/spinner.gif" alt="loading.." className="w-6 h-6 mx-auto bg-[#5fda45]"/>) : disable ? ("No SignUp") : ("Sign Up")}
              </button>
            </form>
            <p className="text-gray-500 mb-6 text-center mt-2">
              already have an Account?{" "}
              <link_1.default href={"/dashboard/login"}>
                <b className="hover:text-[#5fda45]">Click here</b>
              </link_1.default>
            </p>
          </div>

          {/* Right Section - Image and Text */}
          <div className="w-full md:w-1/2 bg-cover bg-center relative p-2  hidden md:flex" style={{
            backgroundImage: "url(https://wpschoolpress.com/wp-content/uploads/2023/05/Attendance-Management-System.png) ",
            backgroundSize: "cover",
        }}>
            <div className="absolute inset-0 top-7 bg-opacity-10 ">
              <h3 className="text-[#374151] text-xl md:text-2xl font-semibold text-center">
                Attendance Made Simple, Anywhere You Are!
              </h3>
            </div>
          </div>
        </div>
      </div>
    </>);
};
exports.default = Register;
