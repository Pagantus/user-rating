import { IUser } from '../entities/user';

interface IUserRepository {
  getUserList(page: number): Promise<IUser[]>;
}

export type { IUserRepository };
