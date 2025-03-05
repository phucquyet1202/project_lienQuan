"use client";
import React, { useState } from "react";
import { Chip, Tooltip, Button, useDisclosure, Spinner } from "@heroui/react";
import CustomTable from "../custom/table";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllReview } from "@/api/review";
import AddReview from "./addReview";
import UpdateReview from "./updateReview";
import DeleteReview from "./deleteReview";

export default function Review() {
  const queryClient = useQueryClient();
  const {
    isOpen: openAdd,
    onOpen: openAddReview,
    onOpenChange: onChaneAddReview,
  } = useDisclosure();
  const {
    isOpen: openUpdate,
    onOpen: openUpdateReview,
    onOpenChange: onChaneUpdateReview,
  } = useDisclosure();
  const {
    isOpen: opendelete,
    onOpen: openDeleteReview,
    onOpenChange: onChaneDeleteReview,
  } = useDisclosure();

  const [selectedReviewId, setSelectedReviewId] = useState<string | null>(null);

  const { data, isLoading } = useQuery({
    queryKey: ["review"],
    queryFn: getAllReview,
  });

  const columns = [
    { name: "STT", uid: "stt" },
    { name: "Name", uid: "name" },
    { name: "Rating", uid: "rating" },
    { name: "Content", uid: "content" },
    { name: "Time", uid: "time" },
    { name: "ACTIONS", uid: "actions" },
  ];

  const Review =
    data?.data?.data?.map((item: any, index: number) => ({
      key: item._id,
      stt: index + 1,
      name: item.name,
      rating: item.rating,
      content: item.content,
      time: new Date(item.time).toLocaleString("vi-VN", {
        timeZone: "Asia/Ho_Chi_Minh", // Múi giờ Việt Nam
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false, // Hiển thị 24h
      }),
    })) ?? [];

  const renderCell = (Review: any, columnKey: string) => {
    switch (columnKey) {
      case "stt":
        return <p className="text-sm font-bold">{Review.stt}</p>;
      case "name":
        return <p className="text-sm">{Review.name}</p>;
      case "rating":
        return <p className="text-sm">{Review.rating}</p>;
      case "content":
        return <p className="text-sm">{Review.content}</p>;
      case "time":
        return <p className="text-sm">{Review.time}</p>;
      case "actions":
        return (
          <div className="flex items-center gap-2">
            <Tooltip content="Chỉnh sửa">
              <button
                onClick={() => {
                  setSelectedReviewId(Review.key);
                  openUpdateReview();
                }}
              >
                ✏️
              </button>
            </Tooltip>
            <Tooltip content="Xóa">
              <button onClick={openDeleteReview}>
                🗑️
                <DeleteReview
                  isOpen={opendelete}
                  onOpenChange={onChaneDeleteReview}
                  reviewId={Review.key}
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
          <Button onPress={openAddReview} className="my-5">
            Thêm mới
          </Button>
          <CustomTable
            columns={columns}
            data={Review}
            renderCell={renderCell}
          />
          <AddReview isOpen={openAdd} onOpenChange={onChaneAddReview} />
          {selectedReviewId && (
            <UpdateReview
              isOpen={openUpdate}
              onOpenChange={onChaneUpdateReview}
              reviewId={selectedReviewId}
            />
          )}
        </>
      )}
    </>
  );
}
