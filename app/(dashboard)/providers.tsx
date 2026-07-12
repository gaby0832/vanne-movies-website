"use client";

import { AuthProvider } from "./contexts/AuthContext";
import { UserProvider } from "./contexts/UserDataContext";

export default function Providers({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <UserProvider>
        {children}
      </UserProvider>
    </AuthProvider>
  );
}