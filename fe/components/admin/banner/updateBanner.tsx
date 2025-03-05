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
import ImageUpload from "../custom/uploadImage";
import { getBanner, updateBanner } from "@/api/layout&banner";

type Props = {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  banner: string;
};

const UpdateBanner = ({ isOpen, onOpenChange, banner }: Props) => {
  const queryClient = useQueryClient();
  const [images, setImages] = useState<File[]>([]); // Lưu ảnh từ ImageUpload

  // Fetch banner details
  const { data, isLoading, isError } = useQuery({
    queryKey: ["banner", banner],
    queryFn: () => getBanner(),
    enabled: !!banner,
  });

  // Mutation for updating banner
  const mutation = useMutation({
    mutationFn: (formData: any) => updateBanner(banner, formData),
    onSuccess: () => {
      toast.success("Cập nhật banner thành công!");
      queryClient.invalidateQueries({ queryKey: ["banner"] });
      onOpenChange(false); // Close modal after successful update
    },
    onError: () => {
      toast.error("Đã xảy ra lỗi khi cập nhật banner.");
      onOpenChange(false); // Close modal if error
    },
  });

  // Form submission handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);

    // Append image to FormData if there's a selected image
    if (images.length > 0) {
      formData.append("image", images[0]); // Append the first image (only one image is allowed)
    }

    console.log("Dữ liệu gửi lên:", Object.fromEntries(formData));
    mutation.mutate(formData); // Send form data to API
  };

  if (isLoading) return <Spinner />;

  return (
    <>
      <CustomModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        title="Cập nhật banner"
      >
        <Form
          className="w-full max-w-xs flex flex-col gap-4"
          validationBehavior="native"
          onSubmit={handleSubmit}
        >
          <ImageUpload
            length={1}
            onImageChange={setImages}
            defaultValue={[data?.data?.data?.image]}
          />
          {/* Pass empty defaultValue as no initial image */}
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

export default UpdateBanner;
