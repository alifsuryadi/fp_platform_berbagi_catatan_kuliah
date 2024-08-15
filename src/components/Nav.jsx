import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@nextui-org/react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const Nav = ({ auth }) => {
  // const isAuth = useSelector((store) => store.authenticated.isAuthenticated);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("email");
    dispatch({ type: "LOGOUT" });
    toast.success("Logout Success");
    navigate("/");
  };

  const menuItems = [{ title: "Temukan", link: "/homepage" }];
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
            <a href="/">
              <p className="font-bold text-inherit text-hijau-tua text-2xl">
                <strong className="text-hijau-paling-muda">Note</strong>Kuliah.
              </p>
            </a>
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent justify="end">
          <NavbarItem className="hidden lg:flex "></NavbarItem>
          <NavbarItem className="hidden lg:flex">
            <Link
              className="text-hijau-muda text-sm"
              to="/homepage"
            >
              Temukan
            </Link>
          </NavbarItem>
          <NavbarItem>
            {auth ? (
              <Link
                className="text-hijau-muda text-sm"
                onClick={handleLogout}
              >
                Logout
              </Link>
            ) : (
              <Link
                className="text-hijau-muda text-sm"
                to="/login"
              >
                Login
              </Link>
            )}
          </NavbarItem>
        </NavbarContent>
        <NavbarMenu>
          {menuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                className="w-full text-hijau-tua"
                to={item.link}
              >
                {item.title}
              </Link>
            </NavbarMenuItem>
          ))}
        </NavbarMenu>
      </Navbar>
    </div>
  );
};

export default Nav;
