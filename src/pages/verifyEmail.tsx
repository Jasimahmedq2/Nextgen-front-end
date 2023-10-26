/* eslint-disable @typescript-eslint/no-floating-promises */
import { useNavigate, useParams } from "react-router-dom";

import { useEffect } from "react";
import { useVerifyEmailMutation } from "../redux/features/auth/authApiSlice";

const VerifyEmail = () => {
  const { token } = useParams();

  const navigate = useNavigate();

  const [verifyEmail, { isSuccess, isLoading, error }] =
    useVerifyEmailMutation();

  const handleVerifyEmail = () => {
    verifyEmail(token);
  };

  useEffect(() => {
    if (isSuccess) {
      navigate("/login");
    }
  }, [isLoading, isSuccess, navigate]);

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="sm:w-1/2 h-48 rounded overflow-hidden flex justify-center items-center shadow-lg">
        <button
          onClick={handleVerifyEmail}
          className="text-white bg-blue-700 rounded p-2 w-1/2 mx-auto"
        >
          Verify Email
        </button>
      </div>
    </div>
  );
};

export default VerifyEmail;
