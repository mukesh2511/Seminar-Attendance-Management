"use client";
import { AuthContext } from "@/context/userContext";
import axios from "axios";
import { usePathname } from "next/navigation";
import React, { useContext, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import * as XLSX from "xlsx";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const SingleClass = () => {
  const { user } = useContext(AuthContext);
  const path = usePathname();
  const id = path.split("/")[2];
  const queryClient = useQueryClient();

  const fetchClassData = async () => {
    const res = await axios.post("/api/class/getclass", { id });
    if (res.status === 404) {
      throw new Error("No Class Found!!");
    }
    return res.data.data[0];
  };

  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["class", id],
    queryFn: fetchClassData,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    console.log({ id });
    const eventSource = new EventSource(`/api/sse?classId=${id}`);

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === "student-joined") {
        // Refetch the class data when a new student joins
        refetch();
      } else if (data.type === "connected") {
        console.log(data.message);
      }
    };

    eventSource.onerror = (error) => {
      console.error("SSE error:", error);
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, [id, refetch]);

  const exportToExcell = () => {
    if (!data?.Students || data.Students.length === 0) {
      toast.error("No data to export");
      return;
    }
    const worksheet = XLSX.utils.json_to_sheet(
      data.Students.map((student: any) => ({
        Name: student?.name,
        Class: student?.className,
        Division: student?.division,
        "Roll No": student?.rollNo,
        "Joined Time": student.dateTime.dateTime.split("T")[1].split(".")[0],
        Date: student.dateTime.dateTime.split("T")[0],
      }))
    );
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      "StudentInformation.xlsx"
    );
    XLSX.writeFile(workbook, "ClassesInformation.xlsx");
  };

  if (isLoading) {
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

  if (error) {
    toast.error((error as Error).message);
    return <div>Error loading class data</div>;
  }

  return (
    <>
      <Toaster />
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
                    {data?.className}
                  </p>
                </div>
                <div className="flex items-center gap-1">
                  <h3 className="font-bold text-lg md:text-xl">
                    Class Owner :
                  </h3>
                  <p className="text-sm md:text-lg font-semibold ">
                    {data?.teacher?.name}
                  </p>
                </div>
                <div className="flex items-center gap-1">
                  <h3 className="font-bold text-lg md:text-xl">Email :</h3>
                  <p className="text-sm md:text-lg font-semibold ">
                    {data?.teacher?.email}
                  </p>
                </div>
              </div>
              <div className="right flex flex-col  gap-1">
                <div className="flex items-center gap-1">
                  <h3 className="font-bold text-lg md:text-xl">Passcode :</h3>
                  <p className="text-sm md:text-lg font-semibold ">
                    {data?.classCode}
                  </p>
                </div>
                <div className="flex items-center gap-1">
                  <h3 className="font-bold text-lg md:text-xl">Date :</h3>
                  <p className="text-sm md:text-lg font-semibold ">
                    {data?.createdAt?.split("T")[0]}
                  </p>
                </div>
                <div className="flex items-center gap-1">
                  <h3 className="font-bold text-lg md:text-xl">
                    Class Created Time :
                  </h3>
                  <p className="text-sm md:text-lg font-semibold ">
                    {" "}
                    {data?.createdAt?.split("T")[1].split(".")[0]}
                  </p>
                </div>
              </div>
            </div>

            <div className="w-full mb-4 flex justify-between items-center">
              <h2 className="text-2xl font-bold">Students Information</h2>
              {user && user?.role === "TEACHER" && (
                <button
                  className="bg-[#5fda45] text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
                  onClick={exportToExcell}
                >
                  Export to Excel
                </button>
              )}
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
                  {data?.Students?.length > 0 ? (
                    data.Students?.map((d: any, index: number) => (
                      <tr key={index} className="hover:bg-gray-100">
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
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={6}
                        className="w-full p-5 text-center font-bold"
                      >
                        Waiting for students to join{" "}
                        <img
                          src="/spinner.gif"
                          alt="Loading..."
                          className="w-6 h-6 mx-auto"
                        />
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleClass;
