"use client";
import { Button } from "@heroui/react";
import { Card, CardBody, CardHeader, Image } from "@nextui-org/react";
import Link from "next/link";
import React from "react";
import "../../../styles/customCard.css";

type Props = {};

const ListSubCate = (props: Props) => {
  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 xl:mt-40 card">
        <Card className="py-4">
          <Link href={"/123"}>
            <CardHeader className="pb-0 pt-2 px-4 flex-col items-center">
              <Image
                alt="Card background"
                className="object-cover rounded-xl"
                src="https://heroui.com/images/hero-card-complete.jpeg"
                width={270}
              />
            </CardHeader>
            <CardBody className="overflow-visible py-2 text-center flex flex-col items-center">
              <h4 className="font-bold text-large">Acc Vip 50K</h4>
              <p className="">Số lượng: 20</p>
              <small className="text-default-600">Đã bán: 100</small>
              <Button
                className="mt-4 w-2/3 text-sm font-medium text-center transition-all whitespace-nowrap whitespace-normal-sm"
                color="primary"
              >
                Xem chi tiết
              </Button>
            </CardBody>
          </Link>
        </Card>

        {/* Thêm nhiều Card vào đây */}
        <Card className="py-4">
          <Link href={"/123"}>
            <CardHeader className="pb-0 pt-2 px-4 flex-col items-center">
              <Image
                alt="Card background"
                className="object-cover rounded-xl"
                src="https://heroui.com/images/hero-card-complete.jpeg"
                width={270}
              />
            </CardHeader>
            <CardBody className="overflow-visible py-2 text-center flex flex-col items-center">
              <h4 className="font-bold text-large">Acc Vip 50K</h4>
              <p className="">Số lượng: 20</p>
              <small className="text-default-600">Đã bán: 100</small>
              <Button
                className="mt-4 w-2/3 text-sm font-medium text-center transition-all whitespace-nowrap whitespace-normal-sm"
                color="primary"
              >
                Xem chi tiết
              </Button>
            </CardBody>
          </Link>
        </Card>

        <Card className="py-4">
          <Link href={"/123"}>
            <CardHeader className="pb-0 pt-2 px-4 flex-col items-center">
              <Image
                alt="Card background"
                className="object-cover rounded-xl"
                src="https://heroui.com/images/hero-card-complete.jpeg"
                width={270}
              />
            </CardHeader>
            <CardBody className="overflow-visible py-2 text-center flex flex-col items-center">
              <h4 className="font-bold text-large">Acc Vip 50K</h4>
              <p className="">Số lượng: 20</p>
              <small className="text-default-600">Đã bán: 100</small>
              <Button
                className="mt-4 w-2/3 text-sm font-medium text-center transition-all whitespace-nowrap whitespace-normal-sm"
                color="primary"
              >
                Xem chi tiết
              </Button>
            </CardBody>
          </Link>
        </Card>

        <Card className="py-4">
          <Link href={"/123"}>
            <CardHeader className="pb-0 pt-2 px-4 flex-col items-center">
              <Image
                alt="Card background"
                className="object-cover rounded-xl"
                src="https://heroui.com/images/hero-card-complete.jpeg"
                width={270}
              />
            </CardHeader>
            <CardBody className="overflow-visible py-2 text-center flex flex-col items-center">
              <h4 className="font-bold text-large">Acc Vip 50K</h4>
              <p className="">Số lượng: 20</p>
              <small className="text-default-600">Đã bán: 100</small>
              <Button
                className="mt-4 w-2/3 text-sm font-medium text-center transition-all whitespace-nowrap whitespace-normal-sm"
                color="primary"
              >
                Xem chi tiết
              </Button>
            </CardBody>
          </Link>
        </Card>
      </div>
    </>
  );
};

export default ListSubCate;
