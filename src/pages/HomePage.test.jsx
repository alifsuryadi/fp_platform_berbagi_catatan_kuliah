import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import HomePage from "./HomePage";
import { reducers } from "../store/index";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { MemoryRouter } from "react-router-dom";

const store = createStore(reducers);

// komponen harus ke render
describe("HomePage", () => {
  it("should render HomePage component", () => {
    const renderedHomePage = render(
      <Provider store={store}>
        <MemoryRouter>
          <HomePage />
        </MemoryRouter>
      </Provider>
    );

    expect(renderedHomePage).toBeDefined();
  });
});

//
