"use client";
import React from "react";
import CustomModal from "../custom/modal";
import { Form } from "@heroui/form";
import { Input } from "@nextui-org/input";
import { Button } from "@heroui/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { updateCategory, getOneCategory } from "@/api/categoty";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Spinner } from "@nextui-org/react";

type Props = {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  categoryId: string;
};

const UpdateCate = ({ isOpen, onOpenChange, categoryId }: Props) => {
  const queryClient = useQueryClient();

  // Fetch category details
  const { data, isLoading, isError } = useQuery({
    queryKey: ["category", categoryId],
    queryFn: () => getOneCategory(categoryId),
    enabled: !!categoryId,
  });

  // Mutation for updating category
  const mutation = useMutation({
    mutationFn: (formData: any) => updateCategory(categoryId, formData),
    onSuccess: (updatedCategory) => {
      toast.success("Cập nhật danh mục thành công!");

      // Cập nhật cache ngay lập tức
      queryClient.invalidateQueries({ queryKey: ["category"] });

      // Đóng modal sau khi cập nhật thành công
      onOpenChange(false);
    },
    onError: () => {
      toast.error("Đã xảy ra lỗi khi cập nhật danh mục.");
      onOpenChange(false);
    },
  });

  // Form submission handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = Object.fromEntries(
      new FormData(e.currentTarget as HTMLFormElement)
    );
    mutation.mutate(formData);
  };

  if (isLoading) return <Spinner />;
  if (isError) return <div>Đã xảy ra lỗi khi tải dữ liệu.</div>;

  return (
    <>
      <CustomModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        title="Cập nhật danh mục"
      >
        <Form
          className="w-full max-w-xs flex flex-col gap-4"
          onSubmit={handleSubmit}
        >
          <Input
            isRequired
            label="Name"
            name="name"
            placeholder="Nhập tên danh mục"
            defaultValue={data?.data?.data?.name}
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

export default UpdateCate;
