import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import ListNotes from "./ListNotes";
import { reducers } from "../store/index";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { MemoryRouter } from "react-router-dom";

const store = createStore(reducers);

// komponen harus ke render
describe("ListNotes", () => {
  it("should render ListNotes component", () => {
    const renderedListNotes = render(
      <Provider store={store}>
        <MemoryRouter>
          <ListNotes />
        </MemoryRouter>
      </Provider>
    );

    expect(renderedListNotes).toBeDefined();
  });
});

//
