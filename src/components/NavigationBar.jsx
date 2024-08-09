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

const NavigationBar = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const menuItems = ["Home", "Cari Catatan"];
  return (
    <div>
      <Navbar
        className="border-b-1 border-gray-300"
        onMenuOpenChange={setIsMenuOpen}
      >
        <NavbarContent>
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="sm:hidden"
          />
          <NavbarBrand>
            <p className="font-bold text-inherit text-green-950 text-2xl">
              <strong className="text-green-300">Note</strong>Kuliah.
            </p>
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent justify="end">
          <NavbarItem className="hidden lg:flex">
            <Link className="text-green-800 font-semibold" href="#">
              Home
            </Link>
          </NavbarItem>
          <NavbarItem className="hidden lg:flex">
            <Link className="text-green-800 font-bold" href="#">
              Cari Catatan
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link className="text-green-800 font-semibold" href="#">
              Login
            </Link>
          </NavbarItem>
        </NavbarContent>
        <NavbarMenu>
          {menuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link className="w-full text-green-800" href="#" size="lg">
                {item}
              </Link>
            </NavbarMenuItem>
          ))}
        </NavbarMenu>
      </Navbar>
    </div>
  );
};

export default NavigationBar;
