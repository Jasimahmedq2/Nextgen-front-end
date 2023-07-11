import FeedCard from "../../components/Home/feedCard";
import Feed from "../Home/feed";

const dummyData = [
  {
    _id: "1",
    name: "jasim ahmed",
    description:
      "  Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat voluptatibus deleniti reprehenderit, tempora, earum eaque cum deserunt quidem in consequuntur architecto, ratione magnam porro iusto eveniet ipsam! Neque, necessitatibus incidunt?",
    image: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
    createdAt: "2023-07-08T05:51:56.720+00:00",
  },
  {
    _id: "2",
    name: "jasim ahmed",
    description:
      "  Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat voluptatibus deleniti reprehenderit, tempora, earum eaque cum deserunt quidem in consequuntur architecto, ratione magnam porro iusto eveniet ipsam! Neque, necessitatibus incidunt?",
    image: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
    createdAt: "2023-07-08T05:51:56.720+00:00",
  },
  {
    _id: "3",
    name: "jasim ahmed",
    description:
      "  Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat voluptatibus deleniti reprehenderit, tempora, earum eaque cum deserunt quidem in consequuntur architecto, ratione magnam porro iusto eveniet ipsam! Neque, necessitatibus incidunt?",
    image: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
    createdAt: "2023-07-08T05:51:56.720+00:00",
  },
];

const Profile = () => {
  return (
    <div className="min-h-screen space-y-6 sm:space-y-0">
      <div className="w-11/12 sm:max-w-2xl bg-base-100 mt-6 sm:my-12 mx-auto p-4 rounded shadow">
        {/* Profile Header */}
        <div className="flex flex-col md:flex-row items-center mb-4">
          <img
            className="w-16 h-16 md:w-20 md:h-20 rounded-full mb-4 md:mb-0 mr-0 md:mr-4"
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            alt="Profile Picture"
          />
          <div>
            <h1 className="text-2xl md:text-3xl font-semibold">John Doe</h1>
          </div>
        </div>

        {/* Profile Stats */}
        <div className="flex flex-wrap justify-center md:justify-start mb-4">
          <div className="mr-4 mb-2 md:mb-0">
            <h2 className="font-semibold">Posts</h2>
            <p>100</p>
          </div>
          <div className="mr-4 mb-2 md:mb-0">
            <h2 className="font-semibold">Followers</h2>
            <p>10K</p>
          </div>
          <div>
            <h2 className="font-semibold">Following</h2>
            <p>500</p>
          </div>
        </div>

        {/* Profile Gallery */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4"></div>
      </div>
      <div className="w-11/12 sm:w-1/2 mx-auto">
        {dummyData.map((post) => (
          <FeedCard key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default Profile;
