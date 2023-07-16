import Feed from "./feed";
import Friends from "../../components/Home/friends";
import SuggestedFriends from "../../components/Home/suggestedFriends";

const Index = () => {
  return (
    <div className="sm:w-[100%] sm:flex pt-8 space-y-6 sm:space-y-0 sm:pt-12 px-4 sm:px-12">
      <div className="sm:w-[25%] hidden sm:block sm:mr-6">
        <SuggestedFriends />
      </div>
      <div className="sm:w-[50%]">
        <Feed />
      </div>

      <div className="sm:w-[25%] hidden sm:block sm:ml-6">
        <Friends />
      </div>
    </div>
  );
};

export default Index;
