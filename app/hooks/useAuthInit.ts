import { useEffect, useState } from "react";
import type { AuthUser } from "~/types/Auth";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";


export function useAuthInit() {
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    const token = Cookies.get("auth_token");
    console.log({ token });

    if (token) {
      try {
        const decoded = jwtDecode<AuthUser>(token);

        if (decoded?.name && decoded?.role) {
          setUser({ name: decoded.name, role: decoded.role });
        } else {
          localStorage.removeItem("token");
        }
      } catch (error) {
        localStorage.removeItem("token");
        console.log({ error });
      }
    }
  }, []);

  return { user, setUser };
}
