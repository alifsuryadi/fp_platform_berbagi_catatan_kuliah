import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import NoteDetails from "./NoteDetails";
import { reducers } from "../store/index";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { MemoryRouter } from "react-router-dom";

const store = createStore(reducers);

// komponen harus ke render
describe("NoteDetails", () => {
  it("should render NoteDetails component", () => {
    const renderedNoteDetails = render(
      <Provider store={store}>
        <MemoryRouter>
          <NoteDetails />
        </MemoryRouter>
      </Provider>
    );

    expect(renderedNoteDetails).toBeDefined();
  });
});

//
