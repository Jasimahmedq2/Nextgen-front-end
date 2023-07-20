/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-misused-promises */
import login from "../../assets/images/login.svg.svg";
import { useForm, SubmitHandler } from "react-hook-form";
import { motion } from "framer-motion";
import { useLoginUserMutation } from "../../redux/features/auth/authApiSlice";
import { useAppDispatch } from "../../redux/hooks";
import { isLoggedIn } from "../../redux/features/auth/authSlice";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect } from "react";

interface IFormInputs {
  email: string;
  password: string;
}

const Login = () => {
  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm<IFormInputs>();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [loginUser, { data, isLoading, isError, error, isSuccess }] =
    useLoginUserMutation();

  useEffect(() => {
    if (isSuccess) {
      toast.success("You successfully logged in");
      console.log(data.data);
      navigate("/");
    }
    if (isError) {
      if (Array.isArray((error as any).data?.error)) {
        (error as any).data?.error.forEach((el: any) =>
          toast.error(el.message, {
            position: "top-right",
          })
        );
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  useEffect(() => {
    if (isSuccess) {
      reset();
      dispatch(isLoggedIn(data?.data));
      const accessToken = data?.data?.accessToken;
      localStorage.setItem("token", accessToken);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);

  const onSubmit: SubmitHandler<IFormInputs> = (data) => {
    const options = {
      email: data.email,
      password: data.password,
    };
    console.log({ options });
    loginUser(options);
  };

  return (
    <div className=" bg-[#eceef4] space-y-6 sm:space-y-0 p-2">
      <h1 className="text-5xl font-bold sm:mt-12 sm:flex sm:justify-center sm:items-center">
        Login now!
      </h1>
      <div className="sm:flex sm:h-screen sm:justify-around sm:items-center ">
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="card-body">
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
                    to="/register"
                    className="label-text-alt sm:text-lg link link-hover"
                  >
                    register?
                  </Link>
                </label>
              </div>
              <div className="form-control mt-6">
                <button type="submit" className="btn btn-primary text-white font-bold">
                  Login
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
    </div>
  );
};

export default Login;
