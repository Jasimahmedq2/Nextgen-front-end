/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { AiFillEdit, AiTwotoneDelete, AiOutlineHeart } from "react-icons/ai";

import { BsThreeDotsVertical } from "react-icons/bs";
import { AiOutlineComment } from "react-icons/ai";
import { AiFillHeart } from "react-icons/ai";
import { IPost } from "../../interfaces/post/postInterfaces";
import React, { useState } from "react";
import { format } from "timeago.js";
import { useLikePostMutation } from "../../redux/features/post/postApiSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { likeDislikePost } from "../../redux/features/post/postSlice";
import CommentModal from "../comment/comment";
import EditPost from "../modal/editPost";
import DeletePost from "../modal/deletePost";
import { Link } from "react-router-dom";

interface IFeed {
  post: IPost;
}

const FeedCard: React.FC<IFeed> = ({ post }) => {
  const [openCommentModal, setOpenCommentMOdal] = useState<string | null>(null);
  const [editPostModal, setEditPostModal] = useState<IPost | null>(null);
  const [deletePostModal, setDeletePostModal] = useState<IPost | null>(null);

  const { image, caption, _id, createdAt, user, likes } = post;
  // const { firstName, lastName } = user?.name;

  const { loginUser, isDark } = useAppSelector((state) => state.user);

  const [likePost] = useLikePostMutation();

  const handleLike = (id: string) => {
    if (post) {
      likePost(id);
    }
  };

  return (
    <div>
      <div className="pb-6">
        <div
          className={`${
            isDark ? "bg-[#253C42] text-white" : "bg-white "
          } card w-full shadow-xl`}
        >
          <div className="">
            <div className="flex items-center space-x-2 p-2 relative rounded-lg">
              <Link to={`/profile/${user?._id}`}>
                <label className="btn  btn-circle avatar">
                  <div className="w-10 rounded-full">
                    <img
                      src={
                        user.profilePic ||
                        "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                      }
                      alt="user img"
                    />
                  </div>
                </label>
              </Link>

              <div>
                <h3 className="text-sm font-bold">
                  {user?.name?.firstName + " " + user?.name?.lastName}
                </h3>
                <p className="font">{format(createdAt)}</p>
              </div>

              <div className="absolute right-2 top-4">
                <div className="dropdown dropdown-end">
                  <label tabIndex={0} className="hover:cursor-pointer m-1">
                    {" "}
                    <BsThreeDotsVertical />
                  </label>
                  <div
                    tabIndex={0}
                    className={`dropdown-content menu z-10  shadow  ${
                      isDark ? "bg-[#15292B]" : "bg-base-200"
                    } rounded-box lg:w-52  space-y-2`}
                  >
                    <label
                      htmlFor="delete-post-modal"
                      className="flex items-center p-2 space-x-2 hover:cursor-pointer hover:bg-base-300 rounded"
                      onClick={() => setDeletePostModal(post)}
                    >
                      <AiTwotoneDelete className="sm:text-4xl text-red-300 " />{" "}
                      <span>delete</span>
                    </label>

                    <label
                      htmlFor="update-post-modal"
                      className="flex items-center ml-2  space-x-2 hover:cursor-pointer hover:bg-base-300 rounded"
                      onClick={() => setEditPostModal(post)}
                    >
                      <AiFillEdit className="sm:text-4xl text-blue-400" />{" "}
                      <span>edit</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="py-4 px-2">
              <p>{caption}</p>
            </div>
            <div className="p-2 rounded-lg">
              <img
                style={{ maxHeight: "25rem", width: "100%" }}
                src={image}
                alt=""
              />
            </div>

            <div className="relative px-4 py-2 mt-4 space-x-4 ">
              <div className="flex justify-between">
                <h2
                  className={`flex space-x-4 ${
                    isDark ? "bg-[#15292B]" : "bg-base-300"
                  }  px-6 rounded hover:cursor-pointer`}
                  onClick={() => handleLike(_id)}
                >
                  {likes.includes(loginUser?.userId ?? "") ? (
                    <AiFillHeart
                      className={`sm:text-4xl text-2xl hover:cursor-pointer text-red-300`}
                    />
                  ) : (
                    <AiOutlineHeart
                      className={`sm:text-4xl text-2xl hover:cursor-pointer `}
                    />
                  )}

                  <span className="text-xl font-serif">{likes.length}</span>
                </h2>
                <label
                  htmlFor="comment-modal"
                  className={`flex space-x-4 ${
                    isDark ? "bg-[#15292B]" : "bg-base-300"
                  } px-6 rounded hover:cursor-pointer`}
                  onClick={() => setOpenCommentMOdal(post?._id)}
                >
                  <AiOutlineComment className="sm:text-4xl text-2xl hover:cursor-pointer" />
                  <span className="text-sm sm:text-xl font-serif">comment</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
      {openCommentModal && (
        <CommentModal
          openCommentModal={openCommentModal}
          setOpenCommentMOdal={setOpenCommentMOdal}
        />
      )}
      {editPostModal && (
        <EditPost
          editPostModal={editPostModal}
          setEditPostModal={setEditPostModal}
        />
      )}
      {deletePostModal && (
        <DeletePost
          deletePostModal={deletePostModal}
          setDeletePostModal={setDeletePostModal}
        />
      )}
    </div>
  );
};

export default FeedCard;
