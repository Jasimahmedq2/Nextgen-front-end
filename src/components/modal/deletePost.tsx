/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { useAppSelector } from "@/redux/hooks";
import { useDeletePostMutation } from "../../redux/features/post/postApiSlice";

interface DeletePostProps {
  deletePostModal: { _id: string };
  setDeletePostModal: React.Dispatch<React.SetStateAction<any>>;
}

const DeletePost = ({
  deletePostModal,
  setDeletePostModal,
}: DeletePostProps) => {
  const [deletePost] = useDeletePostMutation();

  const { isDark } = useAppSelector((state) => state.user);
  const handleDelete = (postId: string) => {
    deletePost(postId);
    setDeletePostModal(null);
  };

  return (
    <div className="bg-[#eceef4]  ">
      <input type="checkbox" id="delete-post-modal" className="modal-toggle" />
      <div className="modal">
        <div
          className={`modal-box w-1/3 ${
            isDark ? "bg-[#15292B] text-white" : "bg-[#eceef4]"
          }  max-w-5xl`}
        >
          <label
            htmlFor="delete-post-modal"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>

          <h3 className="font-bold text-lg">
            are you want to delete the post?
          </h3>

          <div className="card flex-shrink-0 w-full mx-auto max-w-sm shadow-2xl bg-base-100">
            <button
              onClick={() => handleDelete(deletePostModal?._id)}
              type="submit"
              className="btn btn-primary"
            >
              yes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeletePost;
