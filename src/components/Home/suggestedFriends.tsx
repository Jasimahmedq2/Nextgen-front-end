const dummyData = [
  {
    _id: "1",
    username: "jasim ahmed",
    image: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
  },
  {
    _id: "2",
    username: "jasim ahmed",
    image: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
  },
  {
    _id: "3",
    username: "jasim ahmed",
    image: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
  },
];

const SuggestedFriends = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-2 font-bold space-y-4">
      <h2 className="text-xl sm:text-2xl ">Suggested Friends</h2>

      {dummyData?.map((suggest) => {
        return (
          <div className="flex items-center space-x-4 py-2 px-4 rounded-lg">
            <label className="btn  btn-circle avatar">
              <div className="w-10 rounded-full">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                  alt="suggested img"
                />
              </div>
            </label>
            <h4 className="text-lg font-bold">{suggest?.username}</h4>
          </div>
        );
      })}
    </div>
  );
};

export default SuggestedFriends;
