/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { useDeletePostMutation } from "../../redux/features/post/postApiSlice";

const DeletePost = ({ deletePostModal, setDeletePostModal }) => {
  const [deletePost] = useDeletePostMutation();
  const handleDelete = (postId: string) => {
    deletePost(postId);
    setDeletePostModal(null);
  };

  return (
    <div className="bg-[#eceef4]  ">
      <input type="checkbox" id="delete-post-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box w-11/12 max-w-5xl">
          <label
            htmlFor="delete-post-modal"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>

          <h3 className="font-bold text-lg">
            are you want to delete the post?
          </h3>

          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
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
