import { IUser } from 'domain/entities/user';

interface UserStorage {
  users: IUser[];
  setUsers: (users: IUser[]) => void;
  addUsers: (users: IUser[]) => void;
  updateUser: (userId: IUser['id'], userData: Partial<Omit<IUser, 'id'>>) => void;
}

export type { UserStorage };
