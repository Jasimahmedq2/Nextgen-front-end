// /* eslint-disable @typescript-eslint/no-unsafe-return */
// /* eslint-disable @typescript-eslint/no-unsafe-call */
// /* eslint-disable @typescript-eslint/no-floating-promises */
// /* eslint-disable @typescript-eslint/no-unsafe-member-access */
// /* eslint-disable @typescript-eslint/no-unsafe-argument */
// /* eslint-disable @typescript-eslint/no-unsafe-assignment */
// /* eslint-disable @typescript-eslint/no-misused-promises */
// import login from "../../assets/images/login.svg.svg";
// import { useForm, SubmitHandler } from "react-hook-form";
// import { motion } from "framer-motion";
// import { useLoginUserMutation } from "../../redux/features/auth/authApiSlice";
// import { BsPass } from "react-icons/bs";
// import { useAppDispatch } from "../../redux/hooks";
// import { authLogin } from "../../redux/features/auth/authSlice";
// import { useLocation, useNavigate, useParams } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { toast } from "react-toastify";
// import { useEffect } from "react";

// interface IFormInputs {
//   email: string;
//   password: string;
// }

// const VerifyUser = () => {
//   const { verificationCode } = useParams();
//   const {
//     register,
//     formState: { errors },
//     reset,
//     handleSubmit,
//   } = useForm<IFormInputs>();

//   const navigate = useNavigate();

//   const [verifyEmail, { isLoading, isSuccess, data, isError, error }] =
//     useVerifyEmailMutation();

//   useEffect(() => {
//     if (verificationCode) {
//       reset({ verificationCode });
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);
//   useEffect(() => {
//     if (isSuccess) {
//       toast.success(data?.message);
//       navigate("/login");
//     }
//     if (isError) {
//       if (Array.isArray((error as any).data.error)) {
//         (error as any).data.error.forEach((el: any) =>
//           toast.error(el.message, {
//             position: "top-right",
//           })
//         );
//       } else {
//         toast.error((error as any).data.message, {
//           position: "top-right",
//         });
//       }
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [isLoading]);

//   useEffect(() => {
//     if (isSuccess) {
//       reset();
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [isSuccess]);

//   const onSubmit: SubmitHandler<IFormInputs> = (data) => {
//     verifyEmail(data.verifyCode);
//   };

//   return (
//     <div className=" bg-[#eceef4] space-y-6 sm:space-y-0 p-2">
//       <h1 className="text-5xl font-bold sm:mt-12 sm:flex sm:justify-center sm:items-center">
//         VerifyUser now!
//       </h1>
//       <div className="sm:flex sm:h-screen sm:justify-around sm:items-center ">
//         <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
//           <form onSubmit={handleSubmit(onSubmit)}>
//             <div className="card-body">
//               <div className="form-control">
//                 <label className="label">
//                   <span className="label-text">Email</span>
//                 </label>
//                 <input
//                   type="text"
//                   placeholder="verificationCode"
//                   className="input input-bordered"
//                   {...register("verifyCode", { required: true })}
//                 />
//                 {errors.verifyCode && (
//                   <p className="text-sm text-red-400">verifyCode is required</p>
//                 )}
//               </div>
//               <div className="form-control mt-6">
//                 <button type="submit" className="btn btn-primary">
//                   VerifyUser
//                 </button>
//               </div>
//             </div>
//           </form>
//         </div>

//         <motion.div
//           initial={{ y: 0 }}
//           animate={{ y: [-20, 20] }}
//           transition={{
//             repeat: Infinity,
//             repeatType: "reverse",
//             duration: 2,
//             ease: "easeInOut",
//           }}
//           className="text-center mt-12 sm:mt-0 lg:text-left space-y-4"
//         >
//           <img
//             src={login}
//             alt="image"
//             className="max-w-sm rounded-lg shadow-2xl"
//           />
//         </motion.div>
//       </div>
//     </div>
//   );
// };

// export default VerifyUser;
