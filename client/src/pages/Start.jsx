import React from "react";
import { Link } from "react-router-dom";

const Start = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center bg-[url('https://plus.unsplash.com/premium_photo-1690958385472-b8e011570ceb?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')]">
      <div className="bg-white text-black rounded-md p-6 shadow-md w-11/12 max-w-md text-center">
        <h1 className="text-2xl font-semibold mb-4 md:text-3xl">
          Welcome to RideEase
        </h1>
        <p className="text-sm mb-6 md:text-base">
          Book autos, bikes, and more in just a few taps!
        </p>
        <Link
          to="/login"
          className="inline-flex items-center px-5 py-2 bg-black text-white hover:bg-gray-800 rounded-lg font-medium text-sm md:text-base"
        >
          Continue
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-4 h-4 ml-2 md:w-5 md:h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default Start;
