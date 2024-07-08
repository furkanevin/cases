import React, { useState } from "react";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import api from "../utils/api";

const LogInPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    api
      .get("users")
      .then((response) => {
        const users = response.data;
        const user = users.find(
          (user) => user.email === email && user.password === password
        );
        if (user) {
          navigate("/main");
        } else {
          setLoginError(true);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        setLoginError(true);
      });
  };

  return (
    <>
      <div className="flex min-h-full sm:flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-20 w-auto"
            src="/public/images/logo.png"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Log in to your account.
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit}>
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

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-cyan-800 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-cyan-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-800"
              >
                Sign in
              </button>
            </div>
          </form>

          {loginError && (
            <p className="mt-2 text-center text-sm text-red-900">
              Invalid email or password!
            </p>
          )}

          <p className="mt-10 text-center text-sm text-gray-700">
            Not a member?{" "}
            <NavLink
              to={"/register"}
              className="font-semibold leading-6 text-bg-lime-500 hover:text-cyan-500"
            >
              Register.
            </NavLink>
          </p>
        </div>
      </div>
    </>
  );
};

export default LogInPage;
