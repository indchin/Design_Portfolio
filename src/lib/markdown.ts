export function markdownToHtml(markdown: string) {
  return markdown
    .split("\n")
    .map((line) => {
      if (line.startsWith("### ")) return `<h3>${line.replace("### ", "")}</h3>`;
      if (line.startsWith("## ")) return `<h2>${line.replace("## ", "")}</h2>`;
      if (line.startsWith("# ")) return `<h1>${line.replace("# ", "")}</h1>`;
      if (line.startsWith("- ")) return `<li>${line.replace("- ", "")}</li>`;
      if (!line.trim()) return "";
      return `<p>${line}</p>`;
    })
    .join("");
}
