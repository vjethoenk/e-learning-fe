import { callFetchAccount } from "@/services/api";
import { createContext, useContext, useEffect, useState } from "react";
import { FadeLoader } from "react-spinners";

interface IAppContext {
  isAuthenticated: boolean;
  setIsAuthenticated: (v: boolean) => void;
  user: IUser | null;
  setUser: (v: IUser | null) => void;
  isAppLoading: boolean;
  setIsAppLoading: (v: boolean) => void;
}
const CurrentAppContext = createContext<IAppContext | null>(null);
interface IProps {
  children: React.ReactNode;
}
//Tạo provider
const AppProvider = (props: IProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isAppLoading, setIsAppLoading] = useState<boolean>(true);
  const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {
    const fetchAccount = async () => {
      const res = await callFetchAccount();
      if (res.data) {
        setUser(res.data.user);
        setIsAuthenticated(true);
        console.log("jjglkjdolfjldskgjlfd", res.data.user);
      }
      setIsAppLoading(false);
    };

    fetchAccount();
  }, []);
  return (
    <>
      {isAppLoading === false ? (
        <CurrentAppContext.Provider
          value={{
            isAuthenticated,
            user,
            setIsAuthenticated,
            setUser,
            isAppLoading,
            setIsAppLoading,
          }}
        >
          {props.children}
        </CurrentAppContext.Provider>
      ) : (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
          }}
        >
          <FadeLoader></FadeLoader>
        </div>
      )}
    </>
  );
};
const useCurrentApp = () => {
  const currentAppContext = useContext(CurrentAppContext);

  if (!currentAppContext) {
    throw new Error(
      "useAppContext has to be used within <CurrentUserContext.Provider>"
    );
  }

  return currentAppContext;
};
export { AppProvider, useCurrentApp };
