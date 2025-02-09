import { Link, useLocation } from "react-router-dom";
import HomeIcon from "@/assets/icon/layout/home.svg?react";
import GroupIcon from "@/assets/icon/layout/group.svg?react";
import ScrapIcon from "@/assets/icon/layout/scrap.svg?react";
import NoticeIcon from "@/assets/icon/layout/notice.svg?react";
import LogoImage from "@/assets/image/nav-logo.png";

export default function NavigationBar() {
  const { pathname } = useLocation();

  const iconStyle = "size-10";

  const menuList = [
    {
      title: "홈화면 이동",
      to: "/",
      icon: (
        <HomeIcon
          className={`${iconStyle} ${
            pathname === "/" ? "fill-normalViolet" : "fill-darkGray-active"
          }`}
        />
      ),
    },
    {
      title: "그룹 이동",
      to: "/group",
      icon: (
        <GroupIcon
          className={`${iconStyle} ${
            pathname === "/group"
              ? "stroke-normalViolet [&>path:first-child]:fill-normalViolet"
              : "stroke-darkGray-active [&>path:first-child]:fill-darkGray-active"
          }`}
        />
      ),
    },
    {
      title: "스크랩 이동",
      to: "/scrap",
      icon: (
        <ScrapIcon
          className={`${iconStyle} ${
            pathname === "/scrap"
              ? "stroke-normalViolet [&>path:first-child]:fill-normalViolet"
              : "stroke-darkGray-active [&>path:first-child]:fill-darkGray-active"
          }`}
        />
      ),
    },
    {
      title: "공지사항 이동",
      to: "/notice",
      icon: (
        <NoticeIcon
          className={`${iconStyle} size-9 ${
            pathname === "/notice"
              ? "stroke-normalViolet [&>path:first-child]:fill-normalViolet"
              : "stroke-darkGray-active [&>path:first-child]:fill-darkGray-active"
          }`}
        />
      ),
    },
  ];

  return (
    <nav className="sticky top-[60px] flex h-[100vh] min-w-[130px] flex-col items-center justify-between px-5 pb-[4%]">
      <ul className="flex w-[62px] flex-col items-center justify-center gap-y-[5vh] rounded-[20px] bg-white px-4 pb-28 pt-5 shadow-lg">
        <img src={LogoImage} alt="Logo" />
        {menuList.map((menu) => (
          <li key={menu.title}>
            <Link
              to={menu.to}
              title={menu.title}
              className="flex size-10 items-center justify-center"
            >
              {menu.icon}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
