export interface IPost {
  _id: string;
  user: {
    _id?: string;
    name?: {
      firstName?: string;
      lastName?: string;
    };
    role?: string;
    email?: string;
    profilePic?: string;
  };
  comments: {
    length: number;
    _id?: string;
    name?: {
      firstName?: string;
      lastName?: string;
    };
    text?: string;
    profilePic?: string;
  };
  caption?: string;
  likes: string[];
  name: string;
  following: string[];
  followers: string[];
  image?: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}
