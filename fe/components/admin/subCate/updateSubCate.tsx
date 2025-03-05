"use client";
import React, { useState } from "react";
import CustomModal from "../custom/modal";
import { Form } from "@heroui/form";
import { Input } from "@nextui-org/input";
import { Button, Textarea } from "@heroui/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Spinner } from "@nextui-org/react";
import { getOneSubCate, updateSubCate } from "@/api/subCate";
import ImageUpload from "../custom/uploadImage";

type Props = {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  subCate: string;
};

const UpdateSubCate = ({ isOpen, onOpenChange, subCate }: Props) => {
  const queryClient = useQueryClient();
  const [images, setImages] = useState<File[]>([]); // Lưu ảnh từ ImageUpload

  // Fetch LogAccgory details
  const { data, isLoading, isError } = useQuery({
    queryKey: ["subCate", subCate],
    queryFn: () => getOneSubCate(subCate),
    enabled: !!subCate,
  });

  // Mutation for updating LogAccgory
  const mutation = useMutation({
    mutationFn: (formData: any) => updateSubCate(subCate, formData),
    onSuccess: () => {
      toast.success("Cập nhật danh mục con thành công!");

      // Cập nhật cache ngay lập tức
      queryClient.invalidateQueries({ queryKey: ["subCate"] });

      // Đóng modal sau khi cập nhật thành công
      onOpenChange(false);
    },
    onError: () => {
      toast.error("Đã xảy ra lỗi khi cập nhật danh mục con.");
      onOpenChange(false);
    },
  });

  // Form submission handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    if (images.length > 0) {
      formData.append("image", images[0]); // Append the first image (only one image is allowed)
    }
    mutation.mutate(formData);
  };

  if (isLoading) return <Spinner />;
  if (isError) return <div>Đã xảy ra lỗi khi tải dữ liệu.</div>;

  return (
    <>
      <CustomModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        title="Cập nhật danh mục con"
      >
        <Form
          className="w-full max-w-xs flex flex-col gap-4"
          onSubmit={handleSubmit}
        >
          <Input
            isRequired
            label="Name"
            name="name"
            placeholder="Nhập tên danh mục con"
            defaultValue={data?.data?.data?.name}
          />
          <ImageUpload
            length={1}
            onImageChange={setImages}
            defaultValue={[data?.data?.data?.image]}
          />
          <div className="flex justify-center w-full">
            <Button
              color="primary"
              type="submit"
              isLoading={mutation.isPending}
            >
              Cập nhật
            </Button>
          </div>
        </Form>
      </CustomModal>
    </>
  );
};

export default UpdateSubCate;
