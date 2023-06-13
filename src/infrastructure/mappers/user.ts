import { IUser, User } from '../../domain/entities/user';
import { UserDTO } from '../dto/user';

class UserMapper {
  public static fromDTO(dto: UserDTO): IUser {
    return new User(dto.id, dto.username, dto.company.name);
  }
}

export { UserMapper };
