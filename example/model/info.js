export const state = {
  message: 'test',
}

export function show(msg) {
  state.message = msg;
}