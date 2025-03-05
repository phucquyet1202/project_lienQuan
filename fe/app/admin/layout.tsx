import SideBar from "@/components/admin/asige/sideBar";
import { ReactNode } from "react";

const AdminLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex h-full bg-gray-100">
      {/* Sidebar */}
      <SideBar />
      {/* Main Content */}
      <main className="flex-1 p-6 bg-gray-50">{children}</main>
    </div>
  );
};

export default AdminLayout;
