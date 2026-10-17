import { useEffect, useState } from 'react';
import HTTP_STATUSES from './HTTP_STATUSES.js';
import { groupStatuses, rfcLabel } from './filterStatuses.js';

export default function KakandaHTTP() {
  const [query, setQuery] = useState('');
  const groups = groupStatuses(HTTP_STATUSES, query);

  // The list renders after page load, so the browser cannot jump to a #404 anchor on its own.
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1));
    if (id) document.getElementById(id)?.scrollIntoView();
  }, []);

  return (
    <div className="kakanda-http">
      <label htmlFor="status-filter" className="kakanda-http__label">Search by code or message</label>
      <input
        id="status-filter"
        type="search"
        className="kakanda-http__search"
        placeholder="404, redirect, gateway..."
        autoComplete="off"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {groups.map((group) => (
        <section key={group.digit} className="kakanda-http__group">
          <h2 className="kakanda-http__group__title">{group.name}</h2>
          <ul className="kakanda-http__result">
            {group.statuses.map((status) => (
              <li key={status.code} id={status.code} className="kakanda-http__result__item">
                <a
                  href={`#${status.code}`}
                  className={`kakanda-http__status kakanda-http__status--${group.digit}`}
                  aria-label={`Link to ${status.code} ${status.phrase}`}
                >
                  {status.code}
                </a>
                <div className="kakanda-http__result__item__explanation">
                  <h3>{status.code} {status.phrase}</h3>
                  <p>{status.summary}</p>
                  <a href={status.reference} rel="noopener">{rfcLabel(status.reference)}</a>
                </div>
              </li>
            ))}
          </ul>
        </section>
      ))}

      {groups.length === 0 && <p className="kakanda-http__empty">No status codes match your search.</p>}
    </div>
  );
}
