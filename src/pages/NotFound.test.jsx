// notfound.test.jsx
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import NotFound from "./NotFound";

describe("NotFound", () => {
  it("should render the NotFound component", () => {
    const { container } = render(<NotFound />);
    expect(container).toBeDefined();
  });

  it("should display the 404 image", () => {
    render(<NotFound />);

    const image = screen.getByRole("img");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute(
      "src",
      "https://img.freepik.com/free-vector/404-error-with-landscape-concept-illustration_114360-7898.jpg?t=st=1723628461~exp=1723632061~hmac=3301b61c67284516d8cc947ad344370129a7143d5b2c21d0db37e7064fe6b52f&w=996"
    );
  });

  it("should display the correct text", () => {
    render(<NotFound />);

    const notFoundText = screen.getByText(/Halaman tidak ditemukan!/i);
    expect(notFoundText).toBeInTheDocument();
    expect(notFoundText).toHaveClass("text-large font-bold text-abu-gelap");
  });

  it("should render the 'Kembali' button", () => {
    render(<NotFound />);

    const backButton = screen.getByRole("button", { name: /Kembali/i });
    expect(backButton).toBeInTheDocument();
    expect(backButton).toHaveClass("text-white bg-hijau-muda");
  });

  // it("should call the backTo function when the 'Kembali' button is clicked", () => {
  //   const mockBackTo = vi.fn();
  //   const OriginalNotFound = NotFound;

  //   const TestComponent = () => {
  //     const backTo = mockBackTo;
  //     return <OriginalNotFound backTo={backTo} />;
  //   };

  //   render(<TestComponent />);

  //   const backButton = screen.getByRole("button", { name: /Kembali/i });
  //   fireEvent.click(backButton);

  //   expect(mockBackTo).toHaveBeenCalled();
  // });
});
