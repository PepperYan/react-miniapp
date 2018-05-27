const createFilter = require("rollup-pluginutils").createFilter;

module.exports = function css (options = {}) {
  const filter = createFilter(options.include || ['**/*.css'], options.exclude)
  console.log(filter)
  return {
    name: 'css',
    transform(code, id) {
      // console.log(code, id);
    },
    ongenerate(opts) {
      // console.log(opts)
    }
  }
}
