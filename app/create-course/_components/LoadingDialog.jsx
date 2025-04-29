import React from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle
} from "@/components/ui/alert-dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"
import Image from "next/image";

const LoadingDialog = ({loading}) => {
  return (
    <AlertDialog open={loading}>
      <AlertDialogContent>
        <AlertDialogHeader>
        <AlertDialogTitle>
  <VisuallyHidden>Processing Course</VisuallyHidden>
</AlertDialogTitle>
          <div className="flex flex-col items-center py-10 ">
            <Image src={'/loader.gif'} alt={"Loading..."} height={100} width={100}/>
            <h2>Please wait...  AI is working on your course</h2>
          </div>
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default LoadingDialog;
