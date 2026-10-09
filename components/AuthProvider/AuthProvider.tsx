"use client";

import { useEffect } from "react";
import { checkSession, getMe } from "../../lib/api/clientApi";
import { useAuthStore } from "../../lib/store/authStore";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { setUser, clearIsAuthenticated } = useAuthStore();

  useEffect(() => {
    checkSession()
      .then((response) => {
        if (response.data.success) {
          return getMe().then(setUser);
        } else {
          clearIsAuthenticated();
        }
      })
      .catch(clearIsAuthenticated);
  }, [setUser, clearIsAuthenticated]);

  return <>{children}</>;
}
