import { IUserStorage } from 'application/ports';
import { IRequestConfig, IUserRepository } from 'domain/repositories/user';
import { ILogger } from 'infrastructure/logger/console';
import { IUser, UserStatus } from '../../domain/entities/user';

class UserService {
  private logger: ILogger;
  private storage: IUserStorage;

  constructor(logger: ILogger, storage: IUserStorage) {
    this.logger = logger;
    this.storage = storage;
  }

  public increaseRating(user: IUser): void {
    this.logger.log(`${user.username}: +25 Social Credits. ПАРТИЯ ГОРДИТСЯ ТОБОЙ!`);
    if (user.rating >= 5) {
      throw new IncreaseRatingError(`Нужно вознаградить ${user.username}. Сделать это?`);
    }

    const rating = user.rating + 1;

    if (user.rating === 0) {
      this.storage.updateUser(user.id, { rating, status: UserStatus.POSITIVE });
    } else {
      this.storage.updateUser(user.id, { rating });
    }
  }

  public decreaseUserRating(user: IUser): void {
    this.logger.log(`${user.username}: -25 Social Credits. ПАРТИЯ РАЗОЧАРОВАНА!`);
    if (user.rating <= -4) {
      throw new DecreaseRatingError(`Пора забанить ${user.username}. Сделать это?`);
    }

    const rating = user.rating - 1;

    if (user.rating === 0) {
      this.storage.updateUser(user.id, { rating, status: UserStatus.NEGATIVE });
    } else {
      this.storage.updateUser(user.id, { rating });
    }
  }

  public rewardUser(user: IUser): void {
    this.logger.log(`${user.username}: Пользователь поощрен`);
    this.deleteUser(user);
  }

  public banUser(user: IUser): void {
    this.logger.log(`${user.username}: Пользователь забанен`);
    this.deleteUser(user);
  }

  public deleteUser(user: IUser): void {
    this.logger.log(`${user.username}: Пользователь удален`);
    this.storage.updateUser(user.id, { rating: 0, status: UserStatus.BASE });
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

class UserListService {
  private logger: ILogger;
  private storage: IUserStorage;
  private repository: IUserRepository;
  private page: number;

  constructor(logger: ILogger, repository: IUserRepository, storage: IUserStorage) {
    this.logger = logger;
    this.storage = storage;
    this.repository = repository;
    this.page = 1;
  }

  public async getUsers(config?: IRequestConfig): Promise<void> {
    this.logger.log('Запрос на получение списка пользователей');
    try {
      const users = await this.repository.getUserList(this.page, config);
      this.storage.setUsers(users);
      this.page++;
    } catch (err) {
      const error = err as Error;
      this.logger.error(`Произошла ошибка при загрузке списка пользователей: ${error.message ?? error}`);
      throw error;
    }
  }

  public async loadMore(config?: IRequestConfig): Promise<void> {
    this.logger.log('Запрос на получение следующей страницы списка пользователей');
    try {
      const users = await this.repository.getUserList(this.page, config);
      this.storage.addUsers(users);
      this.page++;
    } catch (err) {
      const error = err as Error;
      this.logger.error(
        `Произошла ошибка при получении следующей страницы списка пользователей: ${error.message ?? error}`
      );
      throw error;
    }
  }
}

export { UserService, UserListService, DecreaseRatingError, IncreaseRatingError };
