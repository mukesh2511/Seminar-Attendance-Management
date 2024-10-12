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
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = exports.middleware = void 0;
var jose_1 = require("jose");
var headers_1 = require("next/headers");
var server_1 = require("next/server");
var middleware = function (req) { return __awaiter(void 0, void 0, void 0, function () {
    var cookieStore, tokenCookie, token, secretKey, payload, tokenData, _a, id, role, newHeaders, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                cookieStore = (0, headers_1.cookies)();
                tokenCookie = cookieStore.get("token");
                // console.log({ tokenCookie });
                if (!tokenCookie) {
                    // Redirect to login if token is missing
                    return [2 /*return*/, server_1.NextResponse.redirect(new URL("/dashboard/login", req.url))];
                }
                token = tokenCookie.value;
                secretKey = new Uint8Array(Buffer.from(process.env.JWTSECRET, "utf-8"));
                return [4 /*yield*/, (0, jose_1.jwtVerify)(token, secretKey)];
            case 1:
                payload = (_b.sent()).payload;
                tokenData = payload.tokenData;
                _a = tokenData, id = _a.id, role = _a.role;
                newHeaders = new Headers(req.headers);
                newHeaders.set("x-user-id", id);
                newHeaders.set("x-user-role", role);
                // console.log(newHeaders);
                // Return a modified response with the new headers attached
                return [2 /*return*/, server_1.NextResponse.next({
                        request: {
                            headers: newHeaders,
                        },
                    })];
            case 2:
                error_1 = _b.sent();
                console.error("JWT verification error:", error_1);
                // Redirect to login if token verification fails
                return [2 /*return*/, server_1.NextResponse.redirect(new URL("/dashboard/login", req.url))];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.middleware = middleware;
exports.config = {
    matcher: [
        "/Class/:path*",
        "/home",
        "/createseminar",
        "/joinseminar",
        "/api/class/:path*",
    ],
};
