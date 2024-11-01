"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@repo/ui/components/ui/alert-dialog";
import { Button } from "@repo/ui/components/ui/button";
import React from "react";

interface IDeleteAlertDialogProps {
  onOpenChange?: (open: boolean) => void;
  title: string;
  description?: string;
  onCanceled?: () => void;
  onConfirmed: () => void;
  TriggerComponent: React.ReactNode;
}

const DeleteAlertDialog = ({
  onOpenChange,
  title,
  description,
  onCanceled,
  onConfirmed,
  TriggerComponent,
}: IDeleteAlertDialogProps) => {
  return (
    <AlertDialog onOpenChange={onOpenChange}>
      <AlertDialogTrigger>{TriggerComponent}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          {description && (
            <AlertDialogDescription>{description}</AlertDialogDescription>
          )}
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Dừng</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirmed} className="w-fit px-0">
            <Button variant="destructive" className="w-full px-6">
              Xoá
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteAlertDialog;
