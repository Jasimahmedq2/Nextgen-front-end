/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { IUser } from "@/interfaces/user/userInteface";
import { useAppSelector } from "@/redux/hooks";
import { Link } from "react-router-dom";

const UserComponent = ({ user }: { user: IUser }) => {
  const { isDark } = useAppSelector((state) => state.user);

  return (
    <Link to={`/profile/${user?._id}`}>
      <div
        className={`sm:flex ${isDark ? "bg-[#37cdbe]" : "bg-[#f5f5f5]"}  border sm:border-none sm:items-center sm:space-x-4 py-2 px-1 sm:px-4 rounded-lg`}
      >
        <label className="btn btn-circle avatar">
          <div className="w-10  rounded-full">
            <img
              src={
                user?.profilePic ||
                "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
              }
              alt="usered img"
            />
          </div>
        </label>
        <h4 className="text-sm sm:text-md font-semibold">
          {user?.name?.firstName + " " + user?.name?.lastName}
        </h4>
      </div>
    </Link>
  );
};

export default UserComponent;
