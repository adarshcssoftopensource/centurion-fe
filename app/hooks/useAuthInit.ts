import { useState } from "react";
import type { AuthUser } from "~/types/Auth";

export function useAuthInit() {
  const [user, setUser] = useState<AuthUser | null>({
    name: "test",
    role: "admin",
  });

  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   if (token) {
  //     try {
  //       const decoded = jwtDecode<AuthUser>(token);
  //       if (decoded && decoded.role && decoded.name) {
  //         setUser({ name: decoded.name, role: decoded.role });
  //       } else {
  //         localStorage.removeItem("token");
  //       }
  //     } catch {
  //       localStorage.removeItem("token");
  //     }
  //   }
  // }, []);

  return { user, setUser };
}
