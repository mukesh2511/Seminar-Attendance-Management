"use strict";
// server.ts
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
exports.getData = getData;
var http_1 = require("http");
var url_1 = require("url");
var next_1 = __importDefault(require("next"));
var socket_io_1 = require("socket.io");
var mongoose_1 = __importDefault(require("mongoose"));
var db_1 = require("./src/utils/db"); // Removed .tsx
var classModel_1 = __importDefault(require("./src/models/classModel")); // Removed .ts
var dev = process.env.NODE_ENV !== "production";
var app = (0, next_1.default)({ dev: dev });
var handle = app.getRequestHandler();
// interface ClassDataResponse {
//   success: boolean;
//   data?: ClassDocument[];
//   message?: string;
//   status: number;
// }
app.prepare().then(function () {
    var server = (0, http_1.createServer)(function (req, res) {
        var parsedUrl = (0, url_1.parse)(req.url, true);
        handle(req, res, parsedUrl);
    });
    // Socket.IO setup
    var io = new socket_io_1.Server(server);
    io.on("connection", function (socket) {
        console.log("New client connected");
        socket.on("message", function (data) {
            console.log("Message received:", data);
            socket.broadcast.emit("message", data);
        });
        socket.on("join-class", function (id) { return __awaiter(void 0, void 0, void 0, function () {
            var classData, error_1;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        console.log("Client joined the class with id: ".concat(id));
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, getData(id)];
                    case 2:
                        classData = _b.sent();
                        console.log(classData);
                        if (classData.success) {
                            // If class data is successfully fetched, join the room and emit the data
                            socket.join(id);
                            socket.to(id).emit("receive-data", (_a = classData.data) === null || _a === void 0 ? void 0 : _a[0]); // Emits data to the other clients in the room
                            console.log("Data sent for class id: ".concat(id));
                        }
                        else {
                            // If there was an issue fetching data, emit an error message
                            socket.emit("error", { message: classData.message });
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _b.sent();
                        // Emit an error event if something goes wrong
                        socket.emit("error", {
                            message: "An error occurred while fetching class data.",
                        });
                        console.error("Error fetching class data for id: ".concat(id), error_1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
        socket.on("disconnect", function () {
            console.log("Client disconnected");
        });
    });
    // Start the server
    var PORT = process.env.PORT || 3000;
    server.listen(PORT, function (err) {
        if (err)
            throw err;
        console.log("> Ready on http://localhost:".concat(PORT));
    });
});
function getData(id) {
    return __awaiter(this, void 0, void 0, function () {
        var myClass, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    // Ensure a valid ID is provided
                    if (!id || !mongoose_1.default.Types.ObjectId.isValid(id)) {
                        return [2 /*return*/, {
                                success: false,
                                message: "Invalid ID provided!",
                                status: 400,
                            }];
                    }
                    // Connect to the database
                    return [4 /*yield*/, (0, db_1.Connect)()];
                case 1:
                    // Connect to the database
                    _a.sent();
                    return [4 /*yield*/, classModel_1.default.aggregate([
                            {
                                $match: {
                                    _id: new mongoose_1.default.Types.ObjectId(id),
                                },
                            },
                            {
                                $lookup: {
                                    from: "users",
                                    localField: "TeacherId",
                                    foreignField: "_id",
                                    as: "teacher",
                                },
                            },
                            {
                                $unwind: {
                                    path: "$teacher",
                                    preserveNullAndEmptyArrays: true,
                                },
                            },
                            {
                                $lookup: {
                                    from: "users",
                                    localField: "attendedStudents.id",
                                    foreignField: "_id",
                                    as: "Students",
                                    pipeline: [
                                        {
                                            $lookup: {
                                                from: "students",
                                                localField: "_id",
                                                foreignField: "userId",
                                                as: "student",
                                            },
                                        },
                                        {
                                            $unwind: {
                                                path: "$student",
                                                preserveNullAndEmptyArrays: true,
                                            },
                                        },
                                    ],
                                },
                            },
                            {
                                $addFields: {
                                    Students: {
                                        $map: {
                                            input: "$Students",
                                            as: "student",
                                            in: {
                                                _id: "$$student._id",
                                                name: "$$student.name",
                                                dateTime: {
                                                    $arrayElemAt: [
                                                        {
                                                            $filter: {
                                                                input: "$attendedStudents",
                                                                as: "attended",
                                                                cond: {
                                                                    $eq: ["$$attended.id", "$$student._id"],
                                                                },
                                                            },
                                                        },
                                                        0,
                                                    ],
                                                },
                                                className: "$$student.student.className",
                                                division: "$$student.student.division",
                                                rollNo: "$$student.student.rollNo",
                                            },
                                        },
                                    },
                                },
                            },
                            {
                                $project: {
                                    _id: 1,
                                    className: 1,
                                    classCode: 1,
                                    latitude: 1,
                                    longitude: 1,
                                    ipAddressTeacher: 1,
                                    createdAt: 1,
                                    teacher: {
                                        name: "$teacher.name",
                                        email: "$teacher.email",
                                    },
                                    Students: {
                                        _id: 1,
                                        name: 1,
                                        dateTime: 1,
                                        rollNo: 1,
                                        division: 1,
                                        className: 1,
                                    },
                                },
                            },
                        ])];
                case 2:
                    myClass = _a.sent();
                    // If no class is found, return a 404 error
                    if (!myClass || myClass.length === 0) {
                        return [2 /*return*/, {
                                success: false,
                                message: "Class Not Found!!",
                                status: 404,
                            }];
                    }
                    // If class is found, return the data
                    return [2 /*return*/, {
                            success: true,
                            data: myClass,
                            status: 200,
                        }];
                case 3:
                    error_2 = _a.sent();
                    console.error("Error fetching class:", error_2);
                    // Return error response in case of server issues
                    return [2 /*return*/, {
                            success: false,
                            message: "Internal Server Error",
                            status: 500,
                        }];
                case 4: return [2 /*return*/];
            }
        });
    });
}
