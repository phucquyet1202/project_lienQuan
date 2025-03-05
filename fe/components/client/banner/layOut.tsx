"use client";

import { Button } from "@nextui-org/button";
import { Card } from "@nextui-org/react";
import React, { useState } from "react";
import CusstomTable from "./table";
import CusstomCard from "./card";
import "../../../styles/banner.css";

type Props = {};

const Banner = (props: Props) => {
  const [show, setShow] = useState(0);

  return (
    <div className="w-full px-4">
      {/* Banner và Nội dung */}
      <div className="flex flex-col lg:flex-row-reverse lg:justify-between lg:items-center gap-8 my-8 w-full">
        {/* Ảnh Banner */}
        <div className="w-full lg:w-2/3 lg:h-[420px]">
          <img
            src="/banner.jpg"
            className="image rounded object-cover mx-auto"
            alt="Banner"
          />
        </div>

        {/* Nội dung */}
        <div className="lg:w-1/3 flex flex-col items-center lg:items-start">
          {/* Nút chọn */}
          <div className="flex gap-4 justify-center lg:justify-start mt-4 lg:mt-[-160px] lg:mx-8">
            <Button
              onClick={() => setShow(0)}
              className={`w-full lg:w-auto ${
                show === 0 ? "bg-primary text-white" : ""
              }`}
            >
              Top Tháng
            </Button>
            <Button
              onClick={() => setShow(1)}
              className={`w-full lg:w-auto ${
                show === 1 ? "bg-primary text-white" : ""
              }`}
            >
              Nạp thẻ
            </Button>
          </div>

          {/* Nội dung hiển thị */}
          <div className="mt-5 w-full overflow-x-auto">
            <Card className="p-4 w-full">
              {show === 0 ? <CusstomTable /> : <CusstomCard />}
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
