// @ts-ignore
window.require = (name: string) => {
  if (name === 'react') name = 'React';
  if (name === 'react-dom') name = 'ReactDOM';
  // @ts-ignore
  return window[name];
};
// @ts-ignore
window.global = window;