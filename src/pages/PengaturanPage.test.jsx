import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import PengaturanPage from "./PengaturanPage";
import { reducers } from "../store/index";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { MemoryRouter } from "react-router-dom";

const store = createStore(reducers);

// komponen harus ke render
describe("PengaturanPage", () => {
  it("should render PengaturanPage component", () => {
    const renderedPengaturanPage = render(
      <Provider store={store}>
        <MemoryRouter>
          <PengaturanPage />
        </MemoryRouter>
      </Provider>
    );

    expect(renderedPengaturanPage).toBeDefined();
  });
});
