/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { SubmitHandler, useForm } from "react-hook-form";
import { useUpdateUserMutation } from "../../redux/features/auth/userApi";

interface IPostEdit {
  firstName: string;
  lastName: string;
  profilePic: string;
  bio: string;
}

interface EditePostProps {
  editProfileModal: any;
  setEditeProfileModal: React.Dispatch<React.SetStateAction<any>>;
}

const EditProfile = ({
  editProfileModal,
  setEditeProfileModal,
}: EditePostProps) => {
  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm<IPostEdit>();

  const [updateUser] = useUpdateUserMutation();

  const onSubmit: SubmitHandler<IPostEdit> = (data) => {
    const privateUrl = "44c26384eae4023f6064cf342eee9294";
    const formData = new FormData();
    formData.append("image", data?.profilePic[0]);

    fetch(`https://api.imgbb.com/1/upload?key=${privateUrl}`, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((result) => {
        const profileOptions = {
          updatedData: {
            name: {
              firstName: data.firstName || "",
              lastName: data.lastName || "",
            },
            bio: data.bio,
            profilePic: result?.data?.url,
          },
          userId: editProfileModal?._id,
        };
        console.log({ profileOptions });
        updateUser(profileOptions);
      });
    setEditeProfileModal(null);
    reset();
  };
  return (
    <div className="bg-[#eceef4]  ">
      <input type="checkbox" id="edit-profile-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box w-11/12 max-w-5xl">
          <label
            htmlFor="edit-profile-modal"
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
                    <span className="label-text">First Name</span>
                  </label>
                  <input
                    type="text"
                    placeholder="first name"
                    className="input input-bordered"
                    {...register("firstName")}
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Last Name</span>
                  </label>
                  <input
                    type="text"
                    placeholder="last name"
                    className="input input-bordered"
                    {...register("lastName")}
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Bio</span>
                  </label>
                  <input
                    type="text"
                    placeholder="bio"
                    className="input input-bordered"
                    {...register("bio")}
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
                    {...register("profilePic")}
                  />
                </div>

                <div className="form-control mt-6">
                  <button type="submit" className="btn btn-primary">
                    profile update
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

export default EditProfile;
