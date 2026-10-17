// Reads the search query from a location.search string such as "?q=timeout".
export function queryFromSearch(search) {
  return new URLSearchParams(search).get('q') ?? '';
}

// Returns the location.search string with q set to the query, or without q
// when the query is blank. Other parameters are kept.
export function searchWithQuery(search, query) {
  const params = new URLSearchParams(search);
  if (query.trim()) params.set('q', query);
  else params.delete('q');
  const result = params.toString();
  return result ? `?${result}` : '';
}
