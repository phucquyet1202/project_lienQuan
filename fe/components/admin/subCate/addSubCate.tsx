"use client";

import React, { useState } from "react";
import CustomModal from "../custom/modal";
import { Form } from "@heroui/form";
import { Input } from "@nextui-org/input";
import { Button, Select, SelectItem, Textarea } from "@heroui/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createSubCate } from "@/api/subCate";
import ImageUpload from "../custom/uploadImage";
import { getAllCategory } from "@/api/categoty";

type Props = {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
};

const AddSubCate = ({ isOpen, onOpenChange }: Props) => {
  const queryClient = useQueryClient();
  const [images, setImages] = useState<File[]>([]); // Lưu ảnh từ ImageUpload
  const { data: categories } = useQuery({
    queryKey: ["category"],
    queryFn: getAllCategory,
  });
  const mutation = useMutation({
    mutationFn: createSubCate,
    onSuccess: () => {
      toast.success("Thêm danh mục con thành công!");
      queryClient.invalidateQueries({ queryKey: ["subCate"] });
      onOpenChange(false);
    },
    onError: () => {
      toast.error("Đã xảy ra lỗi khi Thêm danh mục con.");
      onOpenChange(false);
    },
  });

  return (
    <CustomModal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      title="Thêm danh mục con"
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
        <Input
          isRequired
          errorMessage="Vui lòng nhập tên danh mục con"
          label="name"
          labelPlacement="outside"
          name="name"
          placeholder="Nhập tên danh mục con"
          type="text"
        />
        <Select label="Lịch sử tài khoản" name="categoryId">
          {categories?.data?.data?.map((cate: any) => (
            <SelectItem key={cate._id} value={cate._id}>
              {cate.name}
            </SelectItem>
          ))}
        </Select>
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

export default AddSubCate;
