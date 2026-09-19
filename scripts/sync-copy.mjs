import assert from "node:assert/strict";
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { runInNewContext } from "node:vm";
import { parse } from "parse5";

const root = path.resolve(import.meta.dirname, "..");
const script = await readFile(path.join(root, "script.js"), "utf8");
const boundary = script.indexOf("\nlet currentLanguage =");
assert(boundary > 0, "Cannot locate the end of the static museum content");
const chinese = runInNewContext(`${script.slice(0, boundary)}\ntranslations.zh`, {}, { timeout: 1000 });

for (const route of ["index.html", "collections.html", "exhibitions.html"]) {
  const file = path.join(root, route);
  let source = await readFile(file, "utf8");
  const document = parse(source, { sourceCodeLocationInfo: true });
  const changes = [];

  function visit(node) {
    const key = node.attrs?.find((attribute) => attribute.name === "data-i18n")?.value;
    if (key) {
      assert.equal(typeof chinese[key], "string", `Missing Chinese copy: ${key}`);
      assert(!node.childNodes.some((child) => child.tagName), `Nested markup in ${key} requires a manual edit`);
      const start = node.sourceCodeLocation.startTag.endOffset;
      const end = node.sourceCodeLocation.endTag.startOffset;
      const previous = source.slice(start, end);
      const leading = previous.match(/^\s*/u)[0];
      const trailing = previous.match(/\s*$/u)[0];
      const text = chinese[key].replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
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
  console.log(`${route}: synchronized ${changes.length} Chinese text fields`);
}