import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import api from "../utils/api";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password.length < 8) {
      setError("Password must be at least 8 characters long!");
      return;
    }

    if (name.trim() === "" || email.trim() === "") {
      setError("Please enter both username and email.");
      return;
    }

    const SymbolRegex = /@/;
    if (!SymbolRegex.test(email)) {
      setError("Please enter a valid email address!");
      return;
    }

    api
      .get("users", {
        params: {
          email: email,
        },
      })
      .then((response) => {
        if (response.data.length > 0) {
          setError(
            "Email address already exists. Please choose a different one."
          );
        } else {
          api
            .get("users", {
              params: {
                name: name,
              },
            })
            .then((response) => {
              if (response.data.length > 0) {
                setError(
                  "Username already exists. Please choose a different one."
                );
              } else {
                const userId = uuidv4();
                api
                  .post("users", {
                    id: userId,
                    name: name,
                    email: email,
                    password: password,
                  })
                  .then(() => {
                    console.log("User created successfully");
                    navigate("/main");
                  })
                  .catch((error) => {
                    console.error("Error:", error);
                    setError("An error occurred while creating the user.");
                  });
              }
            })
            .catch((error) => {
              console.error("Error:", error);
              setError("An error occurred while checking username existence.");
            });
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        setError("An error occurred while checking email existence.");
      });
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-20 w-auto"
            src="/public/images/logo.png"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Create a new account.
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                User name:
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="block w-full rounded-md border-0 py-1.5 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-600 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="block w-full rounded-md border-0 py-1.5 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="block w-full rounded-md border-0 py-1.5 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
              />
            </div>

            {error && (
              <p className="mt-2 text-center text-sm text-red-900">{error}</p>
            )}

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-cyan-800 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-cyan-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-800"
              >
                Sign up
              </button>
            </div>
          </form>
          <p className="mt-10 text-center text-sm text-gray-700">
            Already a member?{" "}
            <NavLink
              to={"/"}
              className="font-semibold leading-6 text-bg-lime-500 hover:text-cyan-500"
            >
              Sign In.
            </NavLink>
          </p>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
