import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import NotFound from "./NotFound";

// komponen harus ke render
describe("NotFound", () => {
  it("should render NoteDetails component", () => {
    const renderedNoteDetails = render(<NotFound />);

    expect(renderedNoteDetails).toBeDefined();
  });
});
