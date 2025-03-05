"use client";

import { useState, useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import { Card, CardBody, Button } from "@nextui-org/react";
import { Upload, Trash2 } from "lucide-react";

type Props = {
  length: number;
  onImageChange: (newImages: File[], oldImages: { url: string }[]) => void;
  defaultValue?: string[]; // Thêm giá trị mặc định cho ảnh
};

export default function ImageUpload({
  length,
  onImageChange,
  defaultValue = [],
}: Props) {
  if (length <= 0) {
    return (
      <p className="text-red-500 text-sm text-center">
        Lỗi: Số lượng ảnh tối đa phải lớn hơn 0!
      </p>
    );
  }

  const maxFiles = length;

  // Chuyển defaultValue thành danh sách ảnh ban đầu
  const [images, setImages] = useState<{ url: any; file?: File }[]>([]);

  // useEffect to reset images if defaultValue changes
  useEffect(() => {
    setImages(defaultValue.map((url) => ({ url }))); // Lưu ảnh mặc định nếu defaultValue có giá trị
  }, []); // Chỉ theo dõi defaultValue

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const newImages = acceptedFiles.map((file) => {
        return new Promise<{ url: string; file: File }>((resolve) => {
          const reader = new FileReader();
          reader.onload = () => resolve({ url: reader.result as string, file });
          reader.readAsDataURL(file);
        });
      });

      Promise.all(newImages).then((results) => {
        const updatedImages = [...images, ...results].slice(0, maxFiles);
        setImages(updatedImages);

        // Gửi ảnh mới và ảnh chưa thay đổi
        onImageChange(
          results.map((img) => img.file!).filter(Boolean), // Chỉ gửi file mới
          updatedImages
            .filter((img) => !img.file)
            .map((img) => ({ url: img.url })) // Chỉ gửi ảnh chưa thay đổi (chứa url)
        );
      });
    },
    [images, onImageChange]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    maxFiles: maxFiles - images.length,
  });

  const removeImage = (index: number) => {
    const updatedImages = images.filter((_, i) => i !== index); // Lọc ảnh theo index để xóa
    console.log(updatedImages);
    setImages(updatedImages); // Cập nhật lại state với các ảnh còn lại

    // Gửi lại những ảnh đã thay đổi
    onImageChange(
      updatedImages.filter((img) => img.file).map((img) => img.file!), // Ảnh mới (file)
      updatedImages.filter((img) => !img.file).map((img) => ({ url: img.url })) // Ảnh chưa thay đổi (url)
    );
  };

  return (
    <Card
      style={{ border: "none", boxShadow: "none" }}
      className="max-w-md p-4 mx-auto"
    >
      <CardBody>
        <h3 className="text-lg font-semibold">Upload ảnh</h3>
        <div className="grid grid-cols-3 gap-6">
          {images.map((img, index) => {
            console.log(img);
            return (
              <div
                key={index}
                className="relative group border rounded-lg p-2 bg-gray-100"
              >
                {img.url && (
                  <Image
                    src={img?.url?.url || img.url || ""}
                    alt={`Uploaded ${index}`}
                    width={100}
                    height={100}
                    className="rounded-lg object-cover w-full h-24"
                  />
                )}
                <Button
                  isIconOnly
                  variant="light"
                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition"
                  onClick={() => removeImage(index)}
                >
                  <Trash2 size={17} />
                </Button>
              </div>
            );
          })}

          {images.length < maxFiles && (
            <div
              {...getRootProps()}
              className="border-2 border-dashed border-gray-300 p-6 text-center cursor-pointer rounded-lg flex items-center justify-center"
            >
              <input {...getInputProps()} />
              <Upload size={32} className="text-gray-500" />
            </div>
          )}
        </div>
      </CardBody>
    </Card>
  );
}
