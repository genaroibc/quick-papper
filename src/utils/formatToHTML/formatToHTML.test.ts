import { formatToHTML } from "./formatToHTML";
import { describe, expect, it } from "vitest";

describe("formatToHTML util", () => {
  it("returns an empty string if no title and content are provided", () => {
    expect(formatToHTML({ title: "", text: "" })).toBe("");
  });

  it("formats only the title if the content is not provided", () => {
    const formatedTitle = formatToHTML({ title: "An epic title", text: "" });

    expect(formatedTitle).toBe("<h1>An epic title</h1>\n");
  });

  it("formats only the content if the title is not provided", () => {
    const formatedParagraph = formatToHTML({
      title: "",
      text: "Some paragraph"
    });

    expect(formatedParagraph).toBe("<p>Some paragraph</p>");
  });

  it("formats title and content if both are provided", () => {
    const formatedText = formatToHTML({
      title: "Awesome title",
      text: "First paragraph\n\nSecond paragraph\n\nThird paragraph"
    });

    expect(formatedText).toBe(
      "<h1>Awesome title</h1>\n<p>First paragraph</p>\n<p>Second paragraph</p>\n<p>Third paragraph</p>"
    );
  });

  it("does not create a new paragraph when finds only one new-line character", () => {
    const formatedText = formatToHTML({
      title: "",
      text: "This paragraph has a new line here.\nBut it does not creates a new paragraph\nIt just creates a new one when there are two new-line characters\n\nLike here!"
    });

    expect(formatedText).toBe(
      "<p>This paragraph has a new line here.\nBut it does not creates a new paragraph\nIt just creates a new one when there are two new-line characters</p>\n<p>Like here!</p>"
    );
  });
});
