"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var JoinSeminar_1 = __importDefault(require("@/components/JoinSeminar"));
var react_1 = __importDefault(require("react"));
var headers_1 = require("next/headers");
var navigation_1 = require("next/navigation");
var JoinClass = function () {
    var userRole = (0, headers_1.headers)().get("x-user-role");
    if (userRole === "TEACHER") {
        (0, navigation_1.redirect)("/home");
    }
    return (<div className="w-full flex flex-col items-center min-h-screen gap-10 overflow-y-auto">
      <JoinSeminar_1.default />
    </div>);
};
exports.default = JoinClass;
