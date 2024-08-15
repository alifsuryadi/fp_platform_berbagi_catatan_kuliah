import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import ProfilePage from "./ProfilePage";
import { reducers } from "../store/index";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { MemoryRouter } from "react-router-dom";

const store = createStore(reducers);

// komponen harus ke render
describe("ProfilePage", () => {
  it("should render ProfilePage component", () => {
    const renderedProfilePage = render(
      <Provider store={store}>
        <MemoryRouter>
          <ProfilePage />
        </MemoryRouter>
      </Provider>
    );

    expect(renderedProfilePage).toBeDefined();
  });
});

//
