/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import CreatePost from "../../components/Home/createPost";
import FeedCard from "../../components/Home/feedCard";
import { IPost } from "../../interfaces/post/postInterfaces";
import { useGetPostsQuery } from "../../redux/features/post/postApiSlice";

const Feed = () => {
  const { data } = useGetPostsQuery(undefined, {
    refetchOnMountOrArgChange: true,
    pollingInterval: 30000,
  });
  console.log({ data });
  return (
    <div className="space-x-6 space-y-4 sm:space-y-8">
      <CreatePost />
      <div>
        {data?.data?.map((post: IPost) => (
          <FeedCard post={post} />
        ))}
      </div>
    </div>
  );
};

export default Feed;
