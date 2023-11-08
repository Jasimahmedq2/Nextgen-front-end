// /* eslint-disable no-empty */
// /* eslint-disable @typescript-eslint/require-await */
// /* eslint-disable @typescript-eslint/ban-ts-comment */
// /* eslint-disable @typescript-eslint/no-unsafe-return */
// /* eslint-disable @typescript-eslint/no-unsafe-member-access */
// /* eslint-disable @typescript-eslint/no-unsafe-assignment */
// /* eslint-disable @typescript-eslint/no-unsafe-call */

// import { useAppSelector } from "@/redux/hooks";
// import { IGenericErrorResponse, ResponseSuccessType } from "@/types/common";
// import axios from "axios";

// const instance = axios.create();
// instance.defaults.headers.post["Content-Type"] = "application/json";
// instance.defaults.headers["Accept"] = "application/json";
// instance.defaults.timeout = 60000;

// // Add a request interceptor
// instance.interceptors.request.use(
//   function (config) {
//     const { accessToken } = useAppSelector((state) => state.user);
//     if (accessToken) {
//       config.headers.Authorization = accessToken;
//     }
//     return config;
//   },
//   function (error) {

//     return Promise.reject(error);
//   }
// );

// instance.interceptors.response.use(
//   //@ts-ignore
//   function (response) {
//     const responseObject: ResponseSuccessType = {
//       data: response?.data,
//       meta: response?.data?.meta,
//     };
//     return responseObject;
//   },
//   async function (error) {
//     if (error?.response?.status === 403) {
//     } else {
//       const responseObject: IGenericErrorResponse = {
//         statusCode: error?.response?.data?.statusCode || 500,
//         message: error?.response?.data?.message || "Something went wrong",
//         errorMessages: error?.response?.data?.message,
//       };
//       return responseObject;
//     }
//   }
// );

// export { instance };
