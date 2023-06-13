import { IUser } from '../../domain/entities/user';

class UserService {
  public increaseRating(user: IUser) {
    if (user.rating >= 5) {
      throw new IncreaseRatingError(`Нужно вознаградить ${user.username}. Сделать это?`);
    }
    user.rating += 1;
  }

  public decreaseUserRating(user: IUser): void {
    if (user.rating <= -4) {
      throw new DecreaseRatingError(`Пора забанить ${user.username}. Сделать это?`);
    }

    user.rating -= 1;
  }
}

class IncreaseRatingError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'IncreaseRatingError';
  }
}

class DecreaseRatingError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'DecreaseRatingError';
  }
}

export { UserService };
