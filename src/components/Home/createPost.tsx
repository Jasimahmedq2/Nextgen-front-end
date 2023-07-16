/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-misused-promises */

import { HiOutlinePhotograph } from "react-icons/hi";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { useCreatePostMutation } from "../../redux/features/post/postApiSlice";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { Link } from "react-router-dom";

interface ICreatePost {
  caption: string;
  image: FileList;
}

const CreatePost = () => {
  const [preview, setPreview] = useState<string | null>(null);

  const { isLogin, loginUser } = useAppSelector((state) => state.user);
  console.log({ isLogin, loginUser });

  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm<ICreatePost>();

  const [createPost, { isLoading, isSuccess }] = useCreatePostMutation();

  const onSubmit: SubmitHandler<ICreatePost> = (data) => {
    const privateUrl = "44c26384eae4023f6064cf342eee9294";
    const formData = new FormData();
    formData.append("image", data?.image[0]);

    fetch(`https://api.imgbb.com/1/upload?key=${privateUrl}`, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((result) => {
        const postInfo = {
          caption: data?.caption,
          image: result?.data?.url,
        };
        createPost(postInfo);
      });

    reset();
    setPreview(null);
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(`successfully created a post`, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }, []);

  return (
    <div>
      <div className=" card bg-white w-full shadow">
        <div className="">
          <div
            style={{ marginTop: "-2rem" }}
            className="flex justify-center  items-center space-x-2 p-2 rounded-lg"
          >
            <Link to={`/profile/${loginUser?.userId}`}>
              <label className="btn  btn-circle avatar">
                <div className="w-12 rounded-full">
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                    alt="user img"
                  />
                </div>
              </label>
            </Link>
          </div>
        </div>
        <form className="relative" onSubmit={handleSubmit(onSubmit)}>
          <textarea
            {...register("caption")}
            placeholder="what's on your mind"
            className="focus:outline-0 w-full p-6 resize-none"
          />

          <div className="divider"></div>

          <div className="pb-16  ">
            <div className="flex justify-center space-x-6 ">
              <label>
                <input
                  type="file"
                  {...register("image", {
                    onChange: (e) => {
                      setPreview(URL.createObjectURL(e.target.files[0]));
                    },
                  })}
                  className="hidden"
                />
                <span className="text-4xl hover:cursor-pointer">
                  <HiOutlinePhotograph className="text-blue-400" />
                </span>
              </label>
            </div>
            <div>
              {preview && (
                <div className="mt-4">
                  <img
                    src={preview}
                    alt="Preview"
                    className="max-w-11/12 mx-auto max-h-80 object-contain rounded-lg "
                  />
                </div>
              )}
            </div>
          </div>

          <button
            className="btn btn-accent text-2xl absolute left-0 right-0 bottom-0"
            type="submit"
          >
            {isLoading ? "loading..." : "post"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
