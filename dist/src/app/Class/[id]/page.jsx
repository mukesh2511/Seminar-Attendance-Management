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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var navigation_1 = require("next/navigation");
var react_1 = __importStar(require("react"));
var react_hot_toast_1 = __importStar(require("react-hot-toast"));
var socket_io_client_1 = __importDefault(require("socket.io-client"));
var socket;
var SingleClass = function () {
    var _a, _b, _c, _d, _e;
    var _f = (0, react_1.useState)(null), data = _f[0], setdata = _f[1];
    var path = (0, navigation_1.usePathname)();
    var id = path.split("/")[2];
    (0, react_1.useEffect)(function () {
        socket = (0, socket_io_client_1.default)();
        socket.emit("join-class", id);
        socket.on("receive-data", function (d) {
            console.log({ d: d });
            setdata(d);
        });
        socket.on("error", function (error) {
            react_hot_toast_1.default.error("Error receiving class data!");
            console.error("Socket error:", error);
        });
        return function () {
            socket.disconnect();
        };
    }, [id]);
    // useEffect(() => {
    //   const fetchInfo = async () => {
    //     try {
    //       const res = await axios.post("/api/class/getclass", { id }); // Wrap id in an object
    //       console.log(res.data.data[0]);
    //       if (res.status === 404) {
    //         toast.error("No Class Found!!");
    //       }
    //       if (res.status === 200) {
    //         setdata(res.data.data[0]);
    //       }
    //     } catch (error: any) {
    //       toast.error(error.message);
    //       console.error("Error fetching class data:", error);
    //     }
    //   };
    //   fetchInfo();
    // }, []);
    if (data === null) {
        return (<div className="flex justify-center items-center h-[calc(100%-5rem)] mt-10 my-auto mx-auto w-full">
        <div className="text-lg">
          <img src="/spinner.gif" alt="Loading..." className="w-20 h-20 m-auto"/>
        </div>
      </div>);
    }
    // useEffect(() => {
    //   setHydrated(true);
    // }, []);
    return (<>
      <react_hot_toast_1.Toaster />
      <div className="flex justify-center items-center h-[calc(100%-5rem)] mt-10 my-auto mx-auto w-full">
        <div className="w-full">
          <div className="w-full flex flex-col items-center">
            <div className="text-xl md:text-2xl font-bold ">
              Class Information
            </div>
            <div className="w-full flex justify-around items-center my-10">
              <div className="left flex flex-col  gap-1">
                <div className="flex items-center  gap-1 ">
                  <h3 className="font-bold text-lg md:text-xl">ClassName :</h3>
                  <p className="text-sm md:text-lg font-semibold ">
                    {data === null || data === void 0 ? void 0 : data.className}
                  </p>
                </div>
                <div className="flex items-center gap-1">
                  <h3 className="font-bold text-lg md:text-xl">
                    Class Owner :
                  </h3>
                  <p className="text-sm md:text-lg font-semibold ">
                    {(_a = data === null || data === void 0 ? void 0 : data.teacher) === null || _a === void 0 ? void 0 : _a.name}
                  </p>
                </div>
                <div className="flex items-center gap-1">
                  <h3 className="font-bold text-lg md:text-xl">Email :</h3>
                  <p className="text-sm md:text-lg font-semibold ">
                    {(_b = data === null || data === void 0 ? void 0 : data.teacher) === null || _b === void 0 ? void 0 : _b.email}
                  </p>
                </div>
              </div>
              <div className="right flex flex-col  gap-1">
                <div className="flex items-center gap-1">
                  <h3 className="font-bold text-lg md:text-xl">Passcode :</h3>
                  <p className="text-sm md:text-lg font-semibold ">
                    {data === null || data === void 0 ? void 0 : data.classCode}
                  </p>
                </div>
                <div className="flex items-center gap-1">
                  <h3 className="font-bold text-lg md:text-xl">Date :</h3>
                  <p className="text-sm md:text-lg font-semibold ">
                    {(_c = data === null || data === void 0 ? void 0 : data.createdAt) === null || _c === void 0 ? void 0 : _c.split("T")[0]}
                  </p>
                </div>
                <div className="flex items-center gap-1">
                  <h3 className="font-bold text-lg md:text-xl">
                    Class Created Time :
                  </h3>
                  <p className="text-sm md:text-lg font-semibold ">
                    {" "}
                    {(_d = data === null || data === void 0 ? void 0 : data.createdAt) === null || _d === void 0 ? void 0 : _d.split("T")[1].split(".")[0]}
                  </p>
                </div>
              </div>
            </div>

            <div className="w-full mb-4 flex justify-between items-center">
              <h2 className="text-2xl font-bold">Students Information</h2>
              <button className="bg-[#5fda45] text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300">
                Export to Excel
              </button>
            </div>
            {/* ////////////////table//////////////// */}
            <div className="right w-full">
              <table className="table-auto w-full border-collapse border border-gray-300 shadow-lg">
                <thead>
                  <tr className="bg-gray-200 text-left">
                    <th className="border border-gray-300 p-3">Name</th>
                    <th className="border border-gray-300 p-3">Class</th>
                    <th className="border border-gray-300 p-3">Division</th>
                    <th className="border border-gray-300 p-3">Roll No</th>
                    <th className="border border-gray-300 p-3">Joined Time</th>
                    <th className="border border-gray-300 p-3">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {(data === null || data === void 0 ? void 0 : data.Students.length) > 0 ? ((_e = data.Students) === null || _e === void 0 ? void 0 : _e.map(function (d, index) { return (<tr key={index} className="hover:bg-gray-100">
                        <td className="border border-gray-300 p-3">{d.name}</td>
                        <td className="border border-gray-300 p-3">
                          {d.className}
                        </td>
                        <td className="border border-gray-300 p-3">
                          {d.division}
                        </td>
                        <td className="border border-gray-300 p-3">
                          {d.rollNo}
                        </td>
                        <td className="border border-gray-300 p-3">
                          {d.dateTime.dateTime.split("T")[1].split(".")[0]}
                        </td>
                        <td className="border border-gray-300 p-3">
                          {d.dateTime.dateTime.split("T")[0]}
                        </td>
                      </tr>); })) : (<tr>
                      <td colSpan={6} className="w-full p-5 text-center font-bold">
                        Waiting for students to join{" "}
                        <img src="/spinner.gif" alt="Loading..." className="w-6 h-6 mx-auto"/>
                      </td>
                    </tr>)}
                </tbody>
                {/* <tbody>
          <tr className="hover:bg-gray-100">
            <td className="border border-gray-300 p-3">Sujit Mourya</td>
            <td className="border border-gray-300 p-3">TYCS</td>
            <td className="border border-gray-300 p-3">A</td>
            <td className="border border-gray-300 p-3">744</td>
            <td className="border border-gray-300 p-3">12-15-:12Z</td>
            <td className="border border-gray-300 p-3">2024-09-06</td>
          </tr>
          <tr className="hover:bg-gray-100">
            <td className="border border-gray-300 p-3">Sujit Mourya</td>
            <td className="border border-gray-300 p-3">TYCS</td>
            <td className="border border-gray-300 p-3">A</td>
            <td className="border border-gray-300 p-3">744</td>
            <td className="border border-gray-300 p-3">12-15-:12Z</td>
            <td className="border border-gray-300 p-3">2024-09-06</td>
          </tr>
          <tr className="hover:bg-gray-100">
            <td className="border border-gray-300 p-3">Sujit Mourya</td>
            <td className="border border-gray-300 p-3">TYCS</td>
            <td className="border border-gray-300 p-3">A</td>
            <td className="border border-gray-300 p-3">744</td>
            <td className="border border-gray-300 p-3">12-15-:12Z</td>
            <td className="border border-gray-300 p-3">2024-09-06</td>
          </tr>
          <tr className="hover:bg-gray-100">
            <td className="border border-gray-300 p-3">Sujit Mourya</td>
            <td className="border border-gray-300 p-3">TYCS</td>
            <td className="border border-gray-300 p-3">A</td>
            <td className="border border-gray-300 p-3">744</td>
            <td className="border border-gray-300 p-3">12-15-:12Z</td>
            <td className="border border-gray-300 p-3">2024-09-06</td>
          </tr>
          <tr className="hover:bg-gray-100">
            <td className="border border-gray-300 p-3">Sujit Mourya</td>
            <td className="border border-gray-300 p-3">TYCS</td>
            <td className="border border-gray-300 p-3">A</td>
            <td className="border border-gray-300 p-3">744</td>
            <td className="border border-gray-300 p-3">12-15-:12Z</td>
            <td className="border border-gray-300 p-3">2024-09-06</td>
          </tr>
          <tr className="hover:bg-gray-100">
            <td className="border border-gray-300 p-3">Sujit Mourya</td>
            <td className="border border-gray-300 p-3">TYCS</td>
            <td className="border border-gray-300 p-3">A</td>
            <td className="border border-gray-300 p-3">744</td>
            <td className="border border-gray-300 p-3">12-15-:12Z</td>
            <td className="border border-gray-300 p-3">2024-09-06</td>
          </tr>
          <tr className="hover:bg-gray-100">
            <td className="border border-gray-300 p-3">Sujit Mourya</td>
            <td className="border border-gray-300 p-3">TYCS</td>
            <td className="border border-gray-300 p-3">A</td>
            <td className="border border-gray-300 p-3">744</td>
            <td className="border border-gray-300 p-3">12-15-:12Z</td>
            <td className="border border-gray-300 p-3">2024-09-06</td>
          </tr>
          <tr className="hover:bg-gray-100">
            <td className="border border-gray-300 p-3">Sujit Mourya</td>
            <td className="border border-gray-300 p-3">TYCS</td>
            <td className="border border-gray-300 p-3">A</td>
            <td className="border border-gray-300 p-3">744</td>
            <td className="border border-gray-300 p-3">12-15-:12Z</td>
            <td className="border border-gray-300 p-3">2024-09-06</td>
          </tr>
          <tr className="hover:bg-gray-100">
            <td className="border border-gray-300 p-3">Sujit Mourya</td>
            <td className="border border-gray-300 p-3">TYCS</td>
            <td className="border border-gray-300 p-3">A</td>
            <td className="border border-gray-300 p-3">744</td>
            <td className="border border-gray-300 p-3">12-15-:12Z</td>
            <td className="border border-gray-300 p-3">2024-09-06</td>
          </tr>
          <tr className="hover:bg-gray-100">
            <td className="border border-gray-300 p-3">Sujit Mourya</td>
            <td className="border border-gray-300 p-3">TYCS</td>
            <td className="border border-gray-300 p-3">A</td>
            <td className="border border-gray-300 p-3">744</td>
            <td className="border border-gray-300 p-3">12-15-:12Z</td>
            <td className="border border-gray-300 p-3">2024-09-06</td>
          </tr>
          <tr className="hover:bg-gray-100">
            <td className="border border-gray-300 p-3">Sujit Mourya</td>
            <td className="border border-gray-300 p-3">TYCS</td>
            <td className="border border-gray-300 p-3">A</td>
            <td className="border border-gray-300 p-3">744</td>
            <td className="border border-gray-300 p-3">12-15-:12Z</td>
            <td className="border border-gray-300 p-3">2024-09-06</td>
          </tr>
          <tr className="hover:bg-gray-100">
            <td className="border border-gray-300 p-3">Sujit Mourya</td>
            <td className="border border-gray-300 p-3">TYCS</td>
            <td className="border border-gray-300 p-3">A</td>
            <td className="border border-gray-300 p-3">744</td>
            <td className="border border-gray-300 p-3">12-15-:12Z</td>
            <td className="border border-gray-300 p-3">2024-09-06</td>
          </tr>
          <tr className="hover:bg-gray-100">
            <td className="border border-gray-300 p-3">Sujit Mourya</td>
            <td className="border border-gray-300 p-3">TYCS</td>
            <td className="border border-gray-300 p-3">A</td>
            <td className="border border-gray-300 p-3">744</td>
            <td className="border border-gray-300 p-3">12-15-:12Z</td>
            <td className="border border-gray-300 p-3">2024-09-06</td>
          </tr>
          <tr className="hover:bg-gray-100">
            <td className="border border-gray-300 p-3">Sujit Mourya</td>
            <td className="border border-gray-300 p-3">TYCS</td>
            <td className="border border-gray-300 p-3">A</td>
            <td className="border border-gray-300 p-3">744</td>
            <td className="border border-gray-300 p-3">12-15-:12Z</td>
            <td className="border border-gray-300 p-3">2024-09-06</td>
          </tr>
          <tr className="hover:bg-gray-100">
            <td className="border border-gray-300 p-3">Sujit Mourya</td>
            <td className="border border-gray-300 p-3">TYCS</td>
            <td className="border border-gray-300 p-3">A</td>
            <td className="border border-gray-300 p-3">744</td>
            <td className="border border-gray-300 p-3">12-15-:12Z</td>
            <td className="border border-gray-300 p-3">2024-09-06</td>
          </tr>
        </tbody> */}
              </table>
            </div>
          </div>
        </div>
      </div>
    </>);
};
exports.default = SingleClass;
