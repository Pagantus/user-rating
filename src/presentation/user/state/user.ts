import { IUserStorage } from 'application/ports';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export const useUserStore = create<IUserStorage>()(
  persist(
    (set) => ({
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
    }),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => localStorage)
    }
  )
);
