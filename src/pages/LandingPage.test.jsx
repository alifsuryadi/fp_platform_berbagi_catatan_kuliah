import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import LandingPage from "./LandingPage";
import { reducers } from "../store/index";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { MemoryRouter } from "react-router-dom";

const store = createStore(reducers);

// komponen harus ke render
describe("LandingPage", () => {
  it("should render LandingPage component", () => {
    const renderedLandingPage = render(
      <Provider store={store}>
        <MemoryRouter>
          <LandingPage />
        </MemoryRouter>
      </Provider>
    );

    expect(renderedLandingPage).toBeDefined();
  });
});

//
