import { Outlet } from "@remix-run/react";
import React from "react";

type Props = {};

const Layout = (props: Props) => {
  return (
    <div>
      Layout
      <Outlet />
    </div>
  );
};

export default Layout;
