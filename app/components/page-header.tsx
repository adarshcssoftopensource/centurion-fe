import React, { type JSX } from "react";
import pageHeaderBg from "~/assets/images/page-header-bg.png";

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
    "linear-gradient(to left, #7E1D20, rgba(153, 16, 18, 0.8) 100%)";

  return (
    <div
      className="relative w-full h-28 rounded-2xl overflow-hidden flex items-center px-6"
      style={{
        backgroundImage: `${gradient}, url(${pageHeaderBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
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
