/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { format } from "timeago.js";
import {
  useCommentPostMutation,
  useGetOnePostQuery,
  useLikePostMutation,
} from "../../redux/features/post/postApiSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  likeDislikePost,
  commentPost,
} from "../../redux/features/post/postSlice";
import { BsThreeDotsVertical } from "react-icons/bs";
import {
  AiFillEdit,
  AiFillHeart,
  AiTwotoneDelete,
  AiOutlineHeart,
} from "react-icons/ai";
import { IPost } from "../../interfaces/post/postInterfaces";
import { SubmitHandler, useForm } from "react-hook-form";
import { useEffect } from "react";

interface ICommentInterface {
  text: string;
}

const CommentModal = ({ openCommentModal }) => {
  const [commentPost] = useCommentPostMutation();
  const [likePost] = useLikePostMutation();

  const { loginUser } = useAppSelector((state) => state.user);

  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm<ICommentInterface>();

  const { data, isLoading } = useGetOnePostQuery(openCommentModal?._id);

  if (isLoading) {
    return <p>loading...</p>;
  }

  const { _id, caption, createdAt, user, likes } = data?.data;
  const { firstName, lastName } = user?.name;

  const onSubmit: SubmitHandler<ICommentInterface> = (data) => {
    const info = {
      postId: _id,
      text: data?.text,
    };
    commentPost(info);
    reset();
  };

  const handleLike = (id: string) => {
    likePost(id);
  };

  return (
    <div className="bg-[#eceef4]">
      <input type="checkbox" id="comment-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box w-11/12 max-w-5xl">
          <label
            htmlFor="comment-modal"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>

          <h3 className="font-bold text-lg">post</h3>

          <div>
            <div className="pb-6">
              <div className="card w-full bg-white shadow-xl">
                <div className="">
                  <div className="flex items-center space-x-2 p-2 relative rounded-lg">
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

                    <div>
                      <h3 className="text-sm font-bold">
                        {firstName + " " + lastName}
                      </h3>
                      <p className="font">{format(createdAt)}</p>
                    </div>

                    <div className="absolute right-2 top-4">
                      <div className="dropdown dropdown-end">
                        <label
                          tabIndex={0}
                          className="hover:cursor-pointer m-1"
                        >
                          {" "}
                          <BsThreeDotsVertical />
                        </label>
                        <div
                          tabIndex={0}
                          className="dropdown-content menu  shadow bg-base-200 rounded-box lg:w-52  space-y-2"
                        >
                          <label
                            htmlFor="delete-post-modal"
                            className="flex items-center p-2 space-x-2 hover:cursor-pointer hover:bg-base-300 rounded"
                          >
                            <AiTwotoneDelete className="sm:text-4xl text-red-300 " />{" "}
                            <span>delete</span>
                          </label>

                          <label
                            htmlFor="update-post-modal"
                            className="flex items-c
                        enter  space-x-2 hover:cursor-pointer hover:bg-base-300 rounded"
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
                      src={data?.data?.image}
                      alt=""
                    />
                  </div>

                  <div className="relative px-4 py-2 mt-4 space-x-4 ">
                    <div className="flex justify-between">
                      <h2
                        className={`flex space-x-4 bg-base-300 px-6 rounded hover:cursor-pointer`}
                        onClick={() => handleLike(_id)}
                      >
                        {likes.includes(loginUser?.userId) ? (
                          <AiFillHeart
                            className={`sm:text-4xl text-2xl hover:cursor-pointer text-red-300`}
                          />
                        ) : (
                          <AiOutlineHeart
                            className={`sm:text-4xl text-2xl hover:cursor-pointer `}
                          />
                        )}

                        <span className="text-xl font-serif">
                          {likes.length}
                        </span>
                      </h2>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/*
          scroll comment 
          */}

          <div className="max-h-96 space-y-4 py-4 overflow-y-auto">
            {data?.data?.comments?.map((comment) => (
              <div className="flex items-start mb-4">
                <img
                  src={
                    comment.profilePic ||
                    "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                  }
                  alt={`${
                    comment?.user?.name?.firstName +
                    "" +
                    comment?.user?.name.lastName
                  }'s profile picture`}
                  className="w-8 h-8 rounded-full mr-2"
                />
                <div>
                  <h4 className="text-sm font-semibold">
                    {comment?.user?.name?.firstName +
                      " " +
                      comment?.user?.name.lastName}
                  </h4>
                  <p className="text-gray-600">{comment.text}</p>
                </div>
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              {...register("text", { required: true })}
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full max-full-xs"
            />
            {errors.text && (
              <p className="text-sm text-red-400">text is required</p>
            )}
            <div className="modal-action">
              <input
                htmlFor="comment-modal"
                className="btn"
                type="submit"
                value="post"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CommentModal;
