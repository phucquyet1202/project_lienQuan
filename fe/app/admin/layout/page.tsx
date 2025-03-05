import Banner from "@/components/admin/banner/banner";
import Layout from "@/components/admin/layout/layout";
import React from "react";

type Props = {};

const LayoutPage = (props: Props) => {
  return (
    <>
      <div>
        <h2 className="My-6">Ảnh layOut</h2>
        <Layout />
      </div>
      <div className="mt-8">
        <h2 className="My-6">Ảnh banner</h2>
        <Banner />
      </div>
    </>
  );
};

export default LayoutPage;
