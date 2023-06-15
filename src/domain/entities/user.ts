enum UserStatus {
  BASE,
  POSITIVE,
  NEGATIVE
}

interface IUser {
  id: number;
  username: string;
  companyName: string;
  rating: number;
  status: UserStatus;
}

export { UserStatus };
export type { IUser };
