/**
 * Generic conversion of raw Notion page properties into plain JS values.
 * Used for the `Fields` passthrough so custom Notion columns are available
 * to templates without touching the adapter.
 */

type RichText = { plain_text?: string };

export function richTextToPlain(value: unknown): string {
	if (!Array.isArray(value)) return "";
	return value
		.map((item) => (item as RichText)?.plain_text ?? "")
		.join("")
		.trim();
}

export function toFieldValue(property: any): unknown {
	if (!property || typeof property !== "object") return null;

	switch (property.type) {
		case "title":
			return richTextToPlain(property.title);
		case "rich_text":
			return richTextToPlain(property.rich_text);
		case "url":
			return property.url || null;
		case "email":
			return property.email || null;
		case "phone_number":
			return property.phone_number || null;
		case "number":
			return typeof property.number === "number" ? property.number : null;
		case "checkbox":
			return Boolean(property.checkbox);
		case "select":
			return property.select?.name ?? null;
		case "status":
			return property.status?.name ?? null;
		case "multi_select":
			return Array.isArray(property.multi_select)
				? property.multi_select.map((item: any) => item.name)
				: [];
		case "date": {
			const start = property.date?.start;
			const end = property.date?.end;
			return end ? `${start} → ${end}` : start || null;
		}
		case "created_time":
			return property.created_time || null;
		case "last_edited_time":
			return property.last_edited_time || null;
		case "created_by":
			return property.created_by?.name ?? property.created_by?.id ?? null;
		case "last_edited_by":
			return property.last_edited_by?.name ?? property.last_edited_by?.id ?? null;
		case "people":
			return Array.isArray(property.people)
				? property.people.map((person: any) => person.name ?? person.id)
				: [];
		case "files":
			return Array.isArray(property.files)
				? property.files.map((file: any) => file.external?.url || file.file?.url || file.name)
				: [];
		case "formula": {
			const f = property.formula;
			if (!f) return null;
			switch (f.type) {
				case "string":
					return f.string ?? null;
				case "number":
					return typeof f.number === "number" ? f.number : null;
				case "boolean":
					return Boolean(f.boolean);
				case "date":
					return f.date?.start || null;
				default:
					return null;
			}
		}
		case "relation":
			return Array.isArray(property.relation)
				? property.relation.map((rel: any) => rel.id)
				: [];
		case "rollup": {
			const r = property.rollup;
			if (!r) return null;
			switch (r.type) {
				case "number":
					return typeof r.number === "number" ? r.number : null;
				case "date":
					return r.date?.start || null;
				case "array":
					return Array.isArray(r.array) ? r.array.map((item: any) => toFieldValue(item)) : [];
				default:
					return null;
			}
		}
		default:
			return null;
	}
}