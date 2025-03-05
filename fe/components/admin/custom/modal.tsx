import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
} from "@heroui/react";

type CustomModalProps = {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  title?: string;
  children: React.ReactNode; // Nhận nội dung động từ ngoài truyền vào
};

const CustomModal = ({
  isOpen,
  onOpenChange,
  title,
  children,
}: CustomModalProps) => {
  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      scrollBehavior="inside"
      placement="center"
      className="w-full mt-[-300px] modal-box"
      style={{ zIndex: 9999 }}
    >
      {title}
      <ModalContent className="bg-white rounded-lg shadow-lg w-full max-w-md mx-4 p-4">
        {(onClose) => (
          <>
            <ModalHeader className="flex justify-center">{title}</ModalHeader>
            <ModalBody className="flex flex-col gap-4">{children}</ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default CustomModal;
