import { create } from 'zustand';

export const useUserStore = create((set) => ({
  user: null,
  email: null,
  id: null,
  allFriends: [],
  nearbyFriends: [],
  allUsers: [],
  setUser: (user) => set({ user }),
  setUserEmail: (email) => set({ email }),
  setUserId: (id) => set({ id }),
  setAllFriends: (allFriends) => set({ allFriends }),
  setNearbyFriends: (nearbyFriends) => set({ nearbyFriends }),
  setAllUsers: (allUsers) => set({ allUsers }),
}));

export const useLocationStore = create((set) => ({
  location: null,
  setLocation: (location) => set({ location }),
  radius: 1609,
  setRadius: (radius) => set({ radius }),
  // error: null,
  // setError: (error) => set({ error }),
}));
