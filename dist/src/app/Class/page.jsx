"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var link_1 = __importDefault(require("next/link"));
var react_1 = __importDefault(require("react"));
var AllClass = function () {
    return (<div className="flex justify-center items-center h-[calc(100%-5rem)] mt-10 my-auto mx-auto w-full">
      <div className="w-full">
        <div className="w-full flex flex-col items-center">
          <div className="w-full mb-4 flex justify-between items-center">
            <h2 className="text-2xl font-bold">Classes Information</h2>
            <button className="bg-[#5fda45] text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300">
              Export to Excel
            </button>
          </div>
          <div className="right w-full">
            <table className="table-auto w-full border-collapse border border-gray-300 shadow-lg">
              <thead>
                <tr className="bg-gray-200 text-left">
                  <th className="border border-gray-300 p-3">Class Name</th>
                  <th className="border border-gray-300 p-3">Class Passcode</th>
                  <th className="border border-gray-300 p-3">Date</th>
                  <th className="border border-gray-300 p-3">Time</th>
                  <th className="border border-gray-300 p-3">No of Students</th>
                  <th className="border border-gray-300 p-3">View</th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-gray-100">
                  <td className="border border-gray-300 p-3">
                    The Sliding Mr. Bones (Next Stop, Pottersville)
                  </td>
                  <td className="border border-gray-300 p-3">
                    Malcolm Lockyer
                  </td>
                  <td className="border border-gray-300 p-3">1961</td>
                  <td className="border border-gray-300 p-3">10:00 AM</td>
                  <td className="border border-gray-300 p-3">25</td>
                  <td className="border border-gray-300 p-3">
                    <div className="bg-[#5fda45] p-2 rounded-xl flex justify-center items-center hover:bg-blue-600 transition duration-300">
                      <link_1.default href="/" className="">
                        View
                      </link_1.default>
                    </div>
                  </td>
                </tr>
                <tr className="hover:bg-gray-100">
                  <td className="border border-gray-300 p-3">Witchy Woman</td>
                  <td className="border border-gray-300 p-3">The Eagles</td>
                  <td className="border border-gray-300 p-3">1972</td>
                  <td className="border border-gray-300 p-3">11:30 AM</td>
                  <td className="border border-gray-300 p-3">30</td>
                  <td className="border border-gray-300 p-3">
                    <div className="bg-[#5fda45] p-2 rounded-xl flex justify-center items-center hover:bg-blue-600 transition duration-300">
                      <link_1.default href="/" className="">
                        View
                      </link_1.default>
                    </div>
                  </td>
                </tr>
                <tr className="hover:bg-gray-100">
                  <td className="border border-gray-300 p-3">Shining Star</td>
                  <td className="border border-gray-300 p-3">
                    Earth, Wind, and Fire
                  </td>
                  <td className="border border-gray-300 p-3">1975</td>
                  <td className="border border-gray-300 p-3">12:45 PM</td>
                  <td className="border border-gray-300 p-3">20</td>
                  <td className="border border-gray-300 p-3">
                    <div className="bg-[#5fda45] p-2 rounded-xl flex justify-center items-center hover:bg-blue-600 transition duration-300">
                      <link_1.default href="/" className="">
                        View
                      </link_1.default>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>);
};
exports.default = AllClass;
