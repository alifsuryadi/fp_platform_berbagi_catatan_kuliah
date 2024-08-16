// loadingspinner.test.jsx
import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import LoadingSpinner from "./LoadingSpinner";

describe("LoadingSpinner", () => {
  it("should render LoadingSpinner component", () => {
    const { container } = render(<LoadingSpinner />);

    expect(container).toBeDefined();
  });
});
