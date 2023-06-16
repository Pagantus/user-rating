import { IUserStorage } from 'application/ports';
import { IRequestConfig, IUserRepository } from 'domain/repositories/user';
import { ILogger } from 'infrastructure/logger/console';

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

  public async fetchUsers(config?: IRequestConfig): Promise<void> {
    this.logger.log('Запрос на получение списка пользователей');
    try {
      const users = await this.repository.getUserList(this.page, config);
      this.storage.setUsers(users);
    } catch (err) {
      const error = err as Error;
      this.logger.error(`Произошла ошибка при загрузке списка пользователей: ${error.message ?? error}`);
      throw error;
    }
  }

  public async loadMore(config?: IRequestConfig): Promise<void> {
    this.logger.log('Запрос на получение следующей страницы списка пользователей');
    try {
      this.page++;
      const users = await this.repository.getUserList(this.page, config);
      this.storage.addUsers(users);
    } catch (err) {
      this.page--;
      const error = err as Error;
      this.logger.error(
        `Произошла ошибка при получении следующей страницы списка пользователей: ${error.message ?? error}`
      );
      throw error;
    }
  }
}

export { UserListService };
