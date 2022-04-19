module.exports = function () {
  return async (next, ctx) => {
    const { name,version } = ctx.project;
    await ctx.utils.writeFile('./src/info.ts', `
export const name = '${name}';
export const version = '${version}';
    `);
    next();
  }
}