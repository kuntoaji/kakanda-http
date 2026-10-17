import { useEffect, useState } from 'react';
import HTTP_STATUSES from './HTTP_STATUSES.js';
import { groupStatuses, rfcLabel } from './filterStatuses.js';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export default function KakandaHTTP() {
  const [query, setQuery] = useState('');
  const groups = groupStatuses(HTTP_STATUSES, query);

  // The list renders after page load, so the browser cannot jump to a #404 anchor on its own.
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1));
    if (id) document.getElementById(id)?.scrollIntoView();
  }, []);
  return /*#__PURE__*/_jsxs("div", {
    className: "kakanda-http",
    children: [/*#__PURE__*/_jsx("label", {
      htmlFor: "status-filter",
      className: "kakanda-http__label",
      children: "Search by code or message"
    }), /*#__PURE__*/_jsx("input", {
      id: "status-filter",
      type: "search",
      className: "kakanda-http__search",
      placeholder: "404, redirect, gateway...",
      autoComplete: "off",
      value: query,
      onChange: e => setQuery(e.target.value)
    }), groups.map(group => /*#__PURE__*/_jsxs("section", {
      className: "kakanda-http__group",
      children: [/*#__PURE__*/_jsx("h2", {
        className: "kakanda-http__group__title",
        children: group.name
      }), /*#__PURE__*/_jsx("ul", {
        className: "kakanda-http__result",
        children: group.statuses.map(status => /*#__PURE__*/_jsxs("li", {
          id: status.code,
          className: "kakanda-http__result__item",
          children: [/*#__PURE__*/_jsx("a", {
            href: `#${status.code}`,
            className: `kakanda-http__status kakanda-http__status--${group.digit}`,
            "aria-label": `Link to ${status.code} ${status.phrase}`,
            children: status.code
          }), /*#__PURE__*/_jsxs("div", {
            className: "kakanda-http__result__item__explanation",
            children: [/*#__PURE__*/_jsxs("h3", {
              children: [status.code, " ", status.phrase]
            }), /*#__PURE__*/_jsx("p", {
              children: status.summary
            }), /*#__PURE__*/_jsx("a", {
              href: status.reference,
              rel: "noopener",
              children: rfcLabel(status.reference)
            })]
          })]
        }, status.code))
      })]
    }, group.digit)), groups.length === 0 && /*#__PURE__*/_jsx("p", {
      className: "kakanda-http__empty",
      children: "No status codes match your search."
    })]
  });
}