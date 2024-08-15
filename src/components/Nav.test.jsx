// nav.test.jsx
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Nav from "./Nav";
import { reducers } from "../store/index";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { MemoryRouter } from "react-router-dom";

const store = createStore(reducers);

describe("Nav", () => {
  it("should render Nav component", () => {
    const { container } = render(
      <Provider store={store}>
        <MemoryRouter>
          <Nav auth={false} />
        </MemoryRouter>
      </Provider>
    );

    expect(container).toBeDefined();
  });

  // it("should render the brand name correctly", () => {
  //   render(
  //     <Provider store={store}>
  //       <MemoryRouter>
  //         <Nav auth={false} />
  //       </MemoryRouter>
  //     </Provider>
  //   );

  //   const brandName = screen.getByText(
  //     (content, element) =>
  //       content.startsWith("Note") && content.endsWith("Kuliah.")
  //   );
  //   expect(brandName).toBeInTheDocument();
  //   expect(brandName).toHaveClass(
  //     "font-bold text-inherit text-hijau-tua text-2xl"
  //   );
  // });

  it("should render 'Temukan' link when user is authenticated", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Nav auth={true} />
        </MemoryRouter>
      </Provider>
    );

    const temukanLink = screen.getByText(/Temukan/i);
    expect(temukanLink).toBeInTheDocument();
    expect(temukanLink).toHaveAttribute("href", "/homepage");
  });

  it("should render 'Login' link when user is not authenticated", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Nav auth={false} />
        </MemoryRouter>
      </Provider>
    );

    const loginLink = screen.getByText(/Login/i);
    expect(loginLink).toBeInTheDocument();
    expect(loginLink).toHaveAttribute("href", "/login");
  });

  // it("should render 'Logout' link and handle logout when user is authenticated", () => {
  //   const mockNavigate = vi.fn();
  //   const mockDispatch = vi.fn();
  //   vi.spyOn(React, "useNavigate").mockReturnValue(mockNavigate);
  //   vi.spyOn(React, "useDispatch").mockReturnValue(mockDispatch);
  //   vi.spyOn(toast, "success").mockImplementation(() => {});

  //   render(
  //     <Provider store={store}>
  //       <MemoryRouter>
  //         <Nav auth={true} />
  //       </MemoryRouter>
  //     </Provider>
  //   );

  //   const logoutLink = screen.getByText(/Logout/i);
  //   expect(logoutLink).toBeInTheDocument();

  //   fireEvent.click(logoutLink);

  //   expect(mockDispatch).toHaveBeenCalledWith({ type: "LOGOUT" });
  //   expect(toast.success).toHaveBeenCalledWith("Logout Success");
  //   expect(mockNavigate).toHaveBeenCalledWith("/");
  // });

  it("should toggle the mobile menu when the menu toggle button is clicked", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Nav auth={true} />
        </MemoryRouter>
      </Provider>
    );

    const menuToggleButton = screen.getByLabelText(/Open menu/i);
    fireEvent.click(menuToggleButton);

    const menuItems = screen.getAllByText(/Temukan/i);
    expect(menuItems[1]).toBeInTheDocument();
  });
});
