import { getServerSession } from "next-auth";
import { option } from "@/lib/authOption";
import React from "react";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";

const User = async () => {
  const session = await getServerSession(option);
  // if (!session) return redirect("/");
  // const user = await db.user.findUnique({
    // where: { email: session.user.email },
  // });
  // if (!user) return redirect("/dddddd");

  return (
    <div>
      <h1>
        Welcome 
      </h1>
    </div>
  );
};

export default User;
