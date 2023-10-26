/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Link } from "react-router-dom";
import { useGetFriendsQuery } from "../../redux/features/auth/userApi";
import { useAppSelector } from "@/redux/hooks";
import Loader from "../loader";

const Friends = () => {
  const { data, isLoading, isSuccess } = useGetFriendsQuery(null);
  console.log({ friendss: data?.followers });

  const { isDark } = useAppSelector((state) => state.user);

  if (isLoading) {
    return <Loader loading={true} />;
  }
  if (isSuccess) {
    console.log({ successData: data });
  }
  return (
    <div
      className={` ${
        isDark ? "bg-[#253C42] text-white" : "bg-white"
      } rounded-lg shadow-md p-2 font-bold space-y-4 sm:max-h-screen overflow-y-auto`}
    >
      <h2 className="text-xl sm:text-2xl ">Followers</h2>
      <div className="grid grid-cols-3 gap-2 sm:grid-cols-1 ">
        {data &&
          data?.data?.followers?.map((suggest: any) => {
            return (
              <Link to={`/profile/${suggest?._id}`}>
                <div className="sm:flex border sm:border-none sm:items-center sm:space-x-4 py-2 px-1 sm:px-4 rounded-lg">
                  <label className="btn btn-circle avatar">
                    <div className="w-10  rounded-full">
                      <img
                        src={
                          suggest?.profilePic ||
                          "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                        }
                        alt="suggested img"
                      />
                    </div>
                  </label>
                  <h4 className="text-sm sm:text-lg font-bold">
                    {suggest?.name?.firstName + " " + suggest?.name?.lastName}
                  </h4>
                </div>
              </Link>
            );
          })}
      </div>
    </div>
  );
};

export default Friends;
