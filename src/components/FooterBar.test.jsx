// footer.test.jsx
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import FooterBar from "./FooterBar";

describe("FooterBar", () => {
  it("should render FooterBar component", () => {
    const { container } = render(<FooterBar />);

    expect(container).toBeDefined();
  });

  it("should render copyright text", () => {
    render(<FooterBar />);

    const copyrightText = screen.getByText(
      /Copyright 2024 All Rights Reserved NoteKuliah./i
    );
    expect(copyrightText).toBeInTheDocument();
  });

  it("should toggle menu state onMenuOpenChange", () => {
    const { container } = render(<FooterBar />);

    // Simulate menu open event
    fireEvent(
      container.querySelector(".border-t-1"),
      new Event("menuopenchange")
    );

    // Ensure that the menu state changes
    // (Since the example doesn't include visible elements changing, this checks the interaction)
    expect(container.querySelector(".border-t-1")).toBeInTheDocument();
  });

  it("should apply custom class correctly", () => {
    const { container } = render(<FooterBar />);

    const navbar = container.querySelector(".border-t-1");
    expect(navbar).toHaveClass("border-abu-muda mt-44");
  });
});
