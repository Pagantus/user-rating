import { UserStorage } from 'application/ports';
import { create } from 'zustand';

export const useUserStore = create<UserStorage>((set) => ({
  users: [],
  setUsers: (users) => {
    set({ users });
  },
  addUsers: (users) => {
    set((state) => ({ users: [...state.users, ...users] }));
  },
  updateUser: (userId, userData) => {
    set((state) => ({ users: state.users.map((user) => (user.id === userId ? { ...user, ...userData } : user)) }));
  }
}));
