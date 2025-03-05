"use client";
import { Button, Chip, Spinner, Tooltip } from "@heroui/react";
import React, { useState } from "react";
import CustomTable from "../custom/table";
import { useQuery } from "@tanstack/react-query";
import { useDisclosure } from "@nextui-org/react";
import { getLayOut } from "@/api/layout&banner";
import DeleteLayOut from "./deleteLayOut";
import AddLayOut from "./addLayOut";
import UpdateLayOut from "./updateLayOut";

type Props = {};

const Layout = (props: Props) => {
  const {
    isOpen: openAdd,
    onOpen: openAddLayOut,
    onOpenChange: onChaneAddLayOut,
  } = useDisclosure();
  const {
    isOpen: openUpdate,
    onOpen: openUpdateLayOut,
    onOpenChange: onChaneUpdateLayOut,
  } = useDisclosure();
  const {
    isOpen: opendelete,
    onOpen: openDeleteLayOut,
    onOpenChange: onChaneDeleteLayOut,
  } = useDisclosure();

  const [selectedLayOutId, setSelectedLayOutId] = useState<string | null>(null);

  const { data, isLoading } = useQuery({
    queryKey: ["layout"],
    queryFn: getLayOut,
  });

  const columns = [
    { name: "STT", uid: "stt" },
    { name: "Image", uid: "image" },
    { name: "Status", uid: "status" },
    { name: "ACTIONS", uid: "actions" },
  ];

  const LayOut = data?.data?.data
    ? [
        {
          key: data?.data?.data?._id || 1,
          stt: 1,
          image: data?.data?.data?.image.url,
          status: data?.data?.data?.status,
        },
      ]
    : [];

  const renderCell = (LayOut: any, columnKey: string) => {
    switch (columnKey) {
      case "stt":
        return <p className="text-sm font-bold">{LayOut.stt}</p>;
      case "image":
        return <img src={LayOut.image} alt="image" className="w-16 h-16" />;
      case "status":
        return (
          <Chip
            color={LayOut.status ? "success" : "danger"}
            size="md"
            variant="flat"
          >
            {LayOut.status ? "Hiển thị" : "Ẩn"}
          </Chip>
        );
      case "actions":
        return (
          <div className="flex data?.data?.data?s-center gap-2">
            <Tooltip content="Chỉnh sửa">
              <button
                onClick={() => {
                  setSelectedLayOutId(LayOut.key);
                  openUpdateLayOut();
                }}
              >
                ✏️
              </button>
            </Tooltip>
            <Tooltip content="Xóa">
              <button onClick={openDeleteLayOut}>
                🗑️
                <DeleteLayOut
                  isOpen={opendelete}
                  onOpenChange={onChaneDeleteLayOut}
                  layOutId={LayOut.key}
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
        <div className="flex justify-center data?.data?.data?s-center h-full">
          <Spinner size="lg" />
        </div>
      ) : (
        <>
          <Button onPress={openAddLayOut} className="my-5">
            Thêm mới
          </Button>
          <CustomTable
            columns={columns}
            data={LayOut}
            renderCell={renderCell}
          />
          <AddLayOut isOpen={openAdd} onOpenChange={onChaneAddLayOut} />
          {selectedLayOutId && (
            <UpdateLayOut
              isOpen={openUpdate}
              onOpenChange={onChaneUpdateLayOut}
              layout={selectedLayOutId}
            />
          )}
        </>
      )}
    </>
  );
};

export default Layout;
