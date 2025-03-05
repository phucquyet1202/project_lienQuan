"use client";
import React, { useState } from "react";
import { Chip, Tooltip, Button, useDisclosure, Spinner } from "@heroui/react";
import CustomTable from "../custom/table";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { getAllCategory } from "@/api/categoty";
import AddCate from "./addCate";
import UpdateCate from "./updateCate";
import Link from "next/link";
import DeleteCate from "./deleteCate";

export default function Category() {
  const queryClient = useQueryClient();
  const {
    isOpen: openAdd,
    onOpen: openAddCate,
    onOpenChange: onChaneAddCate,
  } = useDisclosure();
  const {
    isOpen: openUpdate,
    onOpen: openUpdateCate,
    onOpenChange: onChaneUpdateCate,
  } = useDisclosure();
  const {
    isOpen: opendelete,
    onOpen: openDeleteCate,
    onOpenChange: onChaneDeleteCate,
  } = useDisclosure();

  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
    null
  );

  const { data, isLoading } = useQuery({
    queryKey: ["category"],
    queryFn: getAllCategory,
  });

  const columns = [
    { name: "STT", uid: "stt" },
    { name: "Name", uid: "name" },
    { name: "STATUS", uid: "status" },
    { name: "ACTIONS", uid: "actions" },
  ];

  const cate =
    data?.data?.data?.map((item: any, index: number) => ({
      key: item._id,
      stt: index + 1,
      name: item.name,
      status: item.status,
    })) ?? [];

  const renderCell = (cate: any, columnKey: string) => {
    switch (columnKey) {
      case "stt":
        return <p className="text-sm font-bold">{cate.stt}</p>;
      case "name":
        return <p className="text-sm">{cate.name}</p>;
      case "status":
        return (
          <Chip
            color={cate.status ? "success" : "danger"}
            size="md"
            variant="flat"
          >
            {cate.status ? "Hiển thị" : "Ẩn"}
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
                  setSelectedCategoryId(cate.key);
                  openUpdateCate();
                }}
              >
                ✏️
              </button>
            </Tooltip>
            <Tooltip content="Xóa">
              <button onClick={openDeleteCate}>
                🗑️
                <DeleteCate
                  isOpen={opendelete}
                  onOpenChange={onChaneDeleteCate}
                  categoryId={cate.key}
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
          <Button onPress={openAddCate} className="my-5">
            Thêm mới
          </Button>
          <CustomTable columns={columns} data={cate} renderCell={renderCell} />
          <AddCate isOpen={openAdd} onOpenChange={onChaneAddCate} />
          {selectedCategoryId && (
            <UpdateCate
              isOpen={openUpdate}
              onOpenChange={onChaneUpdateCate}
              categoryId={selectedCategoryId}
            />
          )}
        </>
      )}
    </>
  );
}
