const fs = require("fs");

const keepNums = new Set([
  "106","107","108","109","110","111","112",
  "00","01","02","03","05",
  "20","28","29","30",
  "32","33","34",
  "36","37","38",
  "41","42","43",
  "45","46",
  "48","49","50",
  "52","53","54","55","56",
  "58","59",
  "60","61",
  "63","64","65","66",
  "68","69","70","71",
  "73","74","75","76","77",
  "79","80","81",
  "83","85",
  "88","89","90","91",
  "93","94",
  "96","97","98",
  "101","102","103","104"
]);

const data = fs.readFileSync("src/data/stream.ts", "utf8");

// Extract everything before the array
const arrayStartMarker = "export const stream: StreamEntry[] = [";
const arrayStartIdx = data.indexOf(arrayStartMarker);
const header = data.slice(0, arrayStartIdx);

// Extract everything after the array (from entryDescription)
const arrayEndIdx = data.indexOf("];", arrayStartIdx);
const tail = data.slice(arrayEndIdx + 2);

const arrayContents = data.slice(arrayStartIdx + arrayStartMarker.length, arrayEndIdx);

// Now parse entries within the array
// Each entry starts with "\t{" and ends with "\t},"  
// But to handle nested things, we track brace depth.
const entries = [];
let depth = 0, start = -1, lines = [];
const allLines = arrayContents.split("\n");

for (let i = 0; i < allLines.length; i++) {
  const line = allLines[i];
  const trimmed = line.trim();

  if (trimmed === "{" && depth === 0) {
    start = i;
    depth = 1;
    lines = [line];
    continue;
  }
  if (depth === 0) continue;

  lines.push(line);
  if (trimmed === "{") {
    depth++;
  } else if (trimmed === "}") {
    depth--;
  }

  if (depth === 0) {
    const block = lines.join("\n");
    const numMatch = block.match(/num: "([^"]+)"/);
    if (numMatch && keepNums.has(numMatch[1])) {
      entries.push(block + ",");
    }
    start = -1;
    lines = [];
  }
}

console.log("Entries in array:", entries.length);

// Update header — strip essay/quote/link from types
const cleanHeader = header
  .replace('export type StreamKind = "note" | "launch" | "essay" | "quote" | "link";', 'export type StreamKind = "note" | "launch";')
  .replace(/\tlaunch: "Launch",\n\tessay: "Essay",\n\tquote: "Quote",\n\tlink: "Link",\n/, '\tlaunch: "Launch",\n');

let entriesText = entries.join("\n");

// Update Start here text
entriesText = entriesText.replace(
  /<p>Welcome\. This is the Focus Lab stream[\s\S]*?the numbered archive in any order\.<\/p>/,
  `<p>Notes and launches from the Focus Lab studio. We are a product studio in Islamabad. We build and run our own software: Urban Events, WorkProof, and Fixer.</p><p>Use the previous and next links to move through the stream, or wander through the archive in any order.</p>`
);

const out = cleanHeader + arrayStartMarker + "\n\n" + entriesText + "\n];\n" + tail;
fs.writeFileSync("src/data/stream.ts", out);
console.log("Wrote trimmed file with", entries.length, "entries");
