import React, { AnchorHTMLAttributes, MouseEvent } from 'react';

type Props = AnchorHTMLAttributes<HTMLAnchorElement>;

export function AppLink({ children, onClick, href = '/', ...props }: Props) {
  const navigate = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) return;

    event.preventDefault();
    if (window.location.pathname !== href) {
      window.history.pushState({}, '', href);
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
  };

  return <a {...props} href={href} onClick={navigate}>{children}</a>;
}
