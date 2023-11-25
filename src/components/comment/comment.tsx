/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
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
import { useState } from "react";
import {
  useCommentPostMutation,
  useGetOnePostQuery,
  useLikePostMutation,
} from "../../redux/features/post/postApiSlice";

import { BsThreeDotsVertical } from "react-icons/bs";
import {
  AiFillEdit,
  AiFillHeart,
  AiTwotoneDelete,
  AiOutlineHeart,
} from "react-icons/ai";
import { SubmitHandler, useForm } from "react-hook-form";
import { useEffect } from "react";
import { useAppSelector } from "../../redux/hooks";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { BsEmojiSmile } from "react-icons/bs";
import { Link } from "react-router-dom";

interface ICommentInterface {
  text: string;
}

interface CommentModalProps {
  openCommentModal: any;
  setOpenCommentMOdal: (value: any) => void;
}

const CommentModal = ({
  openCommentModal,
  setOpenCommentMOdal,
}: CommentModalProps) => {
  const [commentPost] = useCommentPostMutation();
  const [likePost] = useLikePostMutation();

  const [showPicker, setShowPicker] = useState(false);
  const [text, setText] = useState("");

  const handleSelectEmoji = (e: { unified: any; native: any }) => {
    const sym = e.unified.split("_");
    const codeArray: number[] = [];
    sym.forEach((el: string) => codeArray.push(parseInt(el, 16)));
    let emoji = String.fromCodePoint(...codeArray);
    setText(text + emoji);
  };

  const { loginUser, isDark } = useAppSelector((state) => state.user);

  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm<ICommentInterface>();

  const { data: CData, isLoading } = useGetOnePostQuery(openCommentModal);

  useEffect(() => {
    if (!isLoading && CData) {
      setOpenCommentMOdal(CData?.data?._id);
    }
  }, [CData, isLoading, setOpenCommentMOdal]);

  // const { _id, caption, createdAt, user, likes } = data?;
  // const { firstName, lastName } = user?.name;

  const onSubmit: SubmitHandler<ICommentInterface> = (data) => {
    const info = {
      postId: CData?.data?._id,
      text: text,
    };
    commentPost(info);
    reset();
    setShowPicker(false);
    setText("");
  };

  const handleLike = (id: string) => {
    likePost(id);
  };

  return (
    <div className={`${isDark ? "bg-[#15292B] text-white" : "bg-[#eceef4]"} `}>
      <input type="checkbox" id="comment-modal" className="modal-toggle" />

      <div
        className={`modal ${
          isDark ? "bg-[#15292B] text-white" : "bg-[#eceef4]"
        } `}
      >
        <div
          className={`modal-box ${
            isDark ? "bg-[#15292B] text-white" : "bg-[#eceef4]"
          } w-11/12 sm:w-1/2 max-w-5xl`}
        >
          <label
            onClick={() => setOpenCommentMOdal(null)}
            htmlFor="comment-modal"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>

          <h3 className="font-bold text-lg">post</h3>

          <div>
            <div className="pb-6">
              <div
                className={`card w-full mx-auto shadow-xl ${
                  isDark ? "bg-[#253C42] text-white" : "bg-white"
                } `}
              >
                <div className="">
                  <div className="flex items-center space-x-2 p-2 relative rounded-lg">
                    <Link to={`/profile/${CData?.data?.user?._id}`}>
                      <label className="btn  btn-circle avatar">
                        <div className="w-10 rounded-full">
                          <img
                            src={
                              CData?.data?.user?.profilePic ||
                              "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                            }
                            alt="user img"
                          />
                        </div>
                      </label>
                    </Link>

                    <div>
                      <h3 className="text-sm font-bold">
                        {CData?.data?.user?.name?.firstName +
                          " " +
                          CData?.data?.user?.name?.lastName}
                      </h3>
                      <p className="font">{format(CData?.data?.createdAt)}</p>
                    </div>
                  </div>

                  <div className="py-4 px-2">
                    <p>{CData?.data?.caption}</p>
                  </div>
                  <div className="p-2 rounded-lg">
                    <img
                      style={{ maxHeight: "25rem", width: "100%" }}
                      src={CData?.data?.image}
                      alt=""
                    />
                  </div>

                  <div className="relative px-4 py-2 mt-4 space-x-4 ">
                    <div className="flex justify-between">
                      <h2
                        className={`flex space-x-4 ${
                          isDark ? "bg-[#15292B]" : "bg-base-300"
                        }  px-6 rounded hover:cursor-pointer`}
                        onClick={() => handleLike(CData?.data?._id)}
                      >
                        {CData?.data?.likes.includes(loginUser?.userId) ? (
                          <AiFillHeart
                            className={`sm:text-4xl text-2xl hover:cursor-pointer text-red-300`}
                          />
                        ) : (
                          <AiOutlineHeart
                            className={`sm:text-4xl text-2xl hover:cursor-pointer `}
                          />
                        )}

                        <span className="text-xl font-serif">
                          {CData?.data?.likes.length}
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
            {CData?.data?.comments?.map((comment: any) => (
              <div className="flex items-start mb-4">
                <Link to={`/profile/${comment?.user?._id}`}>
                  <img
                    src={
                      comment?.user?.profilePic ||
                      "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                    }
                    alt={`${
                      comment?.user?.name?.firstName +
                      "" +
                      comment?.user?.name.lastName
                    }'s profile picture`}
                    className="w-8 h-8 rounded-full mr-2 hover:cursor-pointer"
                  />
                </Link>
                <div>
                  <h4 className="text-sm font-semibold">
                    {comment?.user?.name?.firstName +
                      " " +
                      comment?.user?.name.lastName}
                  </h4>
                  <p className={`${isDark ? "text-white" : "text-gray-600"}`}>
                    {comment.text}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex justify-between items-center">
              <input
                value={text}
                onChange={(e) => setText(e.target.value)}
                // {...register("text", { required: true })}
                type="text"
                placeholder="add a comment"
                className={`${
                  isDark ? "bg-[#15292B] text-white border-gray-100" : ""
                } input input-bordered w-full max-full-xs`}
              />
              {/* emojis */}
              <div className="flex justify-end items-center mr-4">
                <details className="dropdown dropdown-end">
                  <summary
                    onClick={() => setShowPicker(!showPicker)}
                    className="m-1 btn"
                  >
                    <span className="hover:cursor-pointer flex justify-center items-center sm:text-2xl text-orange-400 hover:text-slate-300">
                      <BsEmojiSmile />
                    </span>
                  </summary>
                  <ul className="p-2 shadow menu dropdown-content z-[1] rounded-box">
                    <li>
                      {showPicker && (
                        <Picker data={data} onEmojiSelect={handleSelectEmoji} />
                      )}
                    </li>
                  </ul>
                </details>
              </div>
            </div>

            {errors.text && (
              <p className="text-sm text-red-400">text is required</p>
            )}
            <div className="modal-action">
              <input
                className={`btn ${
                  isDark ? "bg-[#15292B] text-white" : "bg-base-300"
                }`}
                type="submit"
                value="comment"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CommentModal;
