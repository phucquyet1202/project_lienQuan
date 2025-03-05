import React, { useState } from "react";
import { Button, Form } from "@heroui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { Input } from "@nextui-org/input";
import CustomModal from "@/components/admin/custom/modal";
import "../../../styles/modal.css";

type Props = {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onOpenSignIn: () => void;
};

const Register = ({ isOpen, onOpenChange, onOpenSignIn }: Props) => {
  const [action, setAction] = useState<string | null>(null);
  const [userName, setuserName] = useState("");
  const [showPass, setShowPass] = useState(false);
  const toggleShowuserName = () => {
    setShowPass(!showPass);
  };
  const toggleShowPassword = () => {
    setShowPass((prev) => !prev);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(e.currentTarget));
    console.log("Form Data:", formData);
  };

  return (
    <CustomModal isOpen={isOpen} onOpenChange={onOpenChange} title="Đăng Ký">
      <Form
        className="w-full flex flex-col gap-4"
        validationBehavior="native"
        onSubmit={(e) => {
          e.preventDefault();
          let data = Object.fromEntries(new FormData(e.currentTarget));

          setAction(`submit ${JSON.stringify(data)}`);
        }}
      >
        <Input
          isRequired
          errorMessage="Vui lòng nhập tên tài khoản"
          label="UserName"
          labelPlacement="outside"
          name="userName"
          placeholder="Nhập Tên tài khoản"
          type="text"
        />
        <div className="relative w-full">
          {" "}
          <Input
            isRequired
            errorMessage="Vui lòng nhập Mật khẩu"
            label="Password"
            labelPlacement="outside"
            name="password"
            type={showPass ? "text" : "password"}
            value={userName}
            onChange={(e) => setuserName(e.target.value)}
            placeholder="Nhập mật khẩu"
            isClearable
            fullWidth
          />{" "}
          <span
            onClick={toggleShowuserName}
            className="absolute inset-y-0 right-0 flex items-center pr-3 pt-7 cursor-pointer"
          >
            {" "}
            <FontAwesomeIcon icon={showPass ? faEyeSlash : faEye} />{" "}
          </span>{" "}
        </div>

        <div className="flex items-center ">
          <p>Bạn đã có tài khoản: </p>
          <Button
            className="border-none bg-transparent text-blue-500 hover:underline p-0 m-0 focus:outline-none px-2"
            style={{
              background: "none",
              border: "none",
              fontSize: "13px",
            }}
            onClick={() => {
              onOpenChange(false);
              onOpenSignIn();
            }}
          >
            Đăng Nhập
          </Button>
        </div>
        <div className="flex justify-center w-full">
          <Button className="" color="primary" type="submit">
            Đăng Ký
          </Button>
        </div>
      </Form>
    </CustomModal>
  );
};

export default Register;
