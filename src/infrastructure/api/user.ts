import axios from 'axios';
import { IUser } from '../../domain/entities/user';
import { IUserRepository } from '../../domain/repositories/user';
import { UserDTO } from '../dto/user';
import { UserMapper } from '../mappers/user';

const URL = 'https://jsonplaceholder.typicode.com/users';

class ApiUserRepository implements IUserRepository {
  public async getUserList(page: number): Promise<IUser[]> {
    const response = await axios.get<UserDTO[]>(URL, { params: { page } });
    return response.data.map(UserMapper.fromDTO);
  }
}

export { ApiUserRepository };
