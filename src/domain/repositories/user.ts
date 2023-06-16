import { IUser } from '../entities/user';

interface IRequestConfig {
  headers?: Record<string, string>;
  params?: Record<string, any>;
  signal?: AbortController['signal'];
}

interface IUserRepository {
  getUserList(page: number, config?: IRequestConfig): Promise<IUser[]>;
}

export type { IUserRepository, IRequestConfig };
