/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-misused-promises */
import login from "../../assets/images/login.svg.svg";
import { useForm, SubmitHandler } from "react-hook-form";
import { motion } from "framer-motion";
import { useRegisterUserMutation } from "../../redux/features/auth/authApiSlice";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useEffect } from "react";
import { useAppDispatch } from "../../redux/hooks";
import "react-toastify/dist/ReactToastify.css";

interface IFormInputs {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

const Register = () => {
  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm<IFormInputs>();

  const [registerUser, { data, isLoading, isSuccess, error, isError }] =
    useRegisterUserMutation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isSuccess) {
      toast.success("check mail to verify your email");
      // navigate("/");
    }
    if (isError) {
      toast.error(`something went wrong`);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, isSuccess, isLoading]);

  const onSubmit: SubmitHandler<IFormInputs> = (data) => {
    console.log("data here:", data);

    if (data) {
      const registerOptions = {
        name: {
          firstName: data.firstName,
          lastName: data.lastName,
        },
        email: data.email,
        password: data.password,
      };
      registerUser(registerOptions);
      reset();
    }
  };
  return (
    <div className=" bg-[#eceef4] space-y-6 sm:space-y-0 p-2">
      <h1 className="text-5xl font-bold sm:mt-12 sm:flex sm:justify-center sm:items-center">
        Register now!
      </h1>

      <div className="sm:flex sm:min-h-screen sm:justify-around sm:items-center ">
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">First Name</span>
                </label>
                <input
                  type="text"
                  placeholder="first name"
                  className="input input-bordered"
                  {...register("firstName", { required: true })}
                />
                {errors.firstName && (
                  <p className="text-sm text-red-400">first name is required</p>
                )}
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Last Name</span>
                </label>
                <input
                  type="text"
                  placeholder="last name"
                  className="input input-bordered"
                  {...register("lastName", { required: true })}
                />
                {errors.lastName && (
                  <p className="text-sm text-red-400">last name is required</p>
                )}
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="text"
                  placeholder="email"
                  className="input input-bordered"
                  {...register("email", { required: true })}
                />
                {errors.email && (
                  <p className="text-sm text-red-400">email is required</p>
                )}
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="text"
                  placeholder="password"
                  className="input input-bordered"
                  {...register("password", { required: true })}
                />
                {errors.password && (
                  <p className="text-sm text-red-400">password is required</p>
                )}

                <label className="label">
                  <Link
                    to="/login"
                    className="label-text-alt link link-hover sm:text-lg"
                  >
                    already have a account?
                  </Link>
                </label>
              </div>

              <div className="form-control mt-6">
                <button
                  type="submit"
                  className="btn btn-primary text-white font-bold"
                >
                  Register
                </button>
              </div>
            </div>
          </form>
        </div>

        <motion.div
          initial={{ y: 0 }}
          animate={{ y: [-20, 20] }}
          transition={{
            repeat: Infinity,
            repeatType: "reverse",
            duration: 2,
            ease: "easeInOut",
          }}
          className="text-center mt-12 sm:mt-0 lg:text-left space-y-4"
        >
          <img
            src={login}
            alt="image"
            className="max-w-sm rounded-lg shadow-2xl"
          />
        </motion.div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Register;
