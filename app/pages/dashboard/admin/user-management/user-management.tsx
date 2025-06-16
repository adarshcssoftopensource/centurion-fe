import React from "react";
import { UserManagementDashboardIcon } from "~/assets/icons";
import PageHeader from "~/components/page-header";
import { UserList } from "./components";

const UserManagement = () => {
  return (
    <div>
      <PageHeader
        title="User Management"
        icon={<UserManagementDashboardIcon />}
        gradientColor="linear-gradient(to right, rgba(101, 22, 20, 0.8) 0%, rgba(153, 16, 18, 0.8) 100%)"
      />
      <UserList />
    </div>
  );
};

export default UserManagement;
