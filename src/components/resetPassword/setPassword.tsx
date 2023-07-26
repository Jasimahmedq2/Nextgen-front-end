/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { useResetPasswordMutation } from "@/redux/features/auth/authApiSlice";
import React, { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

// import { useContext } from "react";
// import { RecoveryContext } from "../App";

interface IFormInputs {
  password: string;
  confirmPassword: string;
}

export default function SetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();

  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm<IFormInputs>();

  const [resetPassword, { isSuccess, isLoading }] = useResetPasswordMutation();

  useEffect(() => {
    if (isSuccess) {
      toast.success("You successfully logged in");
      navigate("/recovered");
    }
  }, [isLoading]);

  let errorMessage = null;

  const onSubmit: SubmitHandler<IFormInputs> = (FData) => {
    if (FData.password !== FData.confirmPassword) {
      errorMessage = "confirm password and password doesn't matched";
      toast.error(`${errorMessage}`);
    } else {
      const options = {
        resetToken: token,
        password: FData.password,
      };
      resetPassword(options);
    }
  };

  return (
    <div>
      <section className="bg-gray-50 w-screen dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
            <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Change Password
            </h2>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="mt-4 space-y-4 lg:mt-5 md:space-y-5"
            >
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  New Password
                </label>
                <input
                  type="password"
                  {...register("password", { required: true })}
                  name="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                ></input>
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Confirm password
                </label>
                <input
                  type="password"
                  {...register("confirmPassword", { required: true })}
                  name="confirmPassword"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                ></input>
                {errorMessage && (
                  <p className="text-red-400 text-sm">{errorMessage}</p>
                )}
                <button
                  type="submit"
                  className="w-full mt-4 text-black bg-primary hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  change password
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
      <ToastContainer />
    </div>
  );
}
