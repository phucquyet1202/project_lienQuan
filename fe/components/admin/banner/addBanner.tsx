"use client";

import React, { useState } from "react";
import CustomModal from "../custom/modal";
import { Form } from "@heroui/form";
import { Input } from "@nextui-org/input";
import { Button, Textarea } from "@heroui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ImageUpload from "../custom/uploadImage";
import { createBanner } from "@/api/layout&banner";

type Props = {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
};

const AddBanner = ({ isOpen, onOpenChange }: Props) => {
  const queryClient = useQueryClient();
  const [images, setImages] = useState<File[]>([]); // Lưu ảnh từ ImageUpload

  const mutation = useMutation({
    mutationFn: createBanner,
    onSuccess: () => {
      toast.success("Thêm Banner thành công!");
      queryClient.invalidateQueries({ queryKey: ["banner"] });
      onOpenChange(false);
    },
    onError: () => {
      toast.error("Đã xảy ra lỗi khi Thêm banner.");
      onOpenChange(false);
    },
  });

  return (
    <CustomModal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      title="Thêm Banner"
    >
      <Form
        className="w-full max-w-xs flex flex-col gap-4"
        validationBehavior="native"
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);

          if (images.length > 0) {
            formData.append("image", images[0]); // Chỉ lấy 1 ảnh (vì length=1)
          }

          console.log("Dữ liệu gửi lên:", Object.fromEntries(formData));
          mutation.mutate(formData); // Gửi FormData lên API
        }}
      >
        <ImageUpload length={1} onImageChange={setImages} />{" "}
        {/* Truyền setImages vào */}
        <div className="flex justify-center w-full">
          <Button color="primary" type="submit" isLoading={mutation.isPending}>
            Thêm mới
          </Button>
        </div>
      </Form>
    </CustomModal>
  );
};

export default AddBanner;
