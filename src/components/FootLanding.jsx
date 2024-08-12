import { Link, Navbar, NavbarContent, NavbarItem } from "@nextui-org/react";
import React from "react";

const FootLanding = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const menuItems = ["Catatanku"];
  return (
    <div>
      <Navbar
        className="border-t-1 border-abu-muda mt-20"
        onMenuOpenChange={setIsMenuOpen}
      >
        <NavbarContent justify="start">
          <NavbarItem>
            <p className="font-bold text-inherit text-green-950 text-2xl">
              <strong className="text-green-300">Note</strong>Kuliah.
            </p>
          </NavbarItem>
        </NavbarContent>
        <NavbarContent justify="end">
          <NavbarItem>
            <p className="text-gray-500 text-lg">Untuk Pemula</p>
            <Link className="text-sm">Buat Akun</Link>
          </NavbarItem>
          <NavbarItem>
            <p className="text-gray-500 text-lg">Hubungi Kami</p>
            <Link className="text-md">Instagram</Link>
            <Link className="text-md">Facebook</Link>
          </NavbarItem>
        </NavbarContent>
      </Navbar>
    </div>
  );
};

export default FootLanding;
