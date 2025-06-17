export { default as UsersIconRound } from './user';
export { default as MultiFactorIcon } from './multi-factor';
export { default as SmsCodeIcon } from './sms-code';
export { default as EmailIcon } from './email';
export { default as VerificationIcon } from './verification-icon';
export { default as CollapseIcon } from './collapse';
export { default as AdminDashboardIcon } from './admin-dashboard';
export { default as UserManagementIcon } from './user-management';
export { default as SecuritySettingsIcon } from './secuity-settings';
export { default as LogManagementIcon } from './log-management';
export { default as NotificationsIcon } from './notifications';
export { default as LogoutIcon } from './logout';
export { default as CollapseCloseIcon } from './collapse-close';
export { default as UserManagementDashboardIcon } from './user-management-dashboard';

import type { SVGProps } from 'react';

export type SVG = {
  svgProps?: SVGProps<SVGSVGElement>;
  pathProps?: SVGProps<SVGPathElement>;
};
