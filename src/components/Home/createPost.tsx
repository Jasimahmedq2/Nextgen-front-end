/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable prefer-const */
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
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { BsEmojiSmile } from "react-icons/bs";
import { AiOutlineVideoCameraAdd } from "react-icons/ai";
import { LiaFileAudio } from "react-icons/lia";

interface ICreatePost {
  caption: string;
  images: any;
  videos: any;
  audios: any;
}

const CreatePost = () => {
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [previewVideos, setPreviewVideos] = useState<string[]>([]);
  const [previewAudios, setPreviewAudios] = useState<string[]>([]);

  const [showPicker, setShowPicker] = useState(false);
  const [text, setText] = useState("");

  const handleSelectEmoji = (e: { unified: any; native: any }) => {
    const sym = e.unified.split("_");
    const codeArray: number[] = [];
    sym.forEach((el: string) => codeArray.push(parseInt(el, 16)));
    let emoji = String.fromCodePoint(...codeArray);
    setText(text + emoji);
  };

  const { isLogin, loginUser, isDark } = useAppSelector((state) => state.user);
  console.log({ isLogin, loginUser });

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<ICreatePost>();

  const [createPost, { isLoading, isSuccess }] = useCreatePostMutation();

  // eslint-disable-next-line @typescript-eslint/require-await
  const onSubmit: SubmitHandler<ICreatePost> = async (data) => {
    const formData = new FormData();
    for (let i = 0; i < data.images.length; i++) {
      formData.append("images", data.images[i]);
    }
    for (let i = 0; i < data.videos.length; i++) {
      formData.append("videos", data.videos[i]);
    }
    for (let i = 0; i < data.audios.length; i++) {
      formData.append("audios", data.audios[i]);
    }
    formData.append("caption", text);

    console.log({ bodyInfo: data });

    try {
      const response = await createPost(formData).unwrap();
      console.log("Post created successfully:", response);
      toast.success("Post created successfully");
    } catch (error) {
      console.error("Error creating post:", error);
      toast.error("Error creating post");
    }

    setPreviewImages([]);
    setPreviewVideos([]);
    setPreviewAudios([]);
    setText("");
    setShowPicker(false);
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
      <div
        className={` card ${
          isDark ? "bg-[#253C42]" : "bg-white"
        }  w-full shadow`}
      >
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
            value={text}
            onChange={(e) => setText(e.target.value)}
            // {...register("caption")}
            placeholder="what's on your mind"
            className={`${
              isDark ? "bg-[#253C42] text-white" : ""
            }  focus:outline-0 w-full p-6 resize-none`}
          />

          {/* emojis */}
          <div className="flex justify-end items-center mr-4">
            <details className="dropdown">
              <summary
                onClick={() => setShowPicker(!showPicker)}
                className="m-1 btn"
              >
                <span className="hover:cursor-pointer flex justify-center items-center sm:text-2xl text-orange-400 hover:text-slate-300">
                  <BsEmojiSmile />
                </span>
              </summary>
              <ul className="p-2 shadow menu dropdown-content z-[1] rounded-box w-52">
                <li>
                  {showPicker && (
                    <Picker data={data} onEmojiSelect={handleSelectEmoji} />
                  )}
                </li>
              </ul>
            </details>
          </div>

          <div className="divider"></div>

          {/* // file upload */}

          <div className="pb-16  ">
            <div className="flex justify-center space-x-6 ">
              {/* <label>
                <input
                  type="file"
                  {...register("images", {
                    onChange: (e) => {
                      setPreview(URL.createObjectURL(e.target.files[0]));
                    },
                  })}
                  className="hidden"
                />
                <span className="text-4xl hover:cursor-pointer">
                  <HiOutlinePhotograph className="text-blue-400" />
                </span>
              </label> */}

              <label>
                <input
                  type="file"
                  accept="video/*"
                  {...register("videos", {
                    onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                      if (e.target.files) {
                        const videosPreview = Array.from(e.target.files).map(
                          (file) => URL.createObjectURL(file)
                        );
                        setPreviewVideos(videosPreview);
                      }
                    },
                  })}
                  className="hidden"
                  multiple
                />
                <span className="text-4xl hover:cursor-pointer">
                  <AiOutlineVideoCameraAdd className="text-blue-400" />
                </span>
              </label>
              <label>
                <input
                  type="file"
                  accept="image/*"
                  {...register("images", {
                    onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                      if (e.target.files) {
                        const imagesPreview = Array.from(e.target.files).map(
                          (file) => URL.createObjectURL(file)
                        );
                        setPreviewImages(imagesPreview);
                      }
                    },
                  })}
                  className="hidden"
                  multiple
                />
                <span className="text-4xl hover:cursor-pointer">
                  <HiOutlinePhotograph className="text-blue-400" />
                </span>
              </label>

              <label>
                <input
                  type="file"
                  accept="audio/*"
                  {...register("audios", {
                    onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                      if (e.target.files) {
                        const audiosPreview = Array.from(e.target.files).map(
                          (file) => URL.createObjectURL(file)
                        );
                        setPreviewAudios(audiosPreview);
                      }
                    },
                  })}
                  // onChange={handleAudioChange}
                  className="hidden"
                  multiple
                />
                <span className="text-4xl hover:cursor-pointer">
                  <LiaFileAudio className="text-blue-400" />
                </span>
              </label>
            </div>
            <div>
              {/* {preview && (
                <div className="mt-4">
                  <img
                    src={preview}
                    alt="Preview"
                    className="max-w-11/12 mx-auto max-h-80 object-contain rounded-lg "
                  />
                </div>
              )} */}
              {previewImages.map((imagePreview, index) => (
                <div key={index} className="mt-4">
                  <img
                    src={imagePreview}
                    alt={`Image Preview ${index}`}
                    className="max-w-11/12 mx-auto max-h-80 object-contain rounded-lg"
                  />
                </div>
              ))}
              {previewVideos.map((videoPreview, index) => (
                <div key={index} className="mt-4">
                  <video controls className="max-w-11/12 mx-auto max-h-80">
                    <source src={videoPreview} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              ))}
              {previewAudios.map((audioPreview, index) => (
                <div key={index} className="mt-4">
                  <audio controls className="max-w-11/12 mx-auto">
                    <source src={audioPreview} type="audio/mpeg" />
                    Your browser does not support the audio element.
                  </audio>
                </div>
              ))}
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
