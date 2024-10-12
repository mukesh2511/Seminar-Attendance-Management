import JoinSeminar from "@/components/JoinSeminar";
import React from "react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const JoinClass = () => {
  const userRole = headers().get("x-user-role");
  if (userRole === "TEACHER") {
    redirect("/home");
  }

  return (
    <div className="w-full flex flex-col items-center min-h-screen gap-10 overflow-y-auto">
      <JoinSeminar />
    </div>
  );
};

export default JoinClass;
