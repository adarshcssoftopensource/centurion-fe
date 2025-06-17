import React, { type JSX } from 'react';
import pageHeaderBg from '~/assets/images/page-header-bg.png';

const PageHeader = ({
  title,
  icon,
  gradientColor,
}: {
  title: string;
  icon: JSX.Element;

  gradientColor?: string;
}) => {
  const gradient =
    gradientColor ||
    'linear-gradient(to right, rgba(103, 21, 19, 0.90) 0.38%, rgba(171, 14, 16, 0.90) 99.97%)';

  return (
    <div
      className="relative w-full h-28 rounded-2xl overflow-hidden flex items-center px-6"
      style={{
        backgroundImage: `${gradient}, url(${pageHeaderBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="relative z-10 flex items-center gap-3 text-white font-semibold text-lg">
        {icon}
        {title}
      </div>
    </div>
  );
};

export default PageHeader;
