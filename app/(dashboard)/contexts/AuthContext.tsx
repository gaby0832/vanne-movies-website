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

const AuthContext = createContext(null);

export function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

const login = async (email: string, password: string, turnstileToken:string) => {
  try{
  
  setLoading(true)
  const response = await fetch("/api/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
      turnstileToken
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error);
  }

  // Busca o usuário autenticado
  const me = await fetch("/api/users/me");
  const user = await me.json();

  console.log(user)
  setUser(user);
  } catch(err) {

  } finally {
    setLoading(false)
  }
};

  const logout = async () => {
  await fetch("/api/users/logout", {
    method: "POST",
  });

  setUser(null);
};


  useEffect(() => {

     async function loadUser() {

      const res = await fetch("/api/users/me");

      const data = await res.json();

      await console.log(data)

      setUser(data);

      setLoading(false);


    }
    loadUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        loading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}