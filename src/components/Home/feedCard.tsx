import { AiFillEdit, AiTwotoneDelete } from "react-icons/ai";
import { BsThreeDotsVertical } from "react-icons/bs";
import { AiFillHeart } from "react-icons/ai";
import { IPost } from "../../interfaces/post/postInterfaces";
import React from "react";

interface IFeed {
  post: IPost;
}

const FeedCard: React.FC<IFeed> = ({ post }) => {
  return (
    <div>
      <div className="pb-6">
        <div className="card w-full bg-white shadow-xl">
          <div className="">
            <div className="flex items-center space-x-2 p-2 relative rounded-lg">
              <label className="btn  btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                    alt="user img"
                  />
                </div>
              </label>

              <div>
                <h3 className="text-sm font-bold">{post?.name}</h3>
                <p className="font">{post.createdAt}</p>
              </div>

              <div className="absolute right-2 top-4">
                <div className="dropdown dropdown-end">
                  <label tabIndex={0} className="hover:cursor-pointer m-1">
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
              <p>{post.description}</p>
            </div>
            <div className="p-2 rounded-lg">
              <img
                style={{ maxHeight: "25rem", width: "100%" }}
                src={post.image}
                alt=""
              />
            </div>

            <div className="relative px-4 py-2 space-x-4 ">
              <div className="flex">
                <h2 className="flex space-x-4 bg-base-300 px-6 rounded hover:cursor-pointer">
                  <AiFillHeart className="sm:text-4xl text-2xl hover:cursor-pointer text-red-300" />
                  <span className="text-xl font-serif">2</span>
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedCard;
