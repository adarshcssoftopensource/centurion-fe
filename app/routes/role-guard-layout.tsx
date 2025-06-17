import { useEffect, type PropsWithChildren } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '~/providers/AuthProvider';

type RoleGuardLayoutProps = {
  allowedRoles: string[]; // e.g. ['admin'] or ['licensing']
};

export default function RoleGuardLayout({
  allowedRoles,
  children,
}: PropsWithChildren<RoleGuardLayoutProps>) {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login', { replace: true });
    } else if (!allowedRoles.includes(user.role)) {
      navigate('/login', { replace: true });
    }
  }, [user, navigate, allowedRoles]);

  if (!user || !allowedRoles.includes(user.role)) return null;

  return children;
}
