import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { reducers } from "../store/index";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { MemoryRouter } from "react-router-dom";
import ListAllNotes from "./ListAllNotes";

const store = createStore(reducers);

// komponen harus ke render
describe("ListAllNotes", () => {
  it("should render ListAllNotes component", () => {
    const renderedListNotes = render(
      <Provider store={store}>
        <MemoryRouter>
          <ListAllNotes />
        </MemoryRouter>
      </Provider>
    );

    expect(renderedListNotes).toBeDefined();
  });
});
