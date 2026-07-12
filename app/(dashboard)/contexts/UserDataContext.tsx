"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState
} from "react";

interface User {
    id: number,
    email: string,
    avatar_url: string, 
}

const UserDataContext = createContext(null);

export function UserProvider({
  children,
}: {
  children: React.ReactNode;
}) {

  const [userData, setUserData] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);


  useEffect(() => {

     function loadUser() {
        console.log('utilizando provider')
    }
    loadUser();
  }, []);

  
  return (
    <UserDataContext.Provider
      value={{
        userData,
        setUserData,
        loading,
      }}
    >
      {children}
    </UserDataContext.Provider>
  );
}

export function useRequests() {
  return useContext(UserDataContext);
}