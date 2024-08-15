import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import RegisterPage from "./RegisterPage";
import { reducers } from "../store/index";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { MemoryRouter } from "react-router-dom";

const store = createStore(reducers);

// komponen harus ke render
describe("RegisterPage", () => {
  it("should render RegisterPage component", () => {
    const renderedRegisterPage = render(
      <Provider store={store}>
        <MemoryRouter>
          <RegisterPage />
        </MemoryRouter>
      </Provider>
    );

    expect(renderedRegisterPage).toBeDefined();
  });
});

//
