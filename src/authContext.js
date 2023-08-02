import { createContext } from "react";

const authContext = createContext({
  user: null,
  setUser: (user) => {}
});

export default authContext;