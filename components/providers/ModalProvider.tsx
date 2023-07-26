"use client";

import { useEffect, useState } from "react";
import StoreModel from "../StoreModel";

const ModalProvider = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return <StoreModel />;
};

export default ModalProvider;
