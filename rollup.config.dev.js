import commonjs from 'rollup-plugin-commonjs';
import replace from 'rollup-plugin-replace';
import resolve from 'rollup-plugin-node-resolve';
import typescript from 'rollup-plugin-typescript2';

export default {
  input: './example/index.tsx',
  output: [
    {
      file: './dist/index.js',
      format: 'iife',
      name: "index"
    }
  ],
  external: [],
  plugins: [
    replace({
      'process.env.NODE_ENV': JSON.stringify('development')
    }),
    commonjs({
      namedExports: {
        // https://github.com/rollup/rollup-plugin-commonjs#custom-named-exports
        'node_modules/react/index.js': ['useState', 'useMemo', 'useEffect'],
      },
    }),
    resolve(),
    typescript(),
  ]
};