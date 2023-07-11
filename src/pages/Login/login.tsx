/* eslint-disable @typescript-eslint/no-misused-promises */
import login from "../../assets/images/login.svg.svg";
import { useForm, SubmitHandler } from "react-hook-form";
import { motion } from "framer-motion";

interface IFormInputs {
  email: string;
  password: string;
}

const Login = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IFormInputs>();

  const onSubmit: SubmitHandler<IFormInputs> = (data) => {
    console.log("data here:", data);
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
                  <a href="#" className="label-text-alt link link-hover">
                    Forgot password?
                  </a>
                  <a href="#" className="label-text-alt link link-hover">
                    register?
                  </a>
                </label>
              </div>
              <div className="form-control mt-6">
                <button type="submit" className="btn btn-primary">
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
