import { UserListService, UserService } from 'application/services/user';
import { ApiUserRepository } from 'infrastructure/api/user';
import { Logger } from 'infrastructure/logger/console';
import React from 'react';
import { useUserStore } from '../state';

type UserServicesType = {
  userService: UserService;
  userListService: UserListService;
};

const UserServices = React.createContext<UserServicesType>(null!);

const useUserServices = React.useContext(UserServices);

type ServiceContextProviderProps = {
  children: React.ReactNode;
};

const ServiceContextProvider: React.FC<ServiceContextProviderProps> = ({ children }) => {
  const logger = new Logger();
  const storage = useUserStore();
  const repository = new ApiUserRepository();

  const services: UserServicesType = {
    userService: new UserService(logger, storage),
    userListService: new UserListService(logger, repository, storage)
  };

  return <UserServices.Provider value={services}>{children}</UserServices.Provider>;
};

export { useUserServices, ServiceContextProvider };
