// loginpage.test.jsx
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import LoginPage from "./LoginPage";
import { reducers } from "../store/index";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { MemoryRouter } from "react-router-dom";
import { axiosInstance } from "../lib/axios";
import { toast } from "react-toastify";

const store = createStore(reducers);

describe("LoginPage", () => {
  it("should render the LoginPage component", () => {
    const { container } = render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>
    );
    expect(container).toBeDefined();
  });

  it("should display email and password input fields", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>
    );

    const emailInput = screen.getByLabelText(/Email/i);
    const passwordInput = screen.getByLabelText(/Kata Sandi/i);

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
  });

  it("should show validation error for empty email and password fields", async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>
    );

    const submitButton = screen.getByRole("button", { name: /Masuk/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      const emailError = screen.getByText(/Kolom ini harus diisi/i);
      const passwordError = screen.getByText(
        /Password harus memiliki minimal 6 karakter/i
      );

      expect(emailError).toBeInTheDocument();
      expect(passwordError).toBeInTheDocument();
    });
  });

  it("should show validation error for invalid email format", async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>
    );

    const emailInput = screen.getByLabelText(/Email/i);
    fireEvent.change(emailInput, { target: { value: "invalid-email" } });

    fireEvent.blur(emailInput);

    await waitFor(() => {
      const emailError = screen.getByText(/Email tidak valid/i);
      expect(emailError).toBeInTheDocument();
    });
  });

  // it("should handle form submission and show toast on successful login", async () => {
  //   const mockUser = {
  //     id: 1,
  //     email: "user@example.com",
  //     password: "password123",
  //     nama: "User",
  //     deskripsi: "Test user",
  //   };

  //   vi.spyOn(axiosInstance, "get").mockResolvedValue({ data: [mockUser] });
  //   const mockDispatch = vi.fn();
  //   vi.spyOn(require("react-redux"), "useDispatch").mockReturnValue(
  //     mockDispatch
  //   );
  //   const mockNavigate = vi.fn();
  //   vi.spyOn(require("react-router-dom"), "useNavigate").mockReturnValue(
  //     mockNavigate
  //   );
  //   vi.spyOn(toast, "success").mockImplementation(() => {});

  //   render(
  //     <Provider store={store}>
  //       <MemoryRouter>
  //         <LoginPage />
  //       </MemoryRouter>
  //     </Provider>
  //   );

  //   const emailInput = screen.getByLabelText(/Email/i);
  //   const passwordInput = screen.getByLabelText(/Kata Sandi/i);

  //   fireEvent.change(emailInput, { target: { value: "user@example.com" } });
  //   fireEvent.change(passwordInput, { target: { value: "password123" } });

  //   const submitButton = screen.getByRole("button", { name: /Masuk/i });
  //   fireEvent.click(submitButton);

  //   await waitFor(() => {
  //     expect(mockDispatch).toHaveBeenCalledWith({
  //       type: "SET_TOKEN",
  //       email: "user@example.com",
  //     });
  //     expect(toast.success).toHaveBeenCalledWith("Login Berhasil");
  //     expect(mockNavigate).toHaveBeenCalledWith("/homepage");
  //   });
  // });

  it("should show error toast for incorrect password", async () => {
    const mockUser = {
      id: 1,
      email: "user@example.com",
      password: "password123",
      nama: "User",
      deskripsi: "Test user",
    };

    vi.spyOn(axiosInstance, "get").mockResolvedValue({ data: [mockUser] });
    vi.spyOn(toast, "error").mockImplementation(() => {});

    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>
    );

    const emailInput = screen.getByLabelText(/Email/i);
    const passwordInput = screen.getByLabelText(/Kata Sandi/i);

    fireEvent.change(emailInput, { target: { value: "user@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "wrongpassword" } });

    const submitButton = screen.getByRole("button", { name: /Masuk/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith("Password Salah");
    });
  });

  // it("should show error toast for non-existing email", async () => {
  //   vi.spyOn(axiosInstance, "get").mockResolvedValue({ data: [] });
  //   vi.spyOn(toast, "error").mockImplementation(() => {});

  //   render(
  //     <Provider store={store}>
  //       <MemoryRouter>
  //         <LoginPage />
  //       </MemoryRouter>
  //     </Provider>
  //   );

  //   const emailInput = screen.getByLabelText(/Email/i);
  //   const passwordInput = screen.getByLabelText(/Kata Sandi/i);

  //   fireEvent.change(emailInput, {
  //     target: { value: "nonexistent@example.com" },
  //   });
  //   fireEvent.change(passwordInput, { target: { value: "password123" } });

  //   const submitButton = screen.getByRole("button", { name: /Masuk/i });
  //   fireEvent.click(submitButton);

  //   await waitFor(() => {
  //     expect(toast.error).toHaveBeenCalledWith("Email Salah");
  //   });
  // });
});
