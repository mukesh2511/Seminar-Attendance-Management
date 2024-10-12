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
var classModel_1 = __importDefault(require("@/models/classModel"));
var createClassSchema_1 = require("@/schemas/createClassSchema");
var db_1 = require("@/utils/db");
var mongoose_1 = __importDefault(require("mongoose"));
var server_1 = require("next/server");
function POST(req) {
    return __awaiter(this, void 0, void 0, function () {
        var body, className, code, latitude, longitude, ipAddTeacher, userId, userRole, teacherId, reqData, result, newClass, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, , 5]);
                    return [4 /*yield*/, req.json()];
                case 1:
                    body = _a.sent();
                    className = body.className, code = body.code, latitude = body.latitude, longitude = body.longitude, ipAddTeacher = body.ipAddTeacher;
                    userId = req.headers.get("x-user-id");
                    userRole = req.headers.get("x-user-role");
                    if (!userId) {
                        return [2 /*return*/, server_1.NextResponse.json({ success: false, message: "Unauthorized access!" }, { status: 401 })];
                    }
                    teacherId = new mongoose_1.default.Types.ObjectId(userId);
                    reqData = {
                        TeacherId: teacherId, // Use ObjectId
                        ipAddressTeacher: ipAddTeacher,
                        className: className,
                        classCode: code,
                        latitude: latitude,
                        longitude: longitude,
                        // attendedStudents: [
                        //   {
                        //     id: teacherId, // Ensure the ID is a valid ObjectId
                        //     dateTime: new Date(),
                        //   },
                        // ],
                    };
                    result = createClassSchema_1.createClassSchema.safeParse(reqData);
                    if (!result.success) {
                        return [2 /*return*/, server_1.NextResponse.json({ success: false, message: result.error.errors[0].message }, { status: 422 })];
                    }
                    // Connect to the database
                    return [4 /*yield*/, (0, db_1.Connect)()];
                case 2:
                    // Connect to the database
                    _a.sent();
                    return [4 /*yield*/, classModel_1.default.create(reqData)];
                case 3:
                    newClass = _a.sent();
                    return [2 /*return*/, server_1.NextResponse.json({
                            success: true,
                            message: "Class created successfully",
                            data: newClass,
                        }, { status: 201 })];
                case 4:
                    error_1 = _a.sent();
                    console.error("Error:", error_1);
                    return [2 /*return*/, server_1.NextResponse.json({
                            success: false,
                            message: "Internal server error",
                        })];
                case 5: return [2 /*return*/];
            }
        });
    });
}
