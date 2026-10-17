export const STATUS_CLASSES = [
  { digit: '1', name: '1xx Informational' },
  { digit: '2', name: '2xx Success' },
  { digit: '3', name: '3xx Redirection' },
  { digit: '4', name: '4xx Client Error' },
  { digit: '5', name: '5xx Server Error' },
];

// Groups statuses by class and keeps only those whose code, phrase, summary,
// headers or class name contain every word of the query. Notes are left out
// because they name other codes. Empty groups are dropped.
export function groupStatuses(statuses, query) {
  const words = query.toLowerCase().split(/\s+/).filter(Boolean);

  return STATUS_CLASSES.map((statusClass) => ({
    ...statusClass,
    statuses: statuses.filter((status) => {
      if (status.code[0] !== statusClass.digit) return false;
      const headers = status.headers?.join(' ') ?? '';
      const text = `${status.code} ${status.phrase} ${status.summary} ${headers} ${statusClass.name}`.toLowerCase();
      return words.every((word) => text.includes(word));
    }),
  })).filter((group) => group.statuses.length > 0);
}

// "https://tools.ietf.org/html/rfc7231#section-6.5.4" -> "RFC 7231, section 6.5.4"
export function rfcLabel(reference) {
  const [, rfc, section] = reference.match(/rfc(\d+)(?:#section-(.+))?$/) ?? [];
  if (!rfc) return reference;
  return section ? `RFC ${rfc}, section ${section}` : `RFC ${rfc}`;
}
