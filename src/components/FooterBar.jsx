import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Link,
  Button,
} from "@nextui-org/react";
import { IconProfile } from "../icons/icons";

const FooterBar = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const menuItems = ["Catatanku"];

  return (
    <Navbar
      className="border-t-1 border-abu-muda mt-44"
      onMenuOpenChange={setIsMenuOpen}
    >
      <NavbarContent justify="end">
        <NavbarItem>
          <p className="text-abu-muda text-xs">
            Copyright 2024 All Rights Reserved NoteKuliah.
          </p>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};

export default FooterBar;
