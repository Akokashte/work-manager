"use client";
import UserContext from "@/context/userContext";
import { useContext } from "react";

export default function Home() {
  const context = useContext(UserContext);
  console.log(context)
  return (
    <div className="flex flex-col min-h-screen justify-center">
      <div>
        <h1 className="text-3xl text-white text-center font-semibold">Welcome {context?.user?.name} To Work Manager</h1>
      </div>
    </div>
  );
}
