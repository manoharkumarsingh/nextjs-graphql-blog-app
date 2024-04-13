import React, { useState } from "react";
import Link from "next/link";
import { SIGNUP_USER } from "../../gqloperations/mutations";
import { useMutation } from "@apollo/client";
import Alert from "@mui/material/Alert";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

interface UserInput {
  firstName: string;
  lastName: string;
  password: string;
  email: string;
}

const Signup = () => {
  const [userInput, setUserInput] = useState<UserInput>({
    firstName: "",
    lastName: "",
    password: "",
    email: "",
  });
  const [errorMess, setErrorMess] = useState(false);
  const [success, setSuccess] = useState(false);
  const [signupUser, { data, loading, error }] = useMutation(SIGNUP_USER);

  const handleUserInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const id = e.target.id as keyof UserInput;
    setUserInput({ ...userInput, [id]: e.target.value });
  };
  const handleSubmit = () => {
    signupUser({
      variables: {
        userNew: userInput,
      },
    })
      .then((res) => {
        if (res.data && res.data.user.firstName) {
          setSuccess(true);
          setUserInput({
            firstName: "",
            lastName: "",
            password: "",
            email: "",
          });
        }
      })
      .catch((err) => {
        setErrorMess(true);
      });
  };

  const handleClose = (type: string) => {
    setErrorMess(false);
    setSuccess(false);
  };

  return (
    <>
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <Card sx={{ maxWidth: 500 }}>
            <CardContent>
              <div>{loading ? "Loading..." : ""}</div>
              {errorMess && (
                <Alert
                  onClose={() => handleClose("error")}
                  severity="error"
                  sx={{ width: "100%" }}
                >
                  {error && error.message}
                </Alert>
              )}

              {success && (
                <Alert
                  onClose={() => handleClose("success")}
                  severity="success"
                >
                  Successfully registered !!
                </Alert>
              )}
              <h2 className="mt-10 text-center text-[2rem] font-[600] leading-9 tracking-tight  text-indigo-600">
                Create New Account
              </h2>
              <div className="mt-10">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    First Name
                  </label>
                  <div className="mt-2">
                    <input
                      autoComplete="current-firstName"
                      id="firstName"
                      name="fname"
                      type="text"
                      required
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2"
                      onChange={(e) => {
                        handleUserInput(e);
                      }}
                      value={userInput.firstName}
                    />
                  </div>
                </div>
                <div className="mt-8">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Last Name
                  </label>
                  <div className="mt-2">
                    <input
                      id="lastName"
                      name="lname"
                      type="text"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2"
                      onChange={(e) => {
                        handleUserInput(e);
                      }}
                      value={userInput.lastName}
                    />
                  </div>
                </div>
                <div className="mt-8">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Email address
                  </label>
                  <div className="mt-2">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2 "
                      onChange={(e) => {
                        handleUserInput(e);
                      }}
                      value={userInput.email}
                    />
                  </div>
                </div>
                <div className="mt-8">
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Password
                    </label>
                  </div>
                  <div className="mt-2">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      required
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2"
                      onChange={(e) => {
                        handleUserInput(e);
                      }}
                      value={userInput.password}
                    />
                  </div>
                </div>
              </div>
              <div className="mt-10">
                <button
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  onClick={handleSubmit}
                >
                  Submit
                </button>
              </div>

              <p className="mt-10 text-center text-sm text-gray-500">
                Already have an account ?
                <Link
                  href="/login"
                  className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                >
                  Sign In
                </Link>
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Signup;
