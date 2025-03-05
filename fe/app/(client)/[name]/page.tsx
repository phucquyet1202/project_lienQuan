"use client";
import ListAccgame from "@/components/client/cusstomCard/listAccgame";
import { Card } from "@heroui/react";
import React from "react";

type Props = {};

const AccGamePage = (props: Props) => {
  return (
    <>
      <Card className="mt-10 px-4">
        <ListAccgame />
      </Card>
    </>
  );
};

export default AccGamePage;
