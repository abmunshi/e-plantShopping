import React from "react";
import { Outlet } from "react-router";

const Auth = () => {
  return (
    <div className="bg-primary-100 min-h-screen px-4 py-6">
      <div className="bg-white rounded-3xl max-w-md mx-auto p-10 relative after:w-full after:h-[4px] after:bg-primary after:absolute after:right-0 after:left-0 after:top-0 overflow-hidden">
        <div className="bg-primary w-16 h-16 rounded-full mx-auto grid place-content-center mb-3">
          <span className="inline-block text-3xl">🌱</span>
        </div>
        <div className="text-center mb-8">
          <h1 className=" text-primary text-[28px] font-semibold mb-1">
            PluntHub
          </h1>
          <p className="text-black/60 text-sm">Grow your green paradise</p>
        </div>
        {<Outlet />}
      </div>
    </div>
  );
};

export default Auth;
