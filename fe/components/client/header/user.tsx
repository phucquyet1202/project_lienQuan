import React from "react";
import { Button } from "@nextui-org/button";
import { NavbarItem } from "@nextui-org/navbar";
import { useDisclosure } from "@nextui-org/modal";
import SignIn from "../Modal/signIn";
import Register from "../Modal/register";
import "../../../styles/header.css";
type Props = {};

const User = (props: Props) => {
  const {
    isOpen: isSignInOpen,
    onOpen: onSignInOpen,
    onOpenChange: onSignInOpenChange,
  } = useDisclosure();
  const {
    isOpen: isRegisterOpen,
    onOpen: onRegisterOpen,
    onOpenChange: onRegisterOpenChange,
  } = useDisclosure();

  return (
    <div className="flex gap-2 items-center">
      {/* Đăng nhập */}
      <NavbarItem>
        <Button
          onClick={() => onSignInOpen()}
          size="sm"
          className="text-xs font-medium text-center transition-all whitespace-nowrap whitespace-normal-sm"
        >
          Đăng nhập
          <SignIn
            isOpen={isSignInOpen}
            onOpenChange={onSignInOpenChange}
            onOpenRegister={onRegisterOpenChange}
          />
        </Button>
      </NavbarItem>

      {/* Đăng ký */}
      <NavbarItem>
        <Button
          onClick={() => onRegisterOpen()}
          size="sm"
          className=" text-xs font-medium text-center transition-all whitespace-nowrap whitespace-normal-sm"
        >
          Đăng ký
          <Register
            isOpen={isRegisterOpen}
            onOpenChange={onRegisterOpenChange}
            onOpenSignIn={onSignInOpenChange}
          />
        </Button>
      </NavbarItem>
    </div>
  );
};

export default User;
