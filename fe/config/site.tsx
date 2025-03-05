import {
  AiOutlineComment,
  AiOutlineFileDone,
  AiOutlineHistory,
  AiOutlineThunderbolt,
  AiOutlineUser,
  AiTwotoneDashboard,
  AiTwotoneFileImage,
  AiTwotoneFolder,
  AiTwotoneFolderOpen,
} from "react-icons/ai";
import { GiEcology } from "react-icons/gi";
export type SiteConfig = typeof siteConfig;
export type AdminConfig = typeof adminConfig;

export const siteConfig = {
  name: "Shop Bán Accgame Uy tín",
  description: "Make beautiful websites regardless of your design experience.",
  navItems: [
    {
      label: "Trang chủ",
      href: "/",
    },
    {
      label: "Danh mục",
      href: "/cate",
    },
    {
      label: "Nạp thẻ",
      href: "/abc",
    },
    {
      label: "Lịch sử",
      href: "/blog",
    },
  ],
  navMenuItems: [
    {
      label: "Profile",
      href: "/profile",
    },
    {
      label: "Dashboard",
      href: "/dashboard",
    },
    {
      label: "Projects",
      href: "/projects",
    },
    {
      label: "Team",
      href: "/team",
    },
    {
      label: "Calendar",
      href: "/calendar",
    },
    {
      label: "Settings",
      href: "/settings",
    },
    {
      label: "Help & Feedback",
      href: "/help-feedback",
    },
    {
      label: "Logout",
      href: "/logout",
    },
  ],
  links: {
    github: "https://github.com/nextui-org/nextui",
    twitter: "https://twitter.com/getnextui",
    docs: "https://nextui.org",
    discord: "https://discord.gg/9b6yyZKmH4",
    sponsor: "https://patreon.com/jrgarciadev",
  },
};

export const adminConfig = {
  name: "Shop Bán Accgame Uy tín",
  description: "Make beautiful websites regardless of your design experience.",
  navItems: [
    {
      icon: <AiTwotoneDashboard />,
      label: "Dashboard",
      href: "/admin/dashboard",
    },
    {
      icon: <AiTwotoneFolder />,
      label: "Category Management",
      href: "/admin/cate",
    },
    {
      icon: <AiTwotoneFolderOpen />,
      label: "Subcategory Management",
      href: "/admin/subcate",
    },
    {
      icon: <GiEcology />,
      label: "Accgame Management",
      href: "/admin/accgame",
    },
    {
      icon: <AiOutlineFileDone />,
      label: "Log Acc Management",
      href: "/admin/logacc",
    },
    {
      icon: <AiOutlineUser />,
      label: "User Management",
      href: "/admin/user",
    },
    {
      icon: <AiOutlineComment />,
      label: "review Management",
      href: "/admin/review",
    },
    {
      icon: <AiOutlineThunderbolt />,
      label: "Flash Sale Management",
      href: "/admin/flashsell",
    },
    {
      icon: <AiTwotoneFileImage />,
      label: "LayOut and Banner Management",
      href: "/admin/layout",
    },
    {
      icon: <AiOutlineHistory />,
      label: "History Management",
      href: "/admin/history",
    },
  ],
  navMenuItems: [
    {
      label: "Profile",
      href: "/profile",
    },
    {
      label: "Dashboard",
      href: "/dashboard",
    },
    {
      label: "Projects",
      href: "/projects",
    },
    {
      label: "Team",
      href: "/team",
    },
    {
      label: "Calendar",
      href: "/calendar",
    },
    {
      label: "Settings",
      href: "/settings",
    },
    {
      label: "Help & Feedback",
      href: "/help-feedback",
    },
    {
      label: "Logout",
      href: "/logout",
    },
  ],
  links: {
    github: "https://github.com/nextui-org/nextui",
    twitter: "https://twitter.com/getnextui",
    docs: "https://nextui.org",
    discord: "https://discord.gg/9b6yyZKmH4",
    sponsor: "https://patreon.com/jrgarciadev",
  },
};
