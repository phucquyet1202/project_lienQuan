"use client";
import { adminConfig } from "@/config/site";
import { Button } from "@heroui/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

const SideBar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname(); // Lấy đường dẫn hiện tại

  return (
    <aside
      className={`bg-white p-5 transition-all shadow-lg ${
        collapsed ? "w-20" : "w-72"
      }`}
    >
      {/* Toggle Button */}
      <Button
        onClick={() => setCollapsed(!collapsed)}
        className="mb-4 flex items-center justify-center p-2 rounded-lg hover:bg-gray-200"
      >
        {/* Icon Toggle */}
        {collapsed ? "🔄" : "🔽"} {/* Placeholder icon */}
      </Button>

      {/* Navigation */}
      <div className="flex flex-col">
        {adminConfig.navItems.map((item) => (
          <Link key={item.href} href={item.href}>
            <Button
              fullWidth
              variant="light"
              className={`justify-start px-4 text-left py-4 border-b-2 border-gray-300 font-medium flex items-center gap-3
                ${
                  pathname === item.href
                    ? "bg-blue-500 text-white font-bold"
                    : "hover:bg-blue-100"
                }`}
              style={{ border: "none" }} // Ẩn border của button
            >
              {/* Hiển thị icon nếu collapsed, ngược lại hiển thị label */}
              {collapsed ? (
                <span className="text-xl ml-[-4px]">{item.icon}</span> // Giả sử item.icon chứa icon
              ) : (
                <>
                  <span className="text-xl">{item.icon}</span>
                  <span>{item.label}</span>
                </>
              )}
            </Button>
          </Link>
        ))}
      </div>
    </aside>
  );
};

export default SideBar;
