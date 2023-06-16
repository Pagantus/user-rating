import { UserListService, UserService } from 'application/services/user';
import { ApiUserRepository } from 'infrastructure/api/user';
import { AxiosHttpService } from 'infrastructure/http/axios';
import { Logger } from 'infrastructure/logger/console';
import React from 'react';
import { useUserStore } from '../state';

type UserServicesType = {
  userService: UserService;
  userListService: UserListService;
};

const UserServices = React.createContext<UserServicesType>(null!);

const useUserServices = () => React.useContext(UserServices);

type ServiceContextProviderProps = {
  children: React.ReactNode;
};

const UserServicesProvider: React.FC<ServiceContextProviderProps> = ({ children }) => {
  const http = new AxiosHttpService();
  const logger = new Logger();
  const storage = useUserStore();
  const repository = new ApiUserRepository(http);

  const services: UserServicesType = {
    userService: new UserService(logger, storage),
    userListService: new UserListService(logger, repository, storage)
  };

  return <UserServices.Provider value={services}>{children}</UserServices.Provider>;
};

export { useUserServices, UserServicesProvider };
