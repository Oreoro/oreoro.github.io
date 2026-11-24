import re

data = open("src/data/thoughts.ts").read()

# Keep only Product and Engineering entries
new_data = re.sub(
    r"\t{\n\t\ttitle:[^}]+?topic:\s*\"(Design|Working|Business|Writing|Thinking)\"[^}]+?},\n",
    "",
    data,
    flags=re.S,
)

# Remove the topicOrder entries we are removing
new_data = new_data.replace(
    '\t"Product",\n\t"Engineering",\n\t"Design",\n\t"Working",\n\t"Business",\n\t"Writing",\n\t"Thinking",',
    '\t"Product",\n\t"Engineering",'
)

open("src/data/thoughts.ts", "w").write(new_data)

product_count = len(re.findall(r'topic: "Product"', new_data))
eng_count = len(re.findall(r'topic: "Engineering"', new_data))
design_count = len(re.findall(r'topic: "Design"', new_data))
work_count = len(re.findall(r'topic: "Working"', new_data))
bus_count = len(re.findall(r'topic: "Business"', new_data))
write_count = len(re.findall(r'topic: "Writing"', new_data))
think_count = len(re.findall(r'topic: "Thinking"', new_data))
print(f"Product: {product_count}, Engineering: {eng_count}, Design: {design_count}, Working: {work_count}, Business: {bus_count}, Writing: {write_count}, Thinking: {think_count}")
