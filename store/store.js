import { create } from 'zustand';

export const useUserStore = create((set) => ({
  user: null,
  email: null,
  allFriends: [],
  nearbyFriends: [],
  setUser: (user) => set({ user }),
  setUserEmail: (email) => set({ email }),
  setAllFriends: (allFriends) => set({ allFriends }),
  setNearbyFriends: (nearbyFriends) => set({ nearbyFriends }),
}));

export const useLocationStore = create((set) => ({
  location: null,
  setLocation: (location) => set({ location }),
  radius: 1609,
  setRadius: (radius) => set({ radius }),
  // error: null,
  // setError: (error) => set({ error }),
}));
