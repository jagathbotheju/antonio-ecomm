"use client";
import { Button } from "@/components/ui/button";
import { useStoreModal } from "@/hooks/use-store-modal";
import { Store } from "@prisma/client";
import axios from "axios";
import { useEffect, useState } from "react";
import { Separator } from "@/components/ui/separator";
import StoreSwitcher from "@/components/StoreSwitcher";
import { revalidatePath, revalidateTag } from "next/cache";

const AdminDashboard = () => {
  const { onOpen, isOpen } = useStoreModal((state) => state);
  const [stores, setStores] = useState<Store[]>([]);
  const [selectedStore, setSelectedStore] = useState("");
  const [mounted, setMounted] = useState(false);
  const storeModal = useStoreModal();

  useEffect(() => {
    setMounted(true);
    const getStores = async () => {
      const response = await axios.get("/api/store");
      if (response.data.error) return;
      const stores = response.data;
      if (stores.length !== 0) {
        setStores(stores);
      }
    };

    getStores();
  }, [storeModal.currentStoreLabel]);

  return (
    <div className="flex w-full min-h-full gap-5">
      <div className="w-[20%] h-full flex flex-col p-5 gap-3">
        <Button onClick={() => onOpen()}>New Store</Button>
        <StoreSwitcher items={stores} />
      </div>

      <Separator orientation="vertical" className="shadow-lg bg-gray-300" />
      <div className="h-full w-full">
        {stores.length === 0 ? (
          <h2 className="p-10 rounded-md mt-10 font-semibold text-2xl">
            Stores Not Found, Please create New Store
          </h2>
        ) : (
          <>
            <h2 className="text-2xl font-semibold mt-5">
              {mounted && storeModal.currentStoreLabel}
            </h2>
          </>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
