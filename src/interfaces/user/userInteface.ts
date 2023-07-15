export interface IUser {
  _id: string;
  name: {
    firstName: string;
    lastName: string;
  };
  email: string;
  role: string;
  profilePic?: string;
  bio?: string;
  followers: string;
  following: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}
