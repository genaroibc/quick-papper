export function formatToHTML(title: string, text: string) {
  const paragraphs = text
    .split("\n\n")
    .map(pgph => `<p>${pgph.trim()}</p>`)
    .join("\n");

  return `<h1>${title}</h1>\n${paragraphs}`;
}
