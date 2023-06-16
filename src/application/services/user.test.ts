import { UserService } from './user';
import { IUserStorage } from 'application/ports';
import { ILogger } from 'infrastructure/logger/console';
import { IUser, UserStatus } from '../../domain/entities/user';

describe('UserService', () => {
  let userService: UserService;
  let mockLogger: ILogger;
  let mockStorage: IUserStorage;
  let mockUser: IUser;

  beforeEach(() => {
    mockLogger = {
      log: jest.fn(),
      error: jest.fn()
    };

    mockStorage = {
      updateUser: jest.fn(),
      addUsers: jest.fn(),
      setUsers: jest.fn(),
      users: []
    };

    mockUser = {
      id: '1',
      username: 'user1',
      companyName: 'company1',
      rating: 0,
      status: UserStatus.BASE
    };

    userService = new UserService(mockLogger, mockStorage);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should increase user rating', () => {
    userService.increaseRating(mockUser);
    expect(mockLogger.log).toBeCalledWith('user1: +25 Social Credits. ПАРТИЯ ГОРДИТСЯ ТОБОЙ!');
    expect(mockStorage.updateUser).toBeCalledWith('1', { rating: 1, status: UserStatus.POSITIVE });
  });

  it('should throw an error when increasing user rating if rating >= 5', () => {
    mockUser.rating = 5;
    expect(() => userService.increaseRating(mockUser)).toThrow();
  });

  it('should decrease user rating', () => {
    userService.decreaseUserRating(mockUser);
    expect(mockLogger.log).toBeCalledWith('user1: -25 Social Credits. ПАРТИЯ РАЗОЧАРОВАНА!');
    expect(mockStorage.updateUser).toBeCalledWith('1', { rating: -1, status: UserStatus.NEGATIVE });
  });

  it('should throw an error when decreasing user rating if rating <= -4', () => {
    mockUser.rating = -4;
    expect(() => userService.decreaseUserRating(mockUser)).toThrow();
  });

  it('should reward user', () => {
    userService.rewardUser(mockUser);
    expect(mockLogger.log).toBeCalledWith('user1: Пользователь поощрен');
    expect(mockLogger.log).toBeCalledWith('user1: Пользователь удален');
    expect(mockStorage.updateUser).toBeCalledWith('1', { rating: 0, status: UserStatus.BASE });
  });

  it('should ban user', () => {
    userService.banUser(mockUser);
    expect(mockLogger.log).toBeCalledWith('user1: Пользователь забанен');
    expect(mockLogger.log).toBeCalledWith('user1: Пользователь удален');
    expect(mockStorage.updateUser).toBeCalledWith('1', { rating: 0, status: UserStatus.BASE });
  });
});
