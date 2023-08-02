import { Store } from "@prisma/client";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type Props = {
  isOpen: boolean;
  currentStoreLabel: string;
  setCurrentStoreLabel: (storeLabel: string) => void;
  onOpen: () => void;
  onClose: () => void;
};

export const useStoreModal = create<Props>()(
  persist(
    (set) => ({
      isOpen: false,
      currentStoreLabel: "",

      onOpen: () => set({ isOpen: true }),
      onClose: () => set({ isOpen: false }),
      setCurrentStoreLabel: (storeLabel: string) =>
        set({ currentStoreLabel: storeLabel }),
    }),
    { name: "store-modal" }
  )
);
