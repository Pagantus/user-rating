enum UserStatus {
  BASE,
  POSITIVE,
  NEGATIVE
}

interface IUser {
  id: string;
  username: string;
  companyName: string;
  rating: number;
  status: UserStatus;
}

export { UserStatus };
export type { IUser };
