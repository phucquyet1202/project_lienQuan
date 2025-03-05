"use client";
import React, { useState } from "react";
import { Chip, Tooltip, Button, useDisclosure, Spinner } from "@heroui/react";
import CustomTable from "../custom/table";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import UpdateLogAcc from "./updateLogAcc";
import AddLogAcc from "./addLogAcc";
import DeleteLogAcc from "./deleteLogAcc";
import { getAllLogAcc } from "@/api/logAcc";

export default function LogAcc() {
  const queryClient = useQueryClient();
  const {
    isOpen: openAdd,
    onOpen: openAddLogAcc,
    onOpenChange: onChaneAddLogAcc,
  } = useDisclosure();
  const {
    isOpen: openUpdate,
    onOpen: openUpdateLogAcc,
    onOpenChange: onChaneUpdateLogAcc,
  } = useDisclosure();
  const {
    isOpen: opendelete,
    onOpen: openDeleteLogAcc,
    onOpenChange: onChaneDeleteLogAcc,
  } = useDisclosure();

  const [selectedLogAccId, setSelectedLogAccId] = useState<string | null>(null);

  const { data, isLoading } = useQuery({
    queryKey: ["logAcc"],
    queryFn: getAllLogAcc,
  });

  const columns = [
    { name: "STT", uid: "stt" },
    { name: "Name", uid: "name" },
    { name: "ACTIONS", uid: "actions" },
  ];

  const LogAcc =
    data?.data?.data?.map((item: any, index: number) => ({
      key: item._id,
      stt: index + 1,
      name: item.name,
    })) ?? [];

  const renderCell = (LogAcc: any, columnKey: string) => {
    switch (columnKey) {
      case "stt":
        return <p className="text-sm font-bold">{LogAcc.stt}</p>;
      case "name":
        return <p className="text-sm">{LogAcc.name}</p>;

        return (
          <Chip
            color={LogAcc.status ? "success" : "danger"}
            size="md"
            variant="flat"
          >
            {LogAcc.status ? "Hiển thị" : "Ẩn"}
          </Chip>
        );
      case "actions":
        return (
          <div className="flex items-center gap-2">
            <Tooltip content="Chỉnh sửa">
              <button
                onClick={() => {
                  setSelectedLogAccId(LogAcc.key);
                  openUpdateLogAcc();
                }}
              >
                ✏️
              </button>
            </Tooltip>
            <Tooltip content="Xóa">
              <button onClick={openDeleteLogAcc}>
                🗑️
                <DeleteLogAcc
                  isOpen={opendelete}
                  onOpenChange={onChaneDeleteLogAcc}
                  logAccId={LogAcc.key}
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
          <Button onPress={openAddLogAcc} className="my-5">
            Thêm mới
          </Button>
          <CustomTable
            columns={columns}
            data={LogAcc}
            renderCell={renderCell}
          />
          <AddLogAcc isOpen={openAdd} onOpenChange={onChaneAddLogAcc} />
          {selectedLogAccId && (
            <UpdateLogAcc
              isOpen={openUpdate}
              onOpenChange={onChaneUpdateLogAcc}
              logAccId={selectedLogAccId}
            />
          )}
        </>
      )}
    </>
  );
}
