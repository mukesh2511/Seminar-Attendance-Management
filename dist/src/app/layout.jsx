"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.metadata = void 0;
exports.default = RootLayout;
var google_1 = require("next/font/google");
require("./globals.css");
var Navbar_1 = __importDefault(require("@/components/Navbar"));
var userContext_1 = require("@/context/userContext");
var inter = (0, google_1.Inter)({ subsets: ["latin"] });
exports.metadata = {
    title: "Create Next App",
    description: "Generated by create next app",
};
function RootLayout(_a) {
    var children = _a.children;
    return (<html lang="en">
      <body className={"bg-[#45bbda] ".concat(inter.className)}>
        <userContext_1.AuthContextProvider>
          <div className="max-w-[100vw] md:max-w-[1366px] min-h-screen md:mx-auto md:my-0 py-0 px-2 md:px-[60px] flex flex-col justify-between  ">
            <Navbar_1.default />
            {children}
          </div>
        </userContext_1.AuthContextProvider>
      </body>
    </html>);
}
