import { createContext, useContext } from "react";
import { UserResponse } from "../types/user";

export const UserContext = createContext<{
  user: UserResponse | null;
}>({
  user: null,
});

export const useUserData = () => useContext(UserContext);
