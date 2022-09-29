import create from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";
import { BASE_URL } from "../utils";

const authStore = (set: any) => ({
  userProfile: null,
  allUsers: [],
  topics: [],

  //Note user is coming from utils/index.ts folder that was created

  //User is added and stored. It works like localStorage
  addUser: (user: any) => set({ userProfile: user }),

  //To remove user
  removeUser: () => set({ userProfile: null }),

  //To fetch all Users
  fetchAllUsers: async () => {
    const response = await axios.get(`https://api.teammato.com/api/v1/users/`);

    set({ allUsers: response.data });
  },

  // to fetch all tags
  fetchAllTags: async () => {
    const response = await axios.get(`https://api.teammato.com/api/v1/tags/`);

    set({ topics: response.data });
  },

  discoverAllUsers: async () => {
    const response = await axios.get(
      `https://api.teammato.com/api/users/discover/`
    );
    set({ allUsers: response.data });
  },
});

const useAuthStore = create(
  persist(authStore, {
    name: "auth",
  })
);

export default useAuthStore;
