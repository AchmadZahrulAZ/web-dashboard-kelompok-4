import React from "react";

export default function Home({username}) {
  return (
    <div className="flex flex-col justify-center items-center w-full bg-gradient-to-r from-darkblue/[.9] to-peachred/[.9] rounded-xl h-96 font-raleway">
      <h1 className="text-4xl font-bold text-white py-6">Welcome, <span className="underline">{username}</span></h1>
      <h1 className="text-xl font bold text-white">Let's Get Started!</h1>
    </div>
    );
}