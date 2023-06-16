import axios from 'axios';
import { IRequestConfig } from 'domain/repositories/user';
import { IHttpService } from './base';

class AxiosHttpService implements IHttpService {
  public async get<T>(url: string, config?: IRequestConfig): Promise<T> {
    const response = await axios.get(url, config);
    return response.data;
  }

  public async post<T>(url: string, data?: any, config?: IRequestConfig): Promise<T> {
    const response = await axios.post(url, data, config);
    return response.data;
  }
}

export { AxiosHttpService };
