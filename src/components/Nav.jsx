import React from "react";
import { Link } from "react-router-dom";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@nextui-org/react";

const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const menuItems = ["Home", "Cari Catatan"];
  return (
    <div>
      <Navbar
        className="border-b-1 border-abu-muda"
        onMenuOpenChange={setIsMenuOpen}
      >
        <NavbarContent>
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="sm:hidden"
          />
          <NavbarBrand>
            <p className="font-bold text-inherit text-hijau-tua text-2xl">
              <strong className="text-hijau-paling-muda">Note</strong>Kuliah.
            </p>
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent justify="end">
          <NavbarItem className="hidden lg:flex ">
            <Link
              className="text-hijau-paling-muda font-semibold text-sm"
              to="/"
            >
              Home
            </Link>
          </NavbarItem>
          <NavbarItem className="hidden lg:flex">
            <Link className="text-hijau-tua font-bold text-sm">Temukan</Link>
          </NavbarItem>
          <NavbarItem>
            <Link
              className="text-hijau-tua font-semibold text-sm"
              to="/login"
            >
              Login
            </Link>
          </NavbarItem>
        </NavbarContent>
        <NavbarMenu>
          {menuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                className="w-full text-hijau-tua"
                href="#"
                size="lg"
              >
                {item}
              </Link>
            </NavbarMenuItem>
          ))}
        </NavbarMenu>
      </Navbar>
    </div>
  );
};

export default Nav;
