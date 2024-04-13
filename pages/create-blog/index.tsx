import React, { useState } from "react";
import Link from "next/link";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { CREATE_QUOTE } from "../../gqloperations/mutations";
import { useMutation } from "@apollo/client";
import { GET_ALL_QUOTES } from "../../gqloperations/queries";
import Alert from "@mui/material/Alert";
import { useRouter } from "next/navigation";

interface BlogInput {
  name: string;
  desc: string;
}

const Signup = () => {
  const router = useRouter();
  const [blogInput, setBlogInput] = useState<BlogInput>({
    name: "",
    desc: "",
  });
  const [errorMess, setErrorMess] = useState(false);
  const [success, setSuccess] = useState(false);

  const [createQuote, { data, loading, error }] = useMutation(CREATE_QUOTE, {
    refetchQueries: [GET_ALL_QUOTES, "getAllQuotes"],
  });

  const handleUserInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const id = e.target.id as keyof BlogInput;
    setBlogInput({ ...blogInput, [id]: e.target.value });
  };

  const handleDescription = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const id = e.target.id as keyof BlogInput;
    setBlogInput({ ...blogInput, [id]: e.target.value });
  };

  const handleSubmit = () => {
    createQuote({
      variables: {
        newBlog: blogInput,
      },
    })
      .then((res) => {
        if (res.data && res.data) {
          setSuccess(true);
          setBlogInput({
            name: "",
            desc: "",
          });
          router.push("/", { scroll: false });
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
    <div className="flex justify-center items-center h-[95vh]">
      <Card sx={{ width: 600 }}>
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
              Blog Created !!
            </Alert>
          )}

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
                id="name"
                name="title"
                type="text"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2"
                onChange={(e) => {
                  handleUserInput(e);
                }}
                value={blogInput.name}
              />
            </div>
          </div>

          <div className="mt-10">
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
                id="desc"
                name="description"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2"
                onChange={(e) => {
                  handleDescription(e);
                }}
                value={blogInput.desc}
                rows={10}
              />
            </div>
          </div>
          <div className="mt-10">
            <button
              type="button"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onClick={handleSubmit}
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
