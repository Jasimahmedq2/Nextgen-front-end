import CreatePost from "../../components/Home/createPost";
import FeedCard from "../../components/Home/feedCard";
import { IPost } from "../../interfaces/post/postInterfaces";

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

const Feed = () => {
  return (
    <div className="space-x-6 space-y-4 sm:space-y-8">
      <CreatePost />
      <div>
        {dummyData.map((post) => (
          <FeedCard post={post} />
        ))}
      </div>
    </div>
  );
};

export default Feed;
