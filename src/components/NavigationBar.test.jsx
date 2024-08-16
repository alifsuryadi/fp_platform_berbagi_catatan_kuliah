// navigationbar.test.jsx

import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import NavigationBar from "./NavigationBar";
import { reducers } from "../store/index";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { MemoryRouter } from "react-router-dom";

const store = createStore(reducers);

describe("NavigationBar", () => {
  it("should render NavigationBar component", () => {
    const { container } = render(
      <Provider store={store}>
        <MemoryRouter>
          <NavigationBar mail="user@example.com" nav="homepage" />
        </MemoryRouter>
      </Provider>
    );
    expect(container).toBeDefined();
  });

  it("should render the 'Home' and 'Catatanku' links", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <NavigationBar mail="user@example.com" nav="homepage" />
        </MemoryRouter>
      </Provider>
    );

    const homeLink = screen.getByText(/Home/i);
    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute("href", "/homepage");

    const catatankuLink = screen.getByText(/Catatanku/i);
    expect(catatankuLink).toBeInTheDocument();
    expect(catatankuLink).toHaveAttribute("href", "/list-user-notes");
  });
});
