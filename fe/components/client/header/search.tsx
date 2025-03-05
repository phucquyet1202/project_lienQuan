import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import React from "react";
import { SearchIcon } from "../icons";
import { NavbarItem } from "@nextui-org/navbar";
import "../../../styles/header.css";

type Props = {};

const Search = (props: Props) => {
  const searchInput = (
    <Input
      aria-label="Search"
      className="w-full"
      classNames={{
        inputWrapper: "bg-default-100",
        input: "text-sm",
      }}
      endContent={
        <Button
          size="sm"
          className="text-xs text-center transition-all whitespace-nowrap whitespace-normal-sm leading-tight sm:text-sm "
        >
          Tìm Kiếm
        </Button>
      }
      labelPlacement="outside"
      placeholder="Search..."
      startContent={
        <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
      }
      type="search"
    />
  );

  return <NavbarItem className="flex min-w-10 m-2.5">{searchInput}</NavbarItem>;
};

export default Search;
