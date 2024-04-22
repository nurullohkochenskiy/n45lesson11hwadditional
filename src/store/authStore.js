import create from "zustand";

export const useAuthStore = create((set) => ({
  user: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null,
  login: (user) =>
    set((state) => {
      localStorage.setItem("user", JSON.stringify(user));
      return { authState: { ...state.authState, user } };
    }),

  logout: () =>
    set((state) => {
      localStorage.removeItem("user");
      localStorage.removeItem("teachers");
      localStorage.removeItem("students");
      return { authState: { ...state.authState, user: null } };
    }),
}));

export default useAuthStore;
