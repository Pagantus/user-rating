import { IUser, UserStatus } from '../../domain/entities/user';
import { v4 as uuid } from 'uuid';
import { UserDTO } from '../dto/user';

class UserMapper {
  public static fromDTO(dto: UserDTO): IUser {
    return {
      id: uuid(),
      username: dto.username,
      companyName: dto.company.name,
      rating: 0,
      status: UserStatus.BASE
    };
  }
}

export { UserMapper };
