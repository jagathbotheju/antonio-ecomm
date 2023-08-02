"use client";

import { useParams, usePathname } from "next/navigation";

const NavbarItems = () => {
  const pathName = usePathname();
  const params = useParams();

  return (
    <nav className="flex items-center space-x-4 lg:space-x-6">NavbarItems</nav>
  );
};

export default NavbarItems;
