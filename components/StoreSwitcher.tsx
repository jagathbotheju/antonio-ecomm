"use client";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Store } from "@prisma/client";
import {
  ChevronsUpDown,
  Store as StoreIcon,
  Check,
  PlusCircle,
} from "lucide-react";
import { Button } from "./ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "./ui/command";
import { cn } from "@/lib/utils";
import StoreModel from "./StoreModel";
import { useStoreModal } from "@/hooks/use-store-modal";

interface Props {
  items: Store[];
}

const StoreSwitcher = ({ items = [] }: Props) => {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const storeModal = useStoreModal((state) => state);

  const formattedItems = items.map((item) => ({
    label: item.name,
    value: item.id,
  }));

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          role="combobox"
          aria-expanded={open}
          aria-label="Select a store"
          className="w-[200px] justify-between"
        >
          <StoreIcon className="mr-2 h-4 w-4" />
          {mounted && storeModal.currentStoreLabel
            ? storeModal.currentStoreLabel
            : "Select a Store"}
          <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandList>
            <CommandInput placeholder="Select a Store" />
            <CommandEmpty>No Stores Found</CommandEmpty>
            <CommandGroup heading="Stores">
              {formattedItems.map((item) => (
                <CommandItem
                  key={item.value}
                  onSelect={(currentValue) => {
                    storeModal.setCurrentStoreLabel(currentValue);
                    setOpen(false);
                  }}
                  className="text-sm"
                >
                  <StoreIcon className="mr-2 h-4 w-4" />
                  {item.label}
                  <Check
                    className={cn(
                      "ml-4 h-4 w-4",
                      storeModal.currentStoreLabel === item.label
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>

          <CommandSeparator />
          <CommandList>
            <CommandGroup>
              <CommandItem
                onSelect={() => {
                  setOpen(false);
                  storeModal.onOpen();
                }}
              >
                <PlusCircle className="mr-2 h-5 w-5" />
                Create Store
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default StoreSwitcher;
