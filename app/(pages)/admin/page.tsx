"use client";
import { useStoreModal } from "@/hooks/use-store-modal";
import { useEffect } from "react";

const AdminDashboard = () => {
  const { onOpen, isOpen } = useStoreModal((state) => state);

  useEffect(() => {
    if (!isOpen) {
      onOpen();
    }
  }, [isOpen, onOpen]);

  return <div>AdminDashboard</div>;
};

export default AdminDashboard;
