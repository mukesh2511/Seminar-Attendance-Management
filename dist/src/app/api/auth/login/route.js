"use strict";
"use server";
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
exports.POST = POST;
var headers_1 = require("next/headers");
var userModel_1 = __importDefault(require("@/models/userModel"));
var signInSchema_1 = require("@/schemas/signInSchema");
var server_1 = require("next/server");
var bcryptjs_1 = __importDefault(require("bcryptjs"));
var jose_1 = require("jose");
var util_1 = require("util");
var db_1 = require("@/utils/db");
function POST(req) {
    return __awaiter(this, void 0, void 0, function () {
        var body, result, _a, email, password, checkUserWithEmail, isValidPassword, tokenData, secretKey, token, user, response, error_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 7, , 8]);
                    return [4 /*yield*/, req.json()];
                case 1:
                    body = _b.sent();
                    result = signInSchema_1.signInSchema.safeParse(body);
                    if (!result.success) {
                        return [2 /*return*/, server_1.NextResponse.json({
                                error: result.error.errors,
                            }, { status: 400 })];
                    }
                    _a = result.data, email = _a.email, password = _a.password;
                    ////connect to Db
                    return [4 /*yield*/, (0, db_1.Connect)()];
                case 2:
                    ////connect to Db
                    _b.sent();
                    return [4 /*yield*/, userModel_1.default.findOne({ email: email })];
                case 3:
                    checkUserWithEmail = _b.sent();
                    if (!checkUserWithEmail) {
                        return [2 /*return*/, server_1.NextResponse.json({
                                success: false,
                                message: "User not found",
                            }, { status: 404 })];
                    }
                    return [4 /*yield*/, bcryptjs_1.default.compare(password, checkUserWithEmail.password)];
                case 4:
                    isValidPassword = _b.sent();
                    if (!isValidPassword) {
                        return [2 /*return*/, server_1.NextResponse.json({
                                success: false,
                                message: "Please enter a valid Email or Password",
                            }, { status: 403 })];
                    }
                    tokenData = {
                        id: checkUserWithEmail._id,
                        role: checkUserWithEmail.role,
                    };
                    secretKey = new util_1.TextEncoder().encode(process.env.JWTSECRET);
                    return [4 /*yield*/, new jose_1.SignJWT({ tokenData: tokenData })
                            .setProtectedHeader({ alg: "HS256", typ: "JWT" }) // Specify the algorithm and type
                            .setIssuedAt() // Set the issue time to now
                            .setExpirationTime("1d") // Set the expiration time (e.g., 1 day)
                            .sign(secretKey)];
                case 5:
                    token = _b.sent();
                    return [4 /*yield*/, userModel_1.default.findOne({ email: email }).select("-password")];
                case 6:
                    user = _b.sent();
                    console.log(user);
                    response = server_1.NextResponse.json({
                        success: true,
                        message: "Login successfull",
                        token: token,
                        user: user,
                    }, { status: 200 });
                    // Set cookie with token
                    (0, headers_1.cookies)().set("token", token, { httpOnly: true, path: "/", maxAge: 86400 });
                    return [2 /*return*/, response];
                case 7:
                    error_1 = _b.sent();
                    console.error("Error during sign-in:", error_1);
                    return [2 /*return*/, server_1.NextResponse.json({ message: "Internal Server Error" }, { status: 500 })];
                case 8: return [2 /*return*/];
            }
        });
    });
}
