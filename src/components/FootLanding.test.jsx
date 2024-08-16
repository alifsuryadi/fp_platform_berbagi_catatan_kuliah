// footlanding.test.jsx
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import FootLanding from "./FootLanding";

describe("FootLanding", () => {
  it("should render FootLanding component", () => {
    const { container } = render(<FootLanding />);

    expect(container).toBeDefined();
  });

  it("should render the NoteKuliah brand text correctly", () => {
    render(<FootLanding />);

    const brandText = screen.getByText(/NoteKuliah./i);
    expect(brandText).toBeInTheDocument();
    // expect(brandText).toHaveClass("text-hijau-tua text-2xl");
  });

  it("should render the 'Untuk Pemula' section with a link to register", () => {
    render(<FootLanding />);

    const sectionTitle = screen.getByText(/Untuk Pemula/i);
    const registerLink = screen.getByRole("link", { name: /Buat akun/i });

    expect(sectionTitle).toBeInTheDocument();
    expect(registerLink).toBeInTheDocument();
    expect(registerLink).toHaveAttribute("href", "/register");
  });

  it("should render the 'Hubungi Kami' section with Instagram and Github text", () => {
    render(<FootLanding />);

    const sectionTitle = screen.getByText(/Hubungi Kami/i);
    const instagramText = screen.getByText(/Instagram/i);
    const githubText = screen.getByText(/Github/i);

    expect(sectionTitle).toBeInTheDocument();
    expect(instagramText).toBeInTheDocument();
    expect(githubText).toBeInTheDocument();
  });

  it("should render the copyright text", () => {
    render(<FootLanding />);

    const copyrightText = screen.getByText(
      /Copyright 2024 All Rights Reserved NoteKuliah./i
    );
    expect(copyrightText).toBeInTheDocument();
    expect(copyrightText).toHaveClass("text-abu-muda text-xs");
  });

  it("should apply the correct classes to the Divider component", () => {
    const { container } = render(<FootLanding />);

    const divider = container.querySelector(".mt-100");
    expect(divider).toBeInTheDocument();
    expect(divider).toHaveClass("mt-100");
  });

  it("should correctly render flex containers with appropriate classes", () => {
    const { container } = render(<FootLanding />);

    const flexContainers = container.querySelectorAll(".flex");
    flexContainers.forEach((container) => {
      expect(container).toBeInTheDocument();
      expect(container).toHaveClass("flex");
    });
  });
});
