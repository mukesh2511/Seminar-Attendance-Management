"use client";
import { AuthContext } from "@/context/userContext";
import axios from "axios";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import * as XLSX from "xlsx";

const AllClass = () => {
  const { user } = useContext(AuthContext);
  const [data, setData] = useState<any>(null);

  /////////////////////////excell function

  const exportToExcel = async () => {
    let worksheet: any;
    if (user?.role === "TEACHER") {
      if (!data?.Classes || data?.Classes.length === 0) {
        toast.error("No data to export");
      }
      worksheet = XLSX.utils.json_to_sheet(
        data?.Classes.map((d: any) => ({
          "Class Name": d.className,
          "Class Passcode": d.classCode,
          Date: d.createdAt.split("T")[0],
          Time: d.createdAt.split("T")[1].split(".")[0],
          "No Of Students": d.attendedStudents?.length || 0,
        }))
      );
    } else {
      if (!data.attendedClasses || data?.attendedClasses.length === 0) {
        toast.error("No data to export");
      }
      worksheet = XLSX.utils.json_to_sheet(
        data?.attendedClasses.map((d: any) => ({
          "Class Name": d.className,
          "Class Passcode": d.classCode,
          "Class Date": d.createdAt.split("T")[0],
          "Class Time": d.createdAt.split("T")[1].split(".")[0],
          "Join Time": d.attendedStudents[0].dateTime
            .split("T")[1]
            .split(".")[0],
        }))
      );
    }
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Classes Information");
    XLSX.writeFile(workbook, "ClassesInformation.xlsx");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.post("/api/class/allclasses");
        console.log({ data: res.data.data[0] });
        toast.success("Fetched Data Successfully");
        setData(res.data.data[0]);
      } catch (error: any) {
        toast.error(error.message);
      }
    };
    fetchData();
  }, [user]);

  if (data === null) {
    return (
      <div className="flex justify-center items-center h-[calc(100%-5rem)] mt-10 my-auto mx-auto w-full">
        <div className="text-lg">
          <img
            src="/spinner.gif"
            alt="Loading..."
            className="w-20 h-20 m-auto"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center h-[calc(100%-5rem)] mt-10 my-auto mx-auto w-full">
      <div className="w-full">
        <div className="w-full flex flex-col items-center">
          {user?.role === "STUDENT" && (
            <div className="w-full flex flex-col items-center">
              <div className="text-xl md:text-2xl font-bold ">
                Student Information
              </div>
              <div className="w-full flex justify-around items-center my-10">
                <div className="left flex flex-col  gap-1">
                  <div className="flex items-center  gap-1 ">
                    <h3 className="font-bold text-lg md:text-xl">
                      Student Name :
                    </h3>
                    <p className="text-sm md:text-lg font-semibold ">
                      {user?.name}
                    </p>
                  </div>
                  <div className="flex items-center gap-1">
                    <h3 className="font-bold text-lg md:text-xl">
                      Class Name :
                    </h3>
                    <p className="text-sm md:text-lg font-semibold ">
                      {data?.className}
                    </p>
                  </div>
                  <div className="flex items-center gap-1">
                    <h3 className="font-bold text-lg md:text-xl">Division :</h3>
                    <p className="text-sm md:text-lg font-semibold ">
                      {data?.division}
                    </p>
                  </div>
                </div>
                <div className="right flex flex-col  gap-1">
                  <div className="flex items-center gap-1">
                    <h3 className="font-bold text-lg md:text-xl">Roll No :</h3>
                    <p className="text-sm md:text-lg font-semibold ">
                      {data?.rollNo}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="w-full mb-4 flex justify-between items-center">
            <h2 className="text-2xl font-bold">Classes Information</h2>
            <button
              className="bg-[#5fda45] text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
              onClick={exportToExcel}
            >
              Export to Excel
            </button>
          </div>
          <div className="right w-full">
            {user && user.role === "TEACHER" ? (
              <table className="table-auto w-full border-collapse border border-gray-300 shadow-lg">
                <thead>
                  <tr className="bg-gray-200 text-left">
                    <th className="border border-gray-300 p-3">Class Name</th>
                    <th className="border border-gray-300 p-3">
                      Class Passcode
                    </th>
                    <th className="border border-gray-300 p-3">Date</th>
                    <th className="border border-gray-300 p-3">Time</th>
                    <th className="border border-gray-300 p-3">
                      No of Students
                    </th>
                    <th className="border border-gray-300 p-3">View</th>
                  </tr>
                </thead>
                {
                  <tbody>
                    {data?.Classes &&
                    Array.isArray(data.Classes) &&
                    data.Classes.length > 0 ? (
                      data.Classes.map((d: any, index: number) => (
                        <tr className="hover:bg-gray-100" key={d._id}>
                          <td className="border border-gray-300 p-3">
                            {d.className}
                          </td>
                          <td className="border border-gray-300 p-3">
                            {d.classCode}
                          </td>
                          <td className="border border-gray-300 p-3">
                            {d.createdAt.split("T")[0]}
                          </td>
                          <td className="border border-gray-300 p-3">
                            {d.createdAt.split("T")[1].split(".")[0]}
                          </td>
                          <td className="border border-gray-300 p-3">
                            {d.attendedStudents?.length || 0}
                          </td>
                          <td className="border border-gray-300 p-3">
                            <div className="bg-[#5fda45] p-2 rounded-xl flex justify-center items-center hover:bg-blue-600 transition duration-300">
                              <Link href={`/Class/${d._id}`}>View</Link>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan={6}
                          className="w-full p-5 text-center font-bold"
                        >
                          No Records Found
                        </td>
                      </tr>
                    )}
                  </tbody>
                }
              </table>
            ) : (
              <table className="table-auto w-full border-collapse border border-gray-300 shadow-lg">
                <thead>
                  <tr className="bg-gray-200 text-left">
                    <th className="border border-gray-300 p-3">Class Name</th>
                    <th className="border border-gray-300 p-3">
                      Class Passcode
                    </th>
                    <th className="border border-gray-300 p-3">Class Date</th>
                    <th className="border border-gray-300 p-3">Class Time</th>
                    <th className="border border-gray-300 p-3">Join Time</th>
                  </tr>
                </thead>
                {
                  <tbody>
                    {data?.attendedClasses &&
                    Array.isArray(data.attendedClasses) &&
                    data.attendedClasses.length > 0 ? (
                      data.attendedClasses.map((d: any) => (
                        <tr className="hover:bg-gray-100" key={d._id}>
                          <td className="border border-gray-300 p-3">
                            {d.className}
                          </td>
                          <td className="border border-gray-300 p-3">
                            {d.classCode}
                          </td>
                          <td className="border border-gray-300 p-3">
                            {d.createdAt.split("T")[0]}
                          </td>
                          <td className="border border-gray-300 p-3">
                            {d.createdAt.split("T")[1].split(".")[0]}
                          </td>
                          <td className="border border-gray-300 p-3">
                            {
                              d.attendedStudents[0].dateTime
                                .split("T")[1]
                                .split(".")[0]
                            }
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan={6}
                          className="w-full p-5 text-center font-bold"
                        >
                          No Records Found
                        </td>
                      </tr>
                    )}
                  </tbody>
                }
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllClass;
