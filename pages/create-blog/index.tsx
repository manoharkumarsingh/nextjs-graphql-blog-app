import React from "react";
import Link from "next/link";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

const Signup = () => {
  return (
    <div className="flex justify-center items-center h-[95vh]">
      <Card sx={{ width: 600 }}>
        <CardContent>
          <h2 className="mt-10 text-center font-[600] text-[2rem] leading-9 tracking-tight text-indigo-600 mb-10">
            Create New Quote
          </h2>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Title
              </label>
            </div>
            <div className="mt-2">
              <input
                id="title"
                name="title"
                type="text"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Description
              </label>
            </div>
            <div className="mt-2">
              <textarea
                id="description"
                name="description"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2"
              />
            </div>
          </div>
          <div className="mt-10">
            <button
              type="button"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Save
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Signup;
