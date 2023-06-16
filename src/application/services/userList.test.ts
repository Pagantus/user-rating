import { IUserStorage } from 'application/ports';
import { IUserRepository } from 'domain/repositories/user';
import { ILogger } from 'infrastructure/logger/console';
import { UserListService } from './userList';

describe('UserListService', () => {
  let service: UserListService;
  let logger: ILogger;
  let repository: IUserRepository;
  let storage: IUserStorage;

  beforeEach(() => {
    logger = {
      log: jest.fn(),
      error: jest.fn()
    };

    repository = {
      getUserList: jest.fn()
    };

    storage = {
      setUsers: jest.fn(),
      addUsers: jest.fn(),
      updateUser: jest.fn(),
      users: []
    };

    service = new UserListService(logger, repository, storage);
  });

  test('fetchUsers should get users and set them in storage', async () => {
    const users = [
      { id: 1, name: 'John' },
      { id: 2, name: 'Doe' }
    ];
    (repository.getUserList as jest.Mock).mockResolvedValue(users);

    await service.fetchUsers();

    expect(repository.getUserList).toHaveBeenCalledWith(1, undefined);
    expect(storage.setUsers).toHaveBeenCalledWith(users);
  });

  test('fetchUsers should log and throw an error when getUserList fails', async () => {
    const error = new Error('Failed to get users');
    (repository.getUserList as jest.Mock).mockRejectedValue(error);

    await expect(service.fetchUsers()).rejects.toThrow(error);
    expect(logger.error).toHaveBeenCalledWith(
      `Произошла ошибка при загрузке списка пользователей: ${error.message ?? error}`
    );
  });

  test('loadMore should get next page of users and add them in storage', async () => {
    const users = [
      { id: 3, name: 'Jane' },
      { id: 4, name: 'Smith' }
    ];
    (repository.getUserList as jest.Mock).mockResolvedValue(users);

    await service.loadMore();

    expect(repository.getUserList).toHaveBeenCalledWith(2, undefined);
    expect(storage.addUsers).toHaveBeenCalledWith(users);
  });

  test('loadMore should log and throw an error when getUserList fails', async () => {
    const error = new Error('Failed to get more users');
    (repository.getUserList as jest.Mock).mockRejectedValue(error);

    await expect(service.loadMore()).rejects.toThrow(error);
    expect(logger.error).toHaveBeenCalledWith(
      `Произошла ошибка при получении следующей страницы списка пользователей: ${error.message ?? error}`
    );
  });
});
