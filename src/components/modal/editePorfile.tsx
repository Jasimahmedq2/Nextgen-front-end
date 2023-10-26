/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { SubmitHandler, useForm } from "react-hook-form";
import { useUpdateUserMutation } from "../../redux/features/auth/userApi";
import { useAppSelector } from "@/redux/hooks";
import { useEffect } from "react";

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
  console.log({ editProfileModal });
  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm<IPostEdit>();

  const { isDark } = useAppSelector((state) => state.user);

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
  };

  useEffect(() => {
    reset({
      firstName: editProfileModal?.name?.firstName,
      lastName: editProfileModal?.name?.lastName,
      bio: editProfileModal?.bio,
      profilePic: editProfileModal?.profilePic
    });
  }, [editProfileModal, reset, setEditeProfileModal]);

  return (
    <div>
      <input type="checkbox" id="edit-profile-modal" className="modal-toggle" />
      <div className="modal">
        <div
          className={`modal-box w-11/12 sm:w-1/3 ${
            isDark ? "bg-[#15292B] text-white" : "bg-[#eceef4]"
          }  max-w-5xl`}
        >
          <label
            htmlFor="edit-profile-modal"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>

          <h3 className="font-bold text-lg py-4">Edit Profile</h3>

          <div
            className={`card flex-shrink-0 w-full max-w-sm shadow-2xl ${
              isDark ? "bg-[#253C42] text-white" : "bg-base-100"
            }  mx-auto`}
          >
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="card-body">
                <div className="form-control">
                  <label className="label">
                    <span
                      className={`label-text ${isDark ? "text-white" : ""}`}
                    >
                      First Name
                    </span>
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
                    <span
                      className={`label-text ${isDark ? "text-white" : ""}`}
                    >
                      Last Name
                    </span>
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
                    <span
                      className={`label-text ${isDark ? "text-white" : ""}`}
                    >
                      Bio
                    </span>
                  </label>
                  <textarea    
                    placeholder="bio"
                    className="input input-bordered h-20 resize-none"
                    {...register("bio")}
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span
                      className={`label-text ${isDark ? "text-white" : ""}`}
                    >
                      Image
                    </span>
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
