export const root = document.querySelector('.root');
export const $ = <T extends HTMLElement>(selector: string): T => {
  return root?.querySelector<T>(selector) as T;
}
