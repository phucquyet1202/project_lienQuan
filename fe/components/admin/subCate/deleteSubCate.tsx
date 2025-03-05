"use client";
import React from "react";
import CustomModal from "../custom/modal";
import { Button } from "@heroui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Spinner } from "@nextui-org/react";
import { deleteSubCate } from "@/api/subCate";

type Props = {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  subCateId: string;
};

const DeleteSubCate = ({ isOpen, onOpenChange, subCateId }: Props) => {
  const queryClient = useQueryClient();

  // Mutation for deleting category
  const mutation = useMutation({
    mutationFn: () => deleteSubCate(subCateId), // Gọi hàm xoá danh mục
    onSuccess: () => {
      toast.success("Xoá danh mục con thành công!");

      // Cập nhật cache ngay lập tức
      queryClient.invalidateQueries({ queryKey: ["subCate"] });

      // Đóng modal sau khi xoá thành công
      onOpenChange(false);
    },
    onError: () => {
      toast.error("Đã xảy ra lỗi khi xoá danh mục con.");
      onOpenChange(false);
    },
  });

  const handleDelete = () => {
    // Gọi mutation để thực hiện xoá danh mục
    mutation.mutate();
  };

  if (mutation.status === "pending") return <Spinner />;

  return (
    <>
      <CustomModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        title="Xoá danh mục con"
      >
        <div className="text-center">
          <p>
            Nếu bạn xoá danh mục con thì accgame trong danh mục con này cũng bị
            xoá. Bạn chắc chắn muốn xoá danh mục con này?
          </p>
          <div className="flex justify-center gap-4 mt-4">
            <Button
              color="danger"
              onPress={handleDelete}
              // isLoading={mutation.isLoading}
            >
              Xoá
            </Button>
            <Button
              color="secondary"
              onPress={() => onOpenChange(false)} // Đóng modal khi chọn Cancel
            >
              Hủy
            </Button>
          </div>
        </div>
      </CustomModal>
    </>
  );
};

export default DeleteSubCate;
