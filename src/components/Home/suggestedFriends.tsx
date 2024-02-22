/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { useSuggestedFriendsQuery } from "../../redux/features/auth/userApi";
import { useAppSelector } from "@/redux/hooks";
import Loader from "../loader";
import UserComponent from "./userComponent";
import { IUser } from "@/interfaces/user/userInteface";

const SuggestedFriends = () => {
  const { data, isLoading, isSuccess } = useSuggestedFriendsQuery(undefined);

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
      <h2 className="text-xl xl:text-2xl pb-2 sm:pb-3 border-b-4 ">Suggested friends</h2>
      <div className="grid grid-cols-3 gap-2 sm:grid-cols-1 ">
        {data &&
          data?.data?.map((suggest: IUser) => <UserComponent user={suggest} />)}
      </div>
    </div>
  );
};

export default SuggestedFriends;
