import { Root, createRoot } from "react-dom/client";

import { ReactNode } from "react";

const container = document.querySelector<HTMLElement>('.root');
let root: Root;

export const $ = <T extends HTMLElement>(selector: string): T => {
  return container?.querySelector<T>(selector) as T;
}

export function render(element: ReactNode) {
  if (!container) return;
  if (root) root.unmount();
  root = createRoot(container);
  return root.render(element);
}