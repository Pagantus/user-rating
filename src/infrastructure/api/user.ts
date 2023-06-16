import { IHttpService } from 'infrastructure/http/base';
import { IUser } from '../../domain/entities/user';
import { IRequestConfig, IUserRepository } from '../../domain/repositories/user';
import { UserDTO } from '../dto/user';
import { UserMapper } from '../mappers/user';

const URL = 'https://jsonplaceholder.typicode.com/users';

class ApiUserRepository implements IUserRepository {
  private http: IHttpService;

  constructor(http: IHttpService) {
    this.http = http;
  }

  public async getUserList(page: number, config?: IRequestConfig): Promise<IUser[]> {
    const response = await this.http.get<UserDTO[]>(URL, { params: { page }, ...config });
    return response.map(UserMapper.fromDTO);
  }
}

export { ApiUserRepository };
