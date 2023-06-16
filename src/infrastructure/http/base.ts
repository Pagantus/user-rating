import { IRequestConfig } from 'domain/repositories/user';

interface IHttpService {
  get<T>(url: string, config?: IRequestConfig): Promise<T>;
  post<T>(url: string, data?: any, config?: IRequestConfig): Promise<T>;
}

export type { IHttpService };
