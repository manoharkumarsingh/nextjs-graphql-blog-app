import React, { useState, useEffect } from "react";
import Link from "next/link";
import { LOGIN_USER } from "../../gqloperations/mutations";
import { useMutation } from "@apollo/client";
import Alert from "@mui/material/Alert";
import { useRouter } from "next/navigation";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

interface UserInput {
  password: string;
  email: string;
}

const Login = () => {
  const [userInput, setUserInput] = useState<UserInput>({
    email: "",
    password: "",
  });
  const [errorMess, setErrorMess] = useState(false);
  const [success, setSuccess] = useState(false);
  const router = useRouter();
  const [signinUser, { data, loading, error }] = useMutation(LOGIN_USER, {
    onCompleted(data) {
      localStorage.setItem("token", data.user.token);
      router.push("/", { scroll: false });
    },
  });

  const handleUserInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const id = e.target.id as keyof UserInput;
    setUserInput({ ...userInput, [id]: e.target.value });
  };

  const handleSubmit = () => {
    signinUser({
      variables: {
        userSignin: userInput,
      },
    })
      .then((res) => {
        if (res.data && res.data.user.token) {
          setSuccess(true);
          setUserInput({
            password: "",
            email: "",
          });
        }
      })
      .catch((err) => {
        console.log(err.message);
        setErrorMess(true);
      });
  };

  const handleClose = (type: string) => {
    setErrorMess(false);
    setSuccess(false);
  };

  return (
    <div className="flex justify-center items-center h-[95vh]">
      <Card sx={{ width: 400 }}>
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
            <Alert onClose={() => handleClose("success")} severity="success">
              Successfully registered !!
            </Alert>
          )}
          <h3 className="mt-10 text-[2rem] text-center font-[600] leading-9 tracking-tight text-indigo-600">
            Login !!
          </h3>

          <div className="mt-10">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-"
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
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2"
                  onChange={(e) => {
                    handleUserInput(e);
                  }}
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
                />
              </div>
            </div>
            <div className="mt-10">
              <button
                type="button"
                className="flex w-full justify-center  rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={handleSubmit}
              >
                Sign in
              </button>
            </div>

            <p className="mt-10 text-center text-sm text-gray-500">
              Don't have an accout ?
              <Link
                href="signup"
                className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
              >
                Signup
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
