import { createContext } from "react";

const initializeUser = () => {
  const storedUser = window.localStorage.getItem('user')
  if (storedUser) {
    return storedUser
  }
  return null
}

const authContext = createContext({
  user: initializeUser(),
  setUser: (user) => {}
});

export default authContext;