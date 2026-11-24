import re

data = open("src/data/stream.ts").read()

keep = {
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
}

marker = "export const stream: StreamEntry[] = ["
s = data.split(marker, 1)
head = s[0]
rest = s[1]
close = rest.rfind("];")
body = rest[:close]
tail = rest[close+2:]

# Parse entries by tracking brace depth
entries = []
current = []
depth = 0
for line in body.split("\n"):
    stripped = line.strip()
    if stripped == "{" and depth == 0:
        depth = 1
        current = [line]
        continue
    if depth == 0:
        continue
    current.append(line)
    if stripped == "{":
        depth += 1
    elif stripped in ("}", "},"):
        depth -= 1
    if depth == 0:
        block = "\n".join(current)
        m = re.search(r'num: "([^"]+)"', block)
        if m and m.group(1) in keep:
            entries.append(block)
        current = []

print(f"Kept {len(entries)} original entries")

# New entries to prepend
new_blocks = [
"\t{\n\t\tnum: \"106\",\n\t\tkind: \"note\",\n\t\tlabel: \"Write down what you decided against\",\n\t\tdate: \"2026-11-10\",\n\t\tcontent: `<p>We keep a file in every repo called NOT_DOING.md. It is a list of the features, refactors, and dependencies we said no to, and why. It is the most-read document in the company, because it is the only place where the answer to &quot;why don&apos;t we just...&quot; fits on one screen.</p>`,\n\t},",
"\t{\n\t\tnum: \"107\",\n\t\tkind: \"note\",\n\t\tlabel: \"The thirty-minute rollback\",\n\t\tdate: \"2026-11-03\",\n\t\tcontent: `<p>If we cannot undo a change in thirty minutes, the deploy pipeline is too complex. We test this once a month with whoever joined most recently. If they cannot find the revert button in four tries, we redesign the page. The record stands at four minutes, set on somebody&apos;s second day.</p>`,\n\t},",
"\t{\n\t\tnum: \"108\",\n\t\tkind: \"note\",\n\t\tlabel: \"Real-time is the wrong time\",\n\t\tdate: \"2026-10-27\",\n\t\tcontent: `<p>We turned off every real-time notification in every product and replaced them with a daily digest that you can turn off. Sixty percent of people do. Zero people asked for the bell icon back. The red dot was a nervous habit we gave our users, and we are sorry.</p>`,\n\t},",
"\t{\n\t\tnum: \"109\",\n\t\tkind: \"launch\",\n\t\tlabel: \"Urban Events: print-at-home tickets\",\n\t\tdate: \"2026-10-20\",\n\t\tcontent: `<p>Every event now generates a PDF ticket with the guest name, the venue, the time, and a scannable QR code. It works on every printer in Pakistan, including the ones at university libraries that still run Windows 7. The feature took a week. It should have taken a day. The other four days were learning which PDF readers ignore fonts.</p><p><a href=\"https://urbanevents.pk\" target=\"_blank\" rel=\"noopener\">Start an event</a>.</p>`,\n\t},",
"\t{\n\t\tnum: \"110\",\n\t\tkind: \"note\",\n\t\tlabel: \"We do not A/B test personality\",\n\t\tdate: \"2026-10-13\",\n\t\tcontent: `<p>We write the sentence that says what it does and we ship it. The alternative is a culture where every line of copy goes to committee, and we have been in that room and we are not going back. The product either works or it does not. The words around it are ours to own.</p>`,\n\t},",
"\t{\n\t\tnum: \"111\",\n\t\tkind: \"note\",\n\t\tlabel: \"Name the exception after the cause\",\n\t\tdate: \"2026-10-06\",\n\t\tcontent: `<p>Not the module. PaymentGatewayError is twenty minutes of grepping. IssuerDeclinedPostalCodeMismatch is a phone call. We renamed every exception in the codebase in an afternoon and the next incident took twelve minutes instead of forty.</p>`,\n\t},",
"\t{\n\t\tnum: \"112\",\n\t\tkind: \"note\",\n\t\tlabel: \"The product is the onboarding\",\n\t\tdate: \"2026-09-29\",\n\t\tcontent: `<p>A welcome tour is an admission that the product is not obvious. We deleted ours and watched the numbers. Completion of the first action went up, support tickets went down, and the only email we got was asking where the tour went. It went in the bin.</p>`,\n\t},",

]

all_blocks = new_blocks + entries

entries_text = "\n".join(all_blocks)
entries_text = entries_text.replace(
    '<p>Welcome. This is the Focus Lab stream — a feed of the things we are building, reading, and thinking about. We are a product studio in Islamabad. We design, build, and run our own software, and once in a while we partner with a team when the fit is right.</p><p>Some entries are ours: launches and notes from the studio. Some are things we found useful — an essay, a link, an idea worth passing on. When it is not ours, we say whose it is and link to the original.</p><p>Use the previous and next links to move through the stream, or wander through the numbered archive in any order.</p>',
    '<p>Notes and launches from the Focus Lab studio. We are a product studio in Islamabad. We build and run our own software: Urban Events, WorkProof, and Fixer.</p><p>Use the previous and next links to move through the stream, or wander through the archive in any order.</p>'
)

out = (
    head
    .replace('export type StreamKind = "note" | "launch" | "essay" | "quote" | "link";', 'export type StreamKind = "note" | "launch";')
    .replace('\tlaunch: "Launch",\n\tessay: "Essay",\n\tquote: "Quote",\n\tlink: "Link",\n', '\tlaunch: "Launch",\n')
    + marker + "\n"
    + entries_text
    + "\n];\n"
    + tail
)

open("src/data/stream.ts", "w").write(out)
count = len(re.findall(r'num: "([^"]+)"', entries_text))
print(f"Wrote {count} total entries")
