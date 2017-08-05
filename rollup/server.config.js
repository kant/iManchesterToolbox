const babel = require('rollup-plugin-babel');
const commonjs = require('rollup-plugin-commonjs');
const replace = require('rollup-plugin-replace');

const ignoredWarnings = ['MISSING_GLOBAL_NAME', 'MISSING_NODE_BUILTINS', 'UNRESOLVED_IMPORT'];

export default {
  entry: 'server/server.jsx',
  plugins: [
    replace({
      API_URL: "process.env.NODE_ENV === 'production' ? 'https://imant.herokuapp.com/api' : 'https://localhost/api'"
    }),
    commonjs({
      sourceMap: false
    }),
    babel()
  ],
  targets: [{
    dest: 'server.bundle.js',
    format: 'umd'
  }],
  onwarn: (warning) => {
    if (!ignoredWarnings.includes(warning.code)) {
      console.log(`Warning: ${warning}`);
    }
  }
};
