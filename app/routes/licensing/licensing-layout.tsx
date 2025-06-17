import { Outlet } from 'react-router';
import RoleGuardLayout from '../role-guard-layout';

export default function LicensingLayout() {
  return (
    <RoleGuardLayout allowedRoles={['licensing']}>
      <Outlet />
    </RoleGuardLayout>
  );
}
