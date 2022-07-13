import { createContext } from "react";

export const AuthContext = createContext({
  isLoggedIn: false,
  userid: null,
  token: null,
  userName: null,
  login: () => {},
  logout: () => {},
});
