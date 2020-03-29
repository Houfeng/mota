module.exports = function () {
  return async (next, ctx) => {
    await ctx.utils.writeFile('./src/common/info.js', `
export const version = "${ctx.project.version}";
    `);
    next();
  }
}