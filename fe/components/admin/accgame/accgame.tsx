"use client";
import React, { useState } from "react";
import { Chip, Tooltip, Button, useDisclosure, Spinner } from "@heroui/react";
import CustomTable from "../custom/table";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import Link from "next/link";
import { getAllAccgame } from "@/api/accgame";
import AddAccgame from "./addAccgme";
import UpdateAccgame from "./updateAccgame";

export default function Accgame() {
  const queryClient = useQueryClient();
  const {
    isOpen: openAdd,
    onOpen: openAddAccgame,
    onOpenChange: onChaneAddAccgame,
  } = useDisclosure();
  const {
    isOpen: openUpdate,
    onOpen: openUpdateAccgame,
    onOpenChange: onChaneUpdateAccgame,
  } = useDisclosure();
  const {
    isOpen: opendelete,
    onOpen: openDeleteAccgame,
    onOpenChange: onChaneDeleteAccgame,
  } = useDisclosure();

  const [selectedAccgameId, setSelectedAccgameId] = useState<string | null>(
    null
  );

  const { data, isLoading } = useQuery({
    queryKey: ["accgame"],
    queryFn: getAllAccgame,
  });

  const columns = [
    { name: "STT", uid: "stt" },
    { name: "Code", uid: "code" },
    { name: "Price", uid: "price" },
    { name: "UserName", uid: "userName" },
    { name: "Password", uid: "password" },
    { name: "LogAcc", uid: "logAcc" },
    { name: "Sub cate", uid: "subCate" },
    { name: "Cover photo", uid: "coverPhoto" },
    { name: "Image", uid: "image" },
    { name: "Description", uid: "description" },
    { name: "IsFlashSell", uid: "isFlashSell" },
    { name: "STATUS", uid: "status" },
    { name: "ACTIONS", uid: "actions" },
  ];

  const cate =
    data?.data?.data?.map((item: any, index: number) => ({
      key: item?._id,
      stt: index + 1,
      code: item?.code,
      price: item?.price,
      userName: item?.userName,
      password: item?.password,
      logAcc: item?.logAccId?.name,
      subCate: item?.subCateId?.name,
      coverPhoto: item?.coverPhoto,
      image: item?.image || [],
      description: item?.description,
      isFlashSell: item?.isFlashSell,
      status: item?.status,
    })) ?? [];

  const renderCell = (cate: any, columnKey: string) => {
    switch (columnKey) {
      case "stt":
        return <p className="text-sm font-bold">{cate?.stt}</p>;
      case "code":
        return <p className="text-sm">{cate?.code}</p>;
      case "price":
        return <p className="text-sm">{cate?.price}</p>;
      case "userName":
        return <p className="text-sm">{cate?.userName}</p>;
      case "password":
        return <p className="text-sm">{cate?.password}</p>;
      case "logAcc":
        return <p className="text-sm">{cate?.logAcc}</p>;
      case "subCate":
        return <p className="text-sm">{cate?.subCate}</p>;
      case "coverPhoto":
        return (
          <img
            src={cate?.coverPhoto?.url}
            alt="Cover"
            className="w-16 h-16 object-cover rounded"
          />
        );
      case "image":
        return (
          <div className="">
            {cate?.image?.map((img: any, idx: number) => (
              <img
                key={idx}
                src={img?.url}
                alt={`Image ${idx}`}
                className="w-16 rounded mt-3"
              />
            ))}
          </div>
        );
      case "description":
        return <p className="text-sm line-clamp-2">{cate.description}</p>;
      case "isFlashSell":
        return (
          <p className="text-sm font-bold">
            {cate.isFlashSell ? "✅ Yes" : "❌ No"}
          </p>
        );
      case "status":
        return (
          <Chip
            color={cate?.status ? "success" : "danger"}
            size="md"
            variant="flat"
          >
            {cate?.status ? "Hiển thị" : "Ẩn"}
          </Chip>
        );
      case "actions":
        return (
          <div className="flex items-center gap-2">
            <Tooltip content="View">
              <Link href={`/admin/cate/${cate.key}`}>
                <button>👁️</button>
              </Link>
            </Tooltip>
            <Tooltip content="Chỉnh sửa">
              <button
                onClick={() => {
                  setSelectedAccgameId(cate.key);
                  openUpdateAccgame();
                }}
              >
                ✏️
              </button>
            </Tooltip>
            <Tooltip content="Xóa">
              <button onClick={openDeleteAccgame}>
                🗑️
                {/* <DeleteAccgame
                  isOpen={opendelete}
                  onOpenChange={onChaneDeleteAccgame}
                  categoryId={cate.key}
                /> */}
              </button>
            </Tooltip>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center h-full">
          <Spinner size="lg" />
        </div>
      ) : (
        <>
          <Button onPress={openAddAccgame} className="my-5">
            Thêm mới
          </Button>
          <CustomTable columns={columns} data={cate} renderCell={renderCell} />
          <AddAccgame isOpen={openAdd} onOpenChange={onChaneAddAccgame} />
          {selectedAccgameId && (
            <UpdateAccgame
              isOpen={openUpdate}
              onOpenChange={onChaneUpdateAccgame}
              accgameId={selectedAccgameId}
            />
          )}
        </>
      )}
    </>
  );
}
