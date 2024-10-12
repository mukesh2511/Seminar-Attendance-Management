import CreateSeminar from "@/components/CreateSeminar";
import React from "react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const CreateClass = () => {
  const userRole = headers().get("x-user-role");
  if (userRole === "STUDENT") {
    redirect("/home");
  }
  return (
    <div className="w-full flex flex-col items-center min-h-screen gap-10 overflow-y-auto">
      <CreateSeminar />
    </div>
  );
};

export default CreateClass;
