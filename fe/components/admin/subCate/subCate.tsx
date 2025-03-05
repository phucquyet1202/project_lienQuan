"use client";
import React, { useState } from "react";
import { Chip, Tooltip, Button, useDisclosure, Spinner } from "@heroui/react";
import CustomTable from "../custom/table";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllSubCate } from "@/api/subCate";
import DeleteSubCate from "./deleteSubCate";
import AddSubCate from "./addSubCate";
import UpdateSubCate from "./updateSubCate";
import Link from "next/link";

export default function SubCate() {
  const {
    isOpen: openAdd,
    onOpen: openAddSubCate,
    onOpenChange: onChaneAddSubCate,
  } = useDisclosure();
  const {
    isOpen: openUpdate,
    onOpen: openUpdateSubCate,
    onOpenChange: onChaneUpdateSubCate,
  } = useDisclosure();
  const {
    isOpen: opendelete,
    onOpen: openDeleteSubCate,
    onOpenChange: onChaneDeleteSubCate,
  } = useDisclosure();

  const [selectedSubCateId, setSelectedSubCateId] = useState<string | null>(
    null
  );

  const { data, isLoading } = useQuery({
    queryKey: ["subCate"],
    queryFn: getAllSubCate,
  });

  const columns = [
    { name: "STT", uid: "stt" },
    { name: "Name", uid: "name" },
    { name: "Image", uid: "image" },
    { name: "Status", uid: "status" },
    { name: "ACTIONS", uid: "actions" },
  ];

  const SubCate =
    data?.data?.data?.map((item: any, index: number) => ({
      key: item._id,
      stt: index + 1,
      name: item.name,
      image: item.image.url,
      status: item.status,
    })) ?? [];

  const renderCell = (SubCate: any, columnKey: string) => {
    switch (columnKey) {
      case "stt":
        return <p className="text-sm font-bold">{SubCate.stt}</p>;
      case "name":
        return <p className="text-sm">{SubCate.name}</p>;
      case "image":
        return <img src={SubCate.image} alt="image" className="w-10 h-10" />;
      case "status":
        return (
          <Chip
            color={SubCate.status ? "success" : "danger"}
            size="md"
            variant="flat"
          >
            {SubCate.status ? "Hiển thị" : "Ẩn"}
          </Chip>
        );
      case "actions":
        return (
          <div className="flex items-center gap-2">
            <Tooltip content="View">
              <Link href={`/admin/subCate/${SubCate.key}`}>
                <button>👁️</button>
              </Link>
            </Tooltip>
            <Tooltip content="Chỉnh sửa">
              <button
                onClick={() => {
                  setSelectedSubCateId(SubCate.key);
                  openUpdateSubCate();
                }}
              >
                ✏️
              </button>
            </Tooltip>
            <Tooltip content="Xóa">
              <button onClick={openDeleteSubCate}>
                🗑️
                <DeleteSubCate
                  isOpen={opendelete}
                  onOpenChange={onChaneDeleteSubCate}
                  subCateId={SubCate.key}
                />
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
          <Button onPress={openAddSubCate} className="my-5">
            Thêm mới
          </Button>
          <CustomTable
            columns={columns}
            data={SubCate}
            renderCell={renderCell}
          />
          <AddSubCate isOpen={openAdd} onOpenChange={onChaneAddSubCate} />
          {selectedSubCateId && (
            <UpdateSubCate
              isOpen={openUpdate}
              onOpenChange={onChaneUpdateSubCate}
              subCate={selectedSubCateId}
            />
          )}
        </>
      )}
    </>
  );
}
