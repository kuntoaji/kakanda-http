import { useEffect, useRef, useState } from 'react';
import HTTP_STATUSES from './HTTP_STATUSES.js';
import { groupStatuses, rfcLabel } from './filterStatuses.js';
import { queryFromSearch, searchWithQuery } from './url.js';

function isTyping(element) {
  return element && (element.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(element.tagName));
}

export default function KakandaHTTP() {
  const [query, setQuery] = useState(() => queryFromSearch(window.location.search));
  const searchRef = useRef(null);
  const groups = groupStatuses(HTTP_STATUSES, query);

  // Keep the query in ?q= so a search can be shared as a URL.
  function updateQuery(value) {
    setQuery(value);
    const { pathname, search, hash } = window.location;
    window.history.replaceState(window.history.state, '', pathname + searchWithQuery(search, value) + hash);
  }

  // The list renders after page load, so the browser cannot jump to a #404 anchor on its own.
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1));
    if (id) document.getElementById(id)?.scrollIntoView();
  }, []);

  // "/" focuses the search, as in many developer tools.
  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key !== '/' || event.ctrlKey || event.metaKey || event.altKey || isTyping(document.activeElement)) return;
      event.preventDefault();
      searchRef.current.focus();
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="kakanda-http">
      <label htmlFor="status-filter" className="kakanda-http__label">Search by code or message</label>
      <input
        ref={searchRef}
        id="status-filter"
        type="search"
        className="kakanda-http__search"
        placeholder="404, redirect, gateway..."
        autoComplete="off"
        aria-keyshortcuts="/"
        value={query}
        onChange={(e) => updateQuery(e.target.value)}
        onKeyDown={(e) => e.key === 'Escape' && updateQuery('')}
      />

      {groups.map((group) => (
        <section key={group.digit} className="kakanda-http__group">
          <h2 className="kakanda-http__group__title">{group.name}</h2>
          <ul className="kakanda-http__result">
            {group.statuses.map((status) => <StatusItem key={status.code} status={status} digit={group.digit} />)}
          </ul>
        </section>
      ))}

      {groups.length === 0 && <p className="kakanda-http__empty">No status codes match your search.</p>}
    </div>
  );
}

function StatusItem({ status, digit }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(timer);
  }, [copied]);

  async function copyLink() {
    const { origin, pathname } = window.location;
    try {
      await navigator.clipboard.writeText(`${origin}${pathname}#${status.code}`);
      setCopied(true);
    } catch {
      // The browser denied clipboard access, so there is nothing to confirm.
    }
  }

  return (
    <li id={status.code} className="kakanda-http__result__item">
      <a
        href={`#${status.code}`}
        className={`kakanda-http__status kakanda-http__status--${digit}`}
        aria-label={`Link to ${status.code} ${status.phrase}`}
      >
        {status.code}
      </a>
      <div className="kakanda-http__result__item__explanation">
        <h3>
          {status.code} {status.phrase}
          {status.deprecated && <span className="kakanda-http__tag kakanda-http__tag--deprecated">Deprecated</span>}
          {status.cacheable && <span className="kakanda-http__tag">Cacheable by default</span>}
        </h3>
        <p>{status.summary}</p>
        {status.headers && (
          <p className="kakanda-http__headers">
            Headers: {status.headers.map((header) => <code key={header}>{header}</code>)}
          </p>
        )}
        {status.note && <p className="kakanda-http__note">{status.note}</p>}
        <div className="kakanda-http__links">
          <a href={status.reference} rel="noopener">{rfcLabel(status.reference)}</a>
          {navigator.clipboard && (
            <button type="button" className="kakanda-http__copy" onClick={copyLink} aria-label={`Copy link to ${status.code} ${status.phrase}`}>
              Copy link
            </button>
          )}
          <span aria-live="polite" className="kakanda-http__copied">{copied ? 'Copied' : ''}</span>
        </div>
      </div>
    </li>
  );
}
