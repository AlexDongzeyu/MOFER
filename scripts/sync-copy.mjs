import assert from "node:assert/strict";
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { parse } from "parse5";

const root = path.resolve(import.meta.dirname, "..");
const english = JSON.parse(await readFile(path.join(root, "assets/i18n/en.json"), "utf8")).strings;

for (const route of ["index.html", "about.html", "collections.html", "exhibitions.html", "research.html", "contact.html", "404.html"]) {
  const file = path.join(root, route);
  let source = await readFile(file, "utf8");
  const document = parse(source, { sourceCodeLocationInfo: true });
  const changes = [];

  function visit(node) {
    const key = node.attrs?.find((attribute) => attribute.name === "data-i18n")?.value;
    if (key) {
      assert.equal(typeof english[key], "string", `Missing English copy: ${key}`);
      assert(!node.childNodes.some((child) => child.tagName), `Nested markup in ${key} requires a manual edit`);
      const start = node.sourceCodeLocation.startTag.endOffset;
      const end = node.sourceCodeLocation.endTag.startOffset;
      const previous = source.slice(start, end);
      const leading = previous.match(/^\s*/u)[0];
      const trailing = previous.match(/\s*$/u)[0];
      const text = english[key].replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
      const replacement = leading + text + trailing;
      if (previous !== replacement) changes.push({ start, end, replacement });
    }
    for (const child of node.childNodes || []) visit(child);
  }

  visit(document);
  for (const change of changes.sort((first, second) => second.start - first.start)) {
    source = source.slice(0, change.start) + change.replacement + source.slice(change.end);
  }
  if (changes.length) await writeFile(file, source);
  console.log(`${route}: synchronized ${changes.length} English text fields`);
}