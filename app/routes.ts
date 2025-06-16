// app/routes.ts
import { route } from "@react-router/dev/routes";

export default [
  route("login", "./routes/login.tsx"),
  route("/", "./routes/private-layout.tsx", [
    route("admin", "./routes/admin/admin-layout.tsx", [
      route("user-management", "./routes/admin/user-management.tsx"),
    ]),
    route("licensing", "./routes/licensing/licensing-layout.tsx", [
      route(
        "application-management",
        "./routes/licensing/application-management.tsx"
      ),
    ]),
  ]),
];
