"use strict";
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
var server_1 = require("next/server");
var bcryptjs_1 = __importDefault(require("bcryptjs"));
var db_1 = require("@/utils/db");
var userModel_1 = __importDefault(require("@/models/userModel"));
var studentModel_1 = __importDefault(require("@/models/studentModel"));
var teacherModel_1 = __importDefault(require("@/models/teacherModel"));
var signUpSchema_1 = require("@/schemas/signUpSchema");
// Use async function for the POST method and export it
function POST(req) {
    return __awaiter(this, void 0, void 0, function () {
        var body, result, name_1, email, password, role, division, className, rollNo, isVerified, db, isUserPresent, hashedPassword, newUser, student, teacher, savedUser, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 10, , 11]);
                    return [4 /*yield*/, req.json()];
                case 1:
                    body = _a.sent();
                    result = signUpSchema_1.signUpSchema.safeParse(body);
                    if (!result.success) {
                        return [2 /*return*/, server_1.NextResponse.json({
                                error: result.error.errors, // Detailed error messages
                            }, { status: 400 })];
                    }
                    name_1 = body.name, email = body.email, password = body.password, role = body.role, division = body.division, className = body.className, rollNo = body.rollNo, isVerified = body.isVerified;
                    return [4 /*yield*/, (0, db_1.Connect)()];
                case 2:
                    db = _a.sent();
                    return [4 /*yield*/, userModel_1.default.findOne({ email: email })];
                case 3:
                    isUserPresent = _a.sent();
                    if (isUserPresent) {
                        return [2 /*return*/, server_1.NextResponse.json({ success: false, message: "User already exists!!" }, { status: 409 })];
                    }
                    return [4 /*yield*/, bcryptjs_1.default.hash(password, 10)];
                case 4:
                    hashedPassword = _a.sent();
                    newUser = new userModel_1.default({
                        name: name_1,
                        email: email,
                        password: hashedPassword,
                        isVerified: isVerified,
                        role: role,
                    });
                    student = void 0;
                    teacher = void 0;
                    return [4 /*yield*/, newUser.save()];
                case 5:
                    savedUser = _a.sent();
                    if (!(savedUser.role === "STUDENT")) return [3 /*break*/, 7];
                    return [4 /*yield*/, studentModel_1.default.create({
                            userId: savedUser._id,
                            className: className,
                            division: division,
                            rollNo: rollNo,
                        })];
                case 6:
                    student = _a.sent();
                    return [3 /*break*/, 9];
                case 7: return [4 /*yield*/, teacherModel_1.default.create({
                        userId: savedUser._id,
                    })];
                case 8:
                    teacher = _a.sent();
                    _a.label = 9;
                case 9: return [2 /*return*/, server_1.NextResponse.json({
                        success: true,
                        message: "User created successfully",
                        savedUser: savedUser,
                        teacher: teacher,
                        student: student,
                    }, { status: 201 })];
                case 10:
                    error_1 = _a.sent();
                    console.error("Error creating user:", error_1);
                    return [2 /*return*/, server_1.NextResponse.json({ success: true, message: "Internal Server Error" }, { status: 500 })];
                case 11: return [2 /*return*/];
            }
        });
    });
}
