"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var link_1 = __importDefault(require("next/link"));
var react_1 = __importDefault(require("react"));
var JoinSeminar = function () {
    return (<div>
      <div className="flex justify-center items-center h-[calc(100%-5rem)] mt-10 my-auto mx-auto">
        <div className="shadow-lg bg-white w-full max-w-4xl h-auto flex flex-col md:flex-row rounded-lg gap-5 overflow-hidden">
          {/* Left Section - Form */}
          <div className="w-full p-8">
            <h2 className="text-2xl font-bold text-gray-700">
              Enter details to Join class.
            </h2>

            <form className="space-y-5 mt-2">
              <div>
                <label htmlFor="">Passcode</label>
                <input type="text" placeholder="Enter your Passcode" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"/>
              </div>
              <div className="flex flex-col gap-5">
                <div>
                  <div className="bg-[#5fda45] p-2 rounded-xl flex justify-between items-center">
                    <link_1.default href="/">Give Location Access</link_1.default>
                    <input type="checkbox" className="w-5 h-5"/>
                  </div>
                </div>
                {/* /////TODO bluetooth access */}
                {/* <div className="bg-[#5fda45] p-2 rounded-xl flex justify-between items-center">
          <Link href="/">Give Bluetooth Access</Link>
          <input type="checkbox" className="w-5 h-5" />
        </div> */}
              </div>

              <button className="w-full bg-[#5fda45] text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300">
                Join Seminar
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>);
};
exports.default = JoinSeminar;
