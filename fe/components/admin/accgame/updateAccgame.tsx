"use client";
import React, { useEffect, useState } from "react";
import { Form } from "@heroui/form";
import { Input } from "@nextui-org/input";
import { Button, Select, SelectItem, Spinner } from "@heroui/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getAllSubCate } from "@/api/subCate";
import { getAllLogAcc } from "@/api/logAcc";
import ImageUpload from "../custom/uploadImage";
import { getOneAccgame, updateAccgame } from "@/api/accgame";
import CustomModal from "../custom/modal";

type Props = {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  accgameId: string;
};

const UpdateAccgame = ({ isOpen, onOpenChange, accgameId }: Props) => {
  const queryClient = useQueryClient();
  const [images, setImages] = useState<File[]>([]);
  const [photo, setPhoto] = useState<File[]>([]);
  // const [accgameData?.data?.data?, setInitialData] = useState<any>(null);

  const { data: subCategories } = useQuery({
    queryKey: ["subCate"],
    queryFn: getAllSubCate,
  });
  const { data: logAccounts } = useQuery({
    queryKey: ["logAcc"],
    queryFn: getAllLogAcc,
  });
  const { data: accgameData, isLoading } = useQuery({
    queryKey: ["accgame", accgameId],
    queryFn: () => getOneAccgame(accgameId),
    enabled: !!accgameId,
  });

  const mutation = useMutation({
    mutationFn: (accgame: FormData) => updateAccgame(accgameId, accgame),
    onSuccess: () => {
      toast.success("Cập nhật accgame thành công!");
      queryClient.invalidateQueries({ queryKey: ["accgame"] });
      onOpenChange(false);
    },
    onError: () => {
      toast.error("Đã xảy ra lỗi khi cập nhật accgame.");
    },
  });
  return (
    <>
      <CustomModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        title="Cập nhật accgame"
      >
        {isLoading ? (
          <Spinner />
        ) : (
          <Form
            className="w-full max-w-md flex flex-col gap-4"
            validationBehavior="native"
            onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              formData.append("id", accgameId);

              if (images.length > 0) {
                images.forEach((image) => {
                  formData.append("image", image);
                });
              }
              if (photo.length > 0) {
                formData.append("coverPhoto", photo[0]);
              }
              console.log(formData);
              mutation.mutate(formData);
            }}
          >
            <Input
              defaultValue={accgameData?.data?.data?.userName}
              isRequired
              label="Tên tài khoản"
              name="userName"
              type="text"
            />
            <Input
              defaultValue={accgameData?.data?.data?.password}
              isRequired
              label="Mật khẩu"
              name="password"
              type="password"
            />
            <Input
              defaultValue={accgameData?.data?.data?.description}
              isRequired
              label="Mô tả"
              name="description"
              type="text"
            />
            <Input
              defaultValue={accgameData?.data?.data?.price}
              isRequired
              label="Giá"
              name="price"
              type="number"
              min={0}
            />

            <Select
              defaultSelectedKeys={
                accgameData?.data?.data?.subCateId
                  ? [accgameData?.data?.data?.subCateId._id]
                  : []
              }
              label="Danh mục con"
              name="subCateId"
            >
              {subCategories?.data?.data?.map((subCate: any) => (
                <SelectItem key={subCate._id} value={subCate._id}>
                  {subCate.name}
                </SelectItem>
              ))}
            </Select>

            <Select
              defaultSelectedKeys={
                accgameData?.data?.data?.logAccId
                  ? [accgameData?.data?.data?.logAccId._id]
                  : []
              }
              label="Lịch sử tài khoản"
              name="logAccId"
            >
              {logAccounts?.data?.data?.map((logAcc: any) => (
                <SelectItem key={logAcc._id} value={logAcc._id}>
                  {logAcc.name}
                </SelectItem>
              ))}
            </Select>

            <ImageUpload
              length={1}
              onImageChange={setPhoto}
              defaultValue={[accgameData?.data?.data?.coverPhoto]}
            />
            <ImageUpload
              length={18}
              onImageChange={setImages}
              defaultValue={accgameData?.data?.data?.image}
            />
            <Select
              defaultSelectedKeys={
                accgameData?.data?.data?.status !== undefined
                  ? [String(accgameData?.data?.data?.status)]
                  : []
              }
              label="Trạng thái"
              name="status"
            >
              <SelectItem key="true" value="true">
                Chưa bán
              </SelectItem>
              <SelectItem key="false" value="false">
                Đã bán
              </SelectItem>
            </Select>

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
        )}
      </CustomModal>
    </>
  );
};

export default UpdateAccgame;
