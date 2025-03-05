"use client";
import React from "react";
import CustomModal from "../custom/modal";
import { Form } from "@heroui/form";
import { Input } from "@nextui-org/input";
import { Button, Textarea } from "@heroui/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Spinner } from "@nextui-org/react";
import { getOneReview, updateReview } from "@/api/review";

type Props = {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  reviewId: string;
};

const UpdateReview = ({ isOpen, onOpenChange, reviewId }: Props) => {
  const queryClient = useQueryClient();

  // Fetch LogAccgory details
  const { data, isLoading, isError } = useQuery({
    queryKey: ["review", reviewId],
    queryFn: () => getOneReview(reviewId),
    enabled: !!reviewId,
  });

  // Mutation for updating LogAccgory
  const mutation = useMutation({
    mutationFn: (formData: any) => updateReview(reviewId, formData),
    onSuccess: () => {
      toast.success("Cập nhật review thành công!");

      // Cập nhật cache ngay lập tức
      queryClient.invalidateQueries({ queryKey: ["review"] });

      // Đóng modal sau khi cập nhật thành công
      onOpenChange(false);
    },
    onError: () => {
      toast.error("Đã xảy ra lỗi khi cập nhật review.");
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
        title="Cập nhật review"
      >
        <Form
          className="w-full max-w-xs flex flex-col gap-4"
          onSubmit={handleSubmit}
        >
          <Input
            isRequired
            label="Name"
            name="name"
            placeholder="Nhập tên người bình luận"
            defaultValue={data?.data?.data?.name}
          />
          <Textarea
            isRequired
            label="Content"
            name="content"
            placeholder="Nhập nội dung review"
            defaultValue={data?.data?.data?.content}
          />
          <Input
            isRequired
            label="Rating"
            name="rating"
            type="number"
            min={1}
            max={5}
            placeholder="Nhập rating và rating phải từ 1 đến 5"
            defaultValue={data?.data?.data?.rating}
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

export default UpdateReview;
