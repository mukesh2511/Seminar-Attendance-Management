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
var axios_1 = __importDefault(require("axios"));
var navigation_1 = require("next/navigation");
var react_1 = __importStar(require("react"));
var react_hot_toast_1 = __importStar(require("react-hot-toast"));
var uuidv4 = require("uuid").v4;
// let socket: Socket;
var CreateSeminar = function () {
    var Router = (0, navigation_1.useRouter)();
    var _a = (0, react_1.useState)(""), code = _a[0], setCode = _a[1];
    var _b = (0, react_1.useState)(0), latitude = _b[0], setLatitude = _b[1];
    var _c = (0, react_1.useState)(0), longitude = _c[0], setLongitude = _c[1];
    var _d = (0, react_1.useState)("00:00:00"), ipAddTeacher = _d[0], setIpAddTeacher = _d[1];
    var _e = (0, react_1.useState)(false), isLocationchecked = _e[0], SetIsLocationCheck = _e[1];
    var _f = (0, react_1.useState)(""), className = _f[0], setClassName = _f[1];
    var _g = (0, react_1.useState)(true), disable = _g[0], setDisable = _g[1];
    var _h = (0, react_1.useState)(false), loading = _h[0], setLoading = _h[1];
    var GeneratePassCode = function () {
        if (!code) {
            var uniqueId = uuidv4().replace(/-/g, "");
            var uniqueCode = uniqueId.slice(0, 8);
            setCode(uniqueCode);
        }
    };
    var validateFields = function () {
        return className !== "" && code !== "";
    };
    var validateLocation = function () {
        return latitude !== 0 && longitude !== 0 && ipAddTeacher !== "00:00:00";
    };
    (0, react_1.useEffect)(function () {
        setDisable(!validateFields());
    }, [code, className]);
    var getLocationandIp = function () { return __awaiter(void 0, void 0, void 0, function () {
        var position, response, data, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, , 5]);
                    return [4 /*yield*/, new Promise(function (resolve, reject) {
                            navigator.geolocation.getCurrentPosition(resolve, reject);
                        })];
                case 1:
                    position = _a.sent();
                    setLatitude(position.coords.latitude);
                    setLongitude(position.coords.longitude);
                    return [4 /*yield*/, fetch("https://api.ipify.org?format=json")];
                case 2:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 3:
                    data = _a.sent();
                    setIpAddTeacher(data.ip);
                    return [3 /*break*/, 5];
                case 4:
                    error_1 = _a.sent();
                    react_hot_toast_1.default.error("Failed to record location");
                    console.log("Error retrieving location or IP:", error_1);
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    var handleCheckBoxChange = function (e) { return __awaiter(void 0, void 0, void 0, function () {
        var checked;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    checked = e.target.checked;
                    SetIsLocationCheck(checked);
                    if (!checked) return [3 /*break*/, 2];
                    return [4 /*yield*/, getLocationandIp()];
                case 1:
                    _a.sent();
                    react_hot_toast_1.default.success("Location Recorded Successfully");
                    return [3 /*break*/, 3];
                case 2:
                    setLatitude(0);
                    setLongitude(0);
                    setIpAddTeacher("00:00:00");
                    _a.label = 3;
                case 3: return [2 /*return*/];
            }
        });
    }); };
    //////create seminar
    var handleCreateSeminar = function (e) { return __awaiter(void 0, void 0, void 0, function () {
        var classData, res, error_2;
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    e.preventDefault();
                    if (disable) {
                        return [2 /*return*/]; // Prevent further execution if the button is disabled
                    }
                    _c.label = 1;
                case 1:
                    _c.trys.push([1, 3, , 4]);
                    setLoading(true);
                    if (!validateLocation()) {
                        setLoading(false);
                        react_hot_toast_1.default.error("Please Verify Location");
                        return [2 /*return*/];
                    }
                    if (className.length < 2) {
                        setLoading(false);
                        react_hot_toast_1.default.error("ClassName must be minimum 2 characters!!");
                        return [2 /*return*/];
                    }
                    classData = {
                        className: className,
                        code: code,
                        latitude: latitude,
                        longitude: longitude,
                        ipAddTeacher: ipAddTeacher,
                    };
                    return [4 /*yield*/, react_hot_toast_1.default.promise(axios_1.default.post("/api/class/createclass", classData), {
                            loading: "Creating Seminar...",
                            success: "Seminar Created Successfully!",
                            error: "Failed to Create Seminar",
                        })];
                case 2:
                    res = _c.sent();
                    console.log(res.data.data);
                    if (res.status == 422) {
                        react_hot_toast_1.default.error(res.data.message);
                    }
                    if (res.status == 401) {
                        react_hot_toast_1.default.error(res.data.message);
                    }
                    if (res.status === 201) {
                        // console.log("HEHHEHEHE");
                        // const id = res?.data?.data?._id;
                        // console.log(`Emitting join-class with id: ${id}`);
                        // socket.emit("join-class", id);
                        Router.push("/Class/".concat((_b = (_a = res === null || res === void 0 ? void 0 : res.data) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b._id));
                    }
                    return [3 /*break*/, 4];
                case 3:
                    error_2 = _c.sent();
                    setLoading(false);
                    react_hot_toast_1.default.error(error_2.response.data.message);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    // useEffect(() => {
    //   // Initialize socket connection
    //   socket = io(); // Replace with your backend URL
    //   return () => {
    //     // Disconnect socket on unmount
    //     if (socket) {
    //       socket.disconnect();
    //     }
    //   };
    // }, []);
    return (<>
      <react_hot_toast_1.Toaster />
      <div>
        <div className="flex justify-center items-center h-[calc(100%-5rem)] mt-10 my-auto mx-auto">
          <div className="shadow-lg bg-white w-full max-w-4xl h-auto flex flex-col md:flex-row rounded-lg overflow-hidden">
            {/* Left Section - Form */}
            <div className="w-full p-8">
              <h2 className="text-2xl font-bold text-gray-700">
                Enter details to create class.
              </h2>

              <form className="space-y-4 mt-5" onClick={handleCreateSeminar}>
                <div>
                  <label htmlFor="">Class Name</label>
                  <input minLength={2} maxLength={40} onChange={function (e) {
            return setClassName(e.target.value);
        }} type="text" placeholder="Class Name" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"/>
                </div>
                {/* <div>
        <label htmlFor="">Name</label>
        <input
          type="text"
          placeholder="Name"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
        />
      </div> */}
                {/* <div>
        <label htmlFor="">Email</label>
        <input
          type="email"
          placeholder="Email"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          />
          </div> */}
                <div>
                  <label htmlFor="">Passcode</label>
                  <input type="text" placeholder="Enter your Passcode" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500" defaultValue={code} onFocus={GeneratePassCode} minLength={8} maxLength={8}/>
                </div>
                <div className="flex flex-col gap-5">
                  <div>
                    <div className="bg-[#5fda45] p-2 rounded-xl flex justify-between items-center">
                      <p>Give Location Access</p>
                      <input type="checkbox" className="w-5 h-5 cursor-pointer" checked={isLocationchecked} onChange={handleCheckBoxChange}/>
                    </div>
                  </div>

                  {/* <div className="bg-[#5fda45] p-2 rounded-xl flex justify-between items-center">
        <Link href="/">Give Bluetooth Access</Link>
        <input type="checkbox" className="w-5 h-5" />
        </div> */}
                </div>

                <button type="submit" className={"w-full py-2 rounded-lg text-white transition duration-300 ".concat(disable
            ? "bg-gray-400 cursor-not-allowed "
            : loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-[#5fda45] hover:bg-blue-600", " \n\n                ")} disabled={loading}>
                  {loading ? (<img src="/spinner.gif" alt="Loading..." className="w-6 h-6 mx-auto"/>) : ("Create Seminar")}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>);
};
exports.default = CreateSeminar;
