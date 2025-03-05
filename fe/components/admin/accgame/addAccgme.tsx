"use client";
import React, { useState } from "react";
import CustomModal from "../custom/modal";
import { Form } from "@heroui/form";
import { Input } from "@nextui-org/input";
import { Button, Select, SelectItem } from "@heroui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createAccgame } from "@/api/accgame";
import { useQuery } from "@tanstack/react-query";
import { getAllSubCate } from "@/api/subCate";
import { getAllLogAcc } from "@/api/logAcc";
import ImageUpload from "../custom/uploadImage";

type Props = {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
};

const AddAccgame = ({ isOpen, onOpenChange }: Props) => {
  const queryClient = useQueryClient();
  const [images, setImages] = useState<File[]>([]); // Lưu ảnh từ ImageUpload
  const [photo, setPhoto] = useState<File[]>([]); // Lưu ảnh từ ImageUpload

  // Fetch sub categories and log accounts for selection
  const { data: subCategories } = useQuery({
    queryKey: ["subCate"],
    queryFn: getAllSubCate,
  });
  const { data: logAccounts } = useQuery({
    queryKey: ["logAcc"],
    queryFn: getAllLogAcc,
  });

  const mutation = useMutation({
    mutationFn: createAccgame,
    onSuccess: () => {
      toast.success("Thêm accgame thành công!");
      queryClient.invalidateQueries({ queryKey: ["accgame"] });
      onOpenChange(false);
    },
    onError: () => {
      toast.error("Đã xảy ra lỗi khi thêm accgame.");
    },
  });

  return (
    <CustomModal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      title="Thêm accgame"
    >
      <Form
        className="w-full max-w-md flex flex-col gap-4"
        validationBehavior="native"
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);

          if (images.length > 0) {
            images.forEach((image) => {
              formData.append("image", image);
            });
          }
          if (photo.length > 0) {
            formData.append("coverPhoto", photo[0]); // Chỉ lấy 1 ảnh (vì length=1)
          }

          console.log("Dữ liệu gửi lên:", Object.fromEntries(formData));
          mutation.mutate(formData); // Gửi FormData lên API
        }}
      >
        <Input
          isRequired
          label="Tên tài khoản"
          name="userName"
          placeholder="Nhập tên tài khoản"
          type="text"
        />
        <Input
          isRequired
          label="Mật khẩu"
          name="password"
          placeholder="Nhập mật khẩu"
          type="password"
        />
        <Input
          isRequired
          label="Mô tả"
          name="description"
          placeholder="Nhập mô tả"
          type="text"
        />
        <Input
          isRequired
          label="Giá"
          name="price"
          min={0}
          placeholder="Nhập giá"
          type="number"
        />
        <Select label="Danh mục con" name="subCateId">
          {subCategories?.data?.data?.map((subCate: any) => (
            <SelectItem key={subCate._id} value={subCate._id}>
              {subCate.name}
            </SelectItem>
          ))}
        </Select>
        <Select label="Lịch sử tài khoản" name="logAccId">
          {logAccounts?.data?.data?.map((logAcc: any) => (
            <SelectItem key={logAcc._id} value={logAcc._id}>
              {logAcc.name}
            </SelectItem>
          ))}
        </Select>
        <ImageUpload length={1} onImageChange={setPhoto} />{" "}
        <ImageUpload length={18} onImageChange={setImages} />{" "}
        {/* <Select label="Trạng thái" name="status">
          <SelectItem value="true">Hiển thị</SelectItem>
          <SelectItem value="false">Ẩn</SelectItem>
        </Select>
        <Select label="Flash Sale" name="isFlashSell">
          <SelectItem value="true">Có</SelectItem>
          <SelectItem value="false">Không</SelectItem>
        </Select> */}
        <div className="flex justify-center w-full">
          <Button color="primary" type="submit" isLoading={mutation.isPending}>
            Thêm mới
          </Button>
        </div>
      </Form>
    </CustomModal>
  );
};

export default AddAccgame;
