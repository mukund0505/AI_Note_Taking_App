import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const WorkspaceHeader = ({ fileName }) => {
  return (
    <div className="p-4 flex justify-between shadow-md">
      <Link href={"/dashboard"}>
        <Image src={"/logo.png"} alt="logo" height={60} width={60} />
      </Link>

      <h1 className="font-bold mt-3 pt-2 ml-2 pl-2">{fileName}</h1>
      <div className="flex items-center gap-2">
        {/* <Button>Save</Button> */}
        <UserButton />
      </div>
    </div>
  );
};

export default WorkspaceHeader;
