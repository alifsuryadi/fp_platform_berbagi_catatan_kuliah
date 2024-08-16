// landingpage.test.jsx
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import LandingPage from "./LandingPage";
import { reducers } from "../store/index";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { MemoryRouter } from "react-router-dom";

const store = createStore(reducers);

describe("LandingPage", () => {
  it("should render LandingPage component", () => {
    const { container } = render(
      <Provider store={store}>
        <MemoryRouter>
          <LandingPage />
        </MemoryRouter>
      </Provider>
    );
    expect(container).toBeDefined();
  });

  it("should render the Nav component", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <LandingPage />
        </MemoryRouter>
      </Provider>
    );

    const navElement = screen.getByRole("navigation");
    expect(navElement).toBeInTheDocument();
  });

  it("should render the Hero component", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <LandingPage />
        </MemoryRouter>
      </Provider>
    );

    const heroText = screen.getByText(/Selamat Datang di NoteKuliah/i);
    expect(heroText).toBeInTheDocument();
  });

  it("should render the Why NoteKuliah section", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <LandingPage />
        </MemoryRouter>
      </Provider>
    );

    const sectionTitle = screen.getByText(/Kenapa NoteKuliah?/i);
    expect(sectionTitle).toBeInTheDocument();

    const sharedKnowledgeText = screen.getByText(/Berbagi Pengetahuan/i);
    const easyAccessText = screen.getByText(/Akses Mudah/i);

    expect(sharedKnowledgeText).toBeInTheDocument();
    expect(easyAccessText).toBeInTheDocument();
  });

  it("should render the Explore Categories section", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <LandingPage />
        </MemoryRouter>
      </Provider>
    );

    const exploreCategoriesText = screen.getByText(
      /Jelajahi Berbagai Kategori Catatan/i
    );
    expect(exploreCategoriesText).toBeInTheDocument();

    const categories = [
      "Ilmu Pengetahuan Alam",
      "Matematika",
      "Teknik",
      "Komputer & Teknologi Informasi",
      "Ilmu Kesehatan",
    ];

    categories.forEach((category) => {
      const categoryElement = screen.getByText(category);
      expect(categoryElement).toBeInTheDocument();
    });
  });

  it("should render the FootLanding component", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <LandingPage />
        </MemoryRouter>
      </Provider>
    );

    const footerText = screen.getByText(
      /Copyright 2024 All Rights Reserved NoteKuliah/i
    );
    expect(footerText).toBeInTheDocument();
  });
});
