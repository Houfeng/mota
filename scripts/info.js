module.exports = function () {
  return async (next, ctx) => {
    const { name,version } = ctx.project;
    await ctx.utils.writeFile('./src/common/info.js', `
export const name = '${name}';
export const version = '${version}';
    `);
    next();
  }
}