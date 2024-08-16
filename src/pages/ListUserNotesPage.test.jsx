import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import ListUserNotesPage from "./ListUserNotesPage";
import { reducers } from "../store/index";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { MemoryRouter } from "react-router-dom";

const store = createStore(reducers);

// komponen harus ke render
describe("ListUserNotesPage", () => {
  it("should render ListUserNotesPage component", () => {
    const renderedListUserNotesPage = render(
      <Provider store={store}>
        <MemoryRouter>
          <ListUserNotesPage />
        </MemoryRouter>
      </Provider>
    );

    expect(renderedListUserNotesPage).toBeDefined();
  });
});

//
