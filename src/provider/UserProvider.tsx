import { useUser } from "../hooks/quries/useUser";
import { UserContext } from "../hooks/useUserData";

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const { data: user } = useUser();

  return (
    <UserContext.Provider value={{ user: user ?? null }}>
      {children}
    </UserContext.Provider>
  );
};
