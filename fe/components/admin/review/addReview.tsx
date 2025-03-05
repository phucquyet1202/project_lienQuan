"use client";
import React from "react";
import CustomModal from "../custom/modal";
import { Form } from "@heroui/form";
import { Input } from "@nextui-org/input";
import { Button, Textarea } from "@heroui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { createReview } from "@/api/review";
import "react-toastify/dist/ReactToastify.css";

type Props = {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
};

const AddReview = ({ isOpen, onOpenChange }: Props) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createReview,
    onSuccess: () => {
      toast.success("Thêm Review thành công!");

      // Thêm cache ngay lập tức
      queryClient.invalidateQueries({ queryKey: ["review"] });

      // Đóng modal sau khi Thêm thành công
      onOpenChange(false);
    },
    onError: () => {
      toast.error("Đã xảy ra lỗi khi Thêm review.");
      onOpenChange(false);
    },
  });

  return (
    <>
      <CustomModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        title="Thêm log acc"
      >
        <Form
          className="w-full max-w-xs flex flex-col gap-4"
          validationBehavior="native"
          onSubmit={(e) => {
            e.preventDefault();
            let data: any = Object.fromEntries(new FormData(e.currentTarget));

            mutation.mutate(data);
          }}
        >
          <Input
            isRequired
            errorMessage="Vui lòng nhập tên người bình luận"
            label="name"
            labelPlacement="outside"
            name="name"
            placeholder="Nhập tên người bình luận"
            type="text"
          />
          <Textarea
            isRequired
            errorMessage="Vui lòng nhập nội dung bình luận"
            className="max-w-xs"
            name="content"
            label="comment"
            labelPlacement="outside"
            placeholder="Nhập bình luận"
            variant="bordered"
          />
          <Input
            isRequired
            errorMessage="Vui lòng nhập rating và rating phải từ 1 đến 5"
            label="rating"
            labelPlacement="outside"
            name="rating"
            placeholder="Nhập rating"
            type="number"
            min={1}
            max={5}
          />
          <div className="flex justify-center w-full">
            <Button
              color="primary"
              type="submit"
              isLoading={mutation.isPending}
            >
              Thêm mới
            </Button>
          </div>
        </Form>
      </CustomModal>
    </>
  );
};

export default AddReview;
