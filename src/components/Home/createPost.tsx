import { AiFillTag } from "react-icons/ai";
import { CiLocationOn } from "react-icons/ci";
import { HiOutlinePhotograph } from "react-icons/hi";

const CreatePost = () => {
  return (
    <div>
      <div className=" card bg-white w-full shadow">
        <div className="">
          <div
            style={{ marginTop: "-2rem" }}
            className="flex justify-center  items-center space-x-2 p-2 rounded-lg"
          >
            <label className="btn  btn-circle avatar">
              <div className="w-12 rounded-full">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                  alt="user img"
                />
              </div>
            </label>
          </div>
        </div>
        <form className="relative">
          <textarea
            placeholder="what's on your mind"
            className="focus:outline-0 w-full p-6 resize-none"
          />

          <div className="divider"></div>

          <div className="flex justify-center pb-16 space-x-6 ">
            <div>
              <label>
                <input type="file" className="hidden" />
                <span className="text-4xl hover:cursor-pointer">
                  <HiOutlinePhotograph className="text-blue-400" />
                </span>
              </label>
            </div>
            <span className="text-4xl">
              <CiLocationOn />
            </span>
            <span className="text-4xl">
              <AiFillTag />
            </span>
          </div>
          <button
            className="btn btn-accent text-2xl absolute left-0 right-0 bottom-0"
            type="submit"
          >
            post
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
