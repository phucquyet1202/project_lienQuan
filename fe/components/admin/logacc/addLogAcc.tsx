"use client";
import React from "react";
import CustomModal from "../custom/modal";
import { Form } from "@heroui/form";
import { Input } from "@nextui-org/input";
import { Button } from "@heroui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createLogAcc } from "@/api/logAcc";

type Props = {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
};

const AddLogAcc = ({ isOpen, onOpenChange }: Props) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createLogAcc,
    onSuccess: (updatedLogAcc) => {
      toast.success("Thêm log acc thành công!");

      // Thêm cache ngay lập tức
      queryClient.invalidateQueries({ queryKey: ["logAcc"] });

      // Đóng modal sau khi Thêm thành công
      onOpenChange(false);
    },
    onError: () => {
      toast.error("Đã xảy ra lỗi khi Thêm log acc.");
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
            errorMessage="Vui lòng nhập tên log acc"
            label="Tên danh mục"
            labelPlacement="outside"
            name="name"
            placeholder="Nhập tên log acc"
            type="text"
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

export default AddLogAcc;
