import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import { Link } from "react-router-dom";
import { IconProfile } from "../icons/icons";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const NavigationBar = ({ mail, nav }) => {
  // const mail = useSelector((store) => store.authenticated.email);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const menuItems = [
    { title: "Home", link: "/homepage" },
    { title: "Catatanku", link: "/list-user-notes" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("email");
    dispatch({ type: "LOGOUT" });
    navigate("/");
  };

  const handleProfileEdit = () => {
    navigate("/profil");
  };
  const handleSettings = () => {
    navigate("/setting");
  };

  return (
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
          <a href="/">
            <p className="font-bold text-inherit text-hijau-tua text-2xl">
              <strong className="text-hijau-paling-muda">Note</strong>Kuliah.
            </p>
          </a>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem
          isActive={nav === "homepage"}
          className="hidden lg:flex"
        >
          <Link
            className="text-hijau-muda"
            to="/homepage"
          >
            Home
          </Link>
        </NavbarItem>
        <NavbarItem
          isActive={nav === "list-user-notes-page"}
          className="hidden lg:flex"
        >
          <Link
            className="text-hijau-muda"
            to="/list-user-notes"
          >
            Catatanku
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Dropdown>
            <DropdownTrigger>
              <Button
                isIconOnly
                className="bg-transparent"
              >
                <IconProfile />
              </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Static Actions">
              <DropdownItem
                textValue="login sebagai"
                key="profile"
                className="h-14 gap-2"
              >
                <p className="font-semibold">Signed in as</p>
                <p className="font-semibold">{mail}</p>
              </DropdownItem>
              <DropdownItem
                textValue="ubah profil"
                key="edit-profile"
                onClick={handleProfileEdit}
              >
                Ubah Profil
              </DropdownItem>
              <DropdownItem
                textValue="ubah password"
                key="settings"
                onClick={handleSettings}
              >
                Ubah Password
              </DropdownItem>
              <DropdownItem
                textValue="logout"
                key="logout"
                className="text-danger"
                color="danger"
                onClick={handleLogout}
              >
                Logout
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              className="w-full text-hijau-tua"
              to={item.link}
              size="lg"
            >
              {item.title}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
};

export default NavigationBar;
