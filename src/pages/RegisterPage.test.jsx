// registerpage.test.jsx
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import RegisterPage from "./RegisterPage";
import { reducers } from "../store/index";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { MemoryRouter } from "react-router-dom";

const store = createStore(reducers);

describe("RegisterPage", () => {
  it("should render RegisterPage component", () => {
    const { container } = render(
      <Provider store={store}>
        <MemoryRouter>
          <RegisterPage />
        </MemoryRouter>
      </Provider>
    );
    expect(container).toBeDefined();
  });

  it("should show validation error for invalid email format", async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <RegisterPage />
        </MemoryRouter>
      </Provider>
    );

    const emailInput = screen.getByLabelText(/Email/i);
    fireEvent.change(emailInput, { target: { value: "invalid-email" } });

    fireEvent.blur(emailInput);

    await waitFor(() => {
      expect(screen.getByText(/Email tidak valid/i)).toBeInTheDocument();
    });
  });
});
