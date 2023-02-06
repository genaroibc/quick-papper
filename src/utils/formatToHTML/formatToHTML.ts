type Params = { title: string; text: string };

export function formatToHTML({ text, title }: Params) {
  const formatedTitle = title && `<h1>${title}</h1>\n`;

  const formatedParagraphs =
    text &&
    text
      .split("\n\n")
      .filter(part => part !== "")
      .map(pgph => `<p>${pgph.trim()}</p>`)
      .join("\n");

  return `${formatedTitle}${formatedParagraphs}`;
}
