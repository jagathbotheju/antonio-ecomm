"use client";
import { useStoreModal } from "@/hooks/use-store-modal";
import ModalDialog from "./ui/modal";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import { revalidatePath } from "next/cache";

const formSchema = z.object({
  name: z.string().min(1),
});

const StoreModel = () => {
  const [loading, setLoading] = useState(false);
  const storeModal = useStoreModal();
  const session = useSession();
  const user = session.data?.user;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const data = {
      name: values.name,
      userId: user?.name,
    };

    try {
      setLoading(true);
      const response = await axios.post("/api/store/", data);
      if (response.data) {
        storeModal.setCurrentStoreLabel(response.data.name);
        storeModal.onClose();
        toast.success("Store created Successfully");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ModalDialog
      title="Create Store"
      description="Add a new Store to manage products and categories"
      isOpen={storeModal.isOpen}
      onClose={storeModal.onClose}
    >
      <div>
        <div className="space-y-4 py-2 pb-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              {/* name */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder="E-Commerce"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="pt-6 space-x-2 flex items-center justify-end w-ful">
                <Button
                  disabled={loading}
                  variant="outline"
                  onClick={() => {
                    storeModal.onClose();
                    form.reset({ name: "" });
                  }}
                >
                  Cancel
                </Button>
                <Button disabled={loading} type="submit">
                  Continue
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </ModalDialog>
  );
};

export default StoreModel;
