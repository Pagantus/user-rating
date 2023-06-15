import { IUser } from '../../domain/entities/user';
import { UserDTO } from '../dto/user';

class UserMapper {
  public static fromDTO(dto: UserDTO): IUser {
    return {
      id: dto.id,
      username: dto.username,
      companyName: dto.company.name,
      rating: 0
    };
  }
}

export { UserMapper };
