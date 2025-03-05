"use client";
import React from "react";
import { Button, Card, CardBody, CardHeader, Image } from "@heroui/react";
import Link from "next/link";
type Props = {};
import "../../../styles/customCard.css";

const ListAccgame = (props: Props) => {
  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 my-6 card">
        <Card className="py-4 ">
          <Link href={"/123/1"}>
            <CardHeader className="pb-0 pt-2 px-4 flex-col items-center">
              <Image
                alt="Card background"
                className="object-cover rounded-xl"
                src="https://heroui.com/images/hero-card-complete.jpeg"
                width={270}
              />
            </CardHeader>
            <CardBody className="overflow-visible py-2 flex flex-col items-center ">
              <h4 className="font-bold text-large">Acc Vip 50K</h4>
              <p className="">Giá: 200.000đ</p>
              <small className="my-2">Đăng nhập: Facebook</small>
              <small>Đăng ký: trắng thông tin</small>
              <Button
                className="mt-4 w-1/2 text-sm font-medium text-center transition-all whitespace-nowrap whitespace-normal-sm"
                color="secondary"
              >
                Mua ngay
              </Button>
            </CardBody>
          </Link>
        </Card>

        {/* Thêm nhiều Card vào đây */}
        <Card className="py-4">
          <Link href={"/123/1"}>
            <CardHeader className="pb-0 pt-2 px-4 flex-col items-center">
              <Image
                alt="Card background"
                className="object-cover rounded-xl"
                src="https://heroui.com/images/hero-card-complete.jpeg"
                width={270}
              />
            </CardHeader>
            <CardBody className="overflow-visible py-2 flex flex-col items-center ">
              <h4 className="font-bold text-large">Acc Vip 50K</h4>
              <p className="">Giá: 200.000đ</p>
              <small className="my-2">Đăng nhập: Facebook</small>
              <small>Đăng ký: trắng thông tin</small>
              <Button
                className="mt-4 w-1/2 text-sm font-medium text-center transition-all whitespace-nowrap whitespace-normal-sm"
                color="secondary"
              >
                Mua ngay
              </Button>
            </CardBody>
          </Link>
        </Card>

        <Card className="py-4">
          <Link href={"/123/1"}>
            <CardHeader className="pb-0 pt-2 px-4 flex-col items-center">
              <Image
                alt="Card background"
                className="object-cover rounded-xl"
                src="https://heroui.com/images/hero-card-complete.jpeg"
                width={270}
              />
            </CardHeader>
            <CardBody className="overflow-visible py-2 flex flex-col items-center ">
              <h4 className="font-bold text-large">Acc Vip 50K</h4>
              <p className="">Giá: 200.000đ</p>
              <small className="my-2">Đăng nhập: Facebook</small>
              <small>Đăng ký: trắng thông tin</small>
              <Button
                className="mt-4 w-1/2 text-sm font-medium text-center transition-all whitespace-nowrap whitespace-normal-sm"
                color="secondary"
              >
                Mua ngay
              </Button>
            </CardBody>
          </Link>
        </Card>

        <Card className="py-4">
          <Link href={"/123/1"}>
            <CardHeader className="pb-0 pt-2 px-4 flex-col items-center">
              <Image
                alt="Card background"
                className="object-cover rounded-xl"
                src="https://heroui.com/images/hero-card-complete.jpeg"
                width={270}
              />
            </CardHeader>
            <CardBody className="overflow-visible py-2 flex flex-col items-center ">
              <h4 className="font-bold text-large">Acc Vip 50K</h4>
              <p className="">Giá: 200.000đ</p>
              <small className="my-2">Đăng nhập: Facebook</small>
              <small>Đăng ký: trắng thông tin</small>
              <Button
                className="mt-4 w-1/2 text-sm font-medium text-center transition-all whitespace-nowrap whitespace-normal-sm"
                color="secondary"
              >
                Mua ngay
              </Button>
            </CardBody>
          </Link>
        </Card>
      </div>
    </>
  );
};

export default ListAccgame;
