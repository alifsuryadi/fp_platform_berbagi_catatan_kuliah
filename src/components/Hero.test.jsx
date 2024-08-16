// hero.test.jsx
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Hero from "./Hero";
import { MemoryRouter } from "react-router-dom";

describe("Hero", () => {
  it("should render Hero component", () => {
    const { container } = render(
      <MemoryRouter>
        <Hero />
      </MemoryRouter>
    );

    expect(container).toBeDefined();
  });

  it("should render the welcome message", () => {
    render(
      <MemoryRouter>
        <Hero />
      </MemoryRouter>
    );

    const welcomeMessage = screen.getByText(/Selamat Datang di NoteKuliah/i);
    expect(welcomeMessage).toBeInTheDocument();
    expect(welcomeMessage).toHaveClass(
      "text-white font-semibold tracking-widest font-poppins"
    );
  });

  it("should render the main headline", () => {
    render(
      <MemoryRouter>
        <Hero />
      </MemoryRouter>
    );

    const headline = screen.getByText(
      /Temukan dan bagikan catatan kuliah terbaik/i
    );
    expect(headline).toBeInTheDocument();
    expect(headline).toHaveClass(
      "mt-8 mb-6 text-4xl lg:text-5xl font-bold text-white"
    );
  });

  it("should render the description text", () => {
    render(
      <MemoryRouter>
        <Hero />
      </MemoryRouter>
    );

    const description = screen.getByText(
      /Bergabung sekarang dan jadilah bagian dari komunitas/i
    );
    expect(description).toBeInTheDocument();
    expect(description).toHaveClass(
      "max-w-3xl mx-auto mb-10 text-lg text-white"
    );
  });

  it("should render the 'Gabung Sekarang' button with correct link", () => {
    render(
      <MemoryRouter>
        <Hero />
      </MemoryRouter>
    );

    const joinButton = screen.getByRole("link", { name: /Gabung Sekarang/i });
    expect(joinButton).toBeInTheDocument();
    expect(joinButton).toHaveAttribute("href", "/register");
    expect(joinButton).toHaveClass(
      "inline-block w-full md:w-auto mb-4 md:mr-6 py-5 px-8 text-sm font-bold uppercase border-2 border-transparent bg-abu-muda rounded hover:bg-gray-100 text-white transition duration-200"
    );
  });

  // it("should render the background image", () => {
  //   render(
  //     <MemoryRouter>
  //       <Hero />
  //     </MemoryRouter>
  //   );

  //   const backgroundImageDiv = screen.getByRole("banner"); // This is the outermost div
  //   expect(backgroundImageDiv).toHaveStyle({
  //     backgroundImage: `url("https://images.pexels.com/photos/733852/pexels-photo-733852.jpeg")`,
  //   });
  // });
});
