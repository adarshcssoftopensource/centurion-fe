// app/routes/PrivateLayout.tsx
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import { useAuth } from "~/providers/AuthProvider";

export default function PrivateLayout() {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else {
      if (location.pathname === "/") {
        if (user.role === "admin") navigate("/admin/user-management");
        else if (user.role === "licensing")
          navigate("/licensing/application-management");
        else navigate("/login");
      }
    }
  }, [user, navigate]);

  if (!user) return null;

  return <Outlet />;
}
