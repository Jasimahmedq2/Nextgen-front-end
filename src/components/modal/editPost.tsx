/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { SubmitHandler, useForm } from "react-hook-form";
import { useUpdateUserMutation } from "../../redux/features/auth/userApi";
import { useEditPostMutation } from "../../redux/features/post/postApiSlice";

interface IProfileEdit {
  caption?: string;
  image?: string;
}

const EditPost = ({ editPostModal, setEditPostModal }) => {
  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm<IProfileEdit>();

  const [editPost] = useEditPostMutation();

  const onSubmit: SubmitHandler<IProfileEdit> = (data) => {
    const privateUrl = "44c26384eae4023f6064cf342eee9294";
    const formData = new FormData();
    formData.append("image", data?.image[0]);

    fetch(`https://api.imgbb.com/1/upload?key=${privateUrl}`, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((result) => {
        const profileOptions = {
          updatedData: {
            caption: data.caption,
            image: result?.data?.url,
          },
          postId: editPostModal?._id,
        };
        console.log({ profileOptions });
        editPost(profileOptions);
      });
    setEditPostModal(null);
    reset();
  };
  return (
    <div className="bg-[#eceef4]  ">
      <input type="checkbox" id="update-post-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box w-11/12 max-w-5xl">
          <label
            htmlFor="update-post-modal"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>

          <h3 className="font-bold text-lg">Edit Profile</h3>

          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="card-body">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Caption</span>
                  </label>
                  <input
                    type="text"
                    placeholder="bio"
                    className="input input-bordered"
                    {...register("caption")}
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Image</span>
                  </label>
                  <input
                    type="file"
                    placeholder="Profile Pic"
                    className="input input-bordered"
                    {...register("image")}
                  />
                </div>

                <div className="form-control mt-6">
                  <button type="submit" className="btn btn-primary">
                    updatePost
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditPost;
