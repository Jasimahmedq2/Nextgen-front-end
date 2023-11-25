/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { useParams } from "react-router-dom";
import FeedCard from "../../components/Home/feedCard";
import { useUserPostQuery } from "../../redux/features/post/postApiSlice";
import {
  useFollowingUserMutation,
  useProfileUserQuery,
  useUnFollowingUserMutation,
} from "../../redux/features/auth/userApi";
import { useState } from "react";
import EditProfile from "../../components/modal/editePorfile";
import { useAppSelector } from "../../redux/hooks";
import Friends from "../../components/Home/friends";
import SuggestedFriends from "../../components/Home/suggestedFriends";
import { IPost } from "@/interfaces/post/postInterfaces";
import Loader from "@/components/loader";

const Profile = () => {
  const { userId } = useParams();
  const [editProfileModal, setEditeProfileModal] = useState(null);
  const { data, isLoading } = useUserPostQuery(userId);
  const { data: profileUser } = useProfileUserQuery(userId);

  const [followingUser] = useFollowingUserMutation();
  const [unFollowingUser] = useUnFollowingUserMutation();

  const { loginUser, isDark } = useAppSelector((state) => state.user);

  if (isLoading) {
    return <Loader loading={true} />;
  }
  const handleFollowing = async (id: string) => {
    await followingUser(id);
  };
  const handleUnFollowing = async (id: string) => {
    await unFollowingUser(id);
  };
  return (
    <div className="min-h-screen space-y-6 sm:space-y-0">
      <div
        className={`w-11/12 sm:max-w-2xl ${
          isDark ? "bg-[#253C42] text-white" : "bg-base-100"
        }  mt-6 sm:my-12 mx-auto p-4 rounded shadow`}
      >
        {/* Profile Header */}
        <div className="flex sm:relative flex-col md:flex-row items-center mb-4">
          <img
            className="w-16 h-16 md:w-20 md:h-20 rounded-full mb-4 md:mb-0 mr-0 md:mr-4"
            src={
              profileUser?.data?.profilePic ||
              "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            }
            alt="Profile Picture"
          />
          <div>
            <h1 className="text-2xl md:text-3xl font-semibold">
              {profileUser?.data?.name?.firstName +
                " " +
                profileUser?.data?.name?.lastName}
            </h1>
          </div>

          {/*
           * following and unFollowing
           */}

          <div className="flex sm:absolute sm:right-0 items-center ">
            <div className="space-x-4">
              {userId !== loginUser?.userId && (
                <>
                  {profileUser?.data?.followers?.includes(loginUser?.userId) ? (
                    <button
                      onClick={() => handleUnFollowing(userId as string)}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-sm"
                    >
                      unFollow
                    </button>
                  ) : (
                    <button
                      onClick={() => handleFollowing(userId as string)}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-sm"
                    >
                      Follow
                    </button>
                  )}
                </>
              )}

              {userId === loginUser?.userId && (
                <label
                  htmlFor="edit-profile-modal"
                  className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-sm hover: cursor-pointer"
                  onClick={() => setEditeProfileModal(profileUser?.data)}
                >
                  <span>Edit</span>
                </label>
              )}
            </div>
          </div>
        </div>

        {/* Profile Stats */}
        <div className="flex flex-wrap justify-center md:justify-start mb-4">
          <div className="mr-4 mb-2 md:mb-0">
            <h2 className="font-semibold">posts</h2>
            <p>{data?.data?.length}</p>
          </div>
          <div className="mr-4 mb-2 md:mb-0">
            <h2 className="font-semibold">Followers</h2>
            <p>{profileUser?.data?.followers?.length}</p>
          </div>
          <div>
            <h2 className="font-semibold">Following</h2>
            <p>{profileUser?.data?.following?.length}</p>
          </div>
        </div>

        {/* Profile Gallery */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4"></div>
      </div>
      <div className="w-11/12 sm:w-1/2 mx-auto space-y-4">
        <div className="sm:hidden space-y-4 py-2">
          <div className="max-h-60 overflow-y-auto ">
            <SuggestedFriends />
          </div>
          <div className="max-h-60 overflow-y-auto ">
            <Friends />
          </div>
        </div>

        {data?.data?.map((post: IPost) => (
          <FeedCard key={post._id} post={post} />
        ))}
      </div>
      {editProfileModal && (
        <EditProfile
          editProfileModal={editProfileModal}
          setEditeProfileModal={setEditeProfileModal}
        />
      )}
    </div>
  );
};

export default Profile;
