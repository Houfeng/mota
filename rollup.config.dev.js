import commonjs from 'rollup-plugin-commonjs';
import path from 'path';
import replace from 'rollup-plugin-replace';
import resolve from 'rollup-plugin-node-resolve';
import sourcemaps from 'rollup-plugin-sourcemaps';
import typescript from 'rollup-plugin-typescript2';

export default {
  input: './example/index.tsx',
  output: [
    {
      file: './dist/index.js',
      format: 'umd',
      sourcemap: true,
      name: "index"
    }
  ],
  external: ['react', 'react-dom'],
  plugins: [
    resolve(),
    commonjs({
      ignoreDynamicRequires: true,
      namedExports: {
        // https://github.com/rollup/rollup-plugin-commonjs#custom-named-exports
        'node_modules/react/index.js': ['useState', 'useMemo', 'useEffect'],
      },
    }),
    typescript({ tsconfig: path.resolve(__dirname, './tsconfig.dev.json') }),
    sourcemaps(),
    replace({
      'process.env.NODE_ENV': JSON.stringify('development')
    }),
  ]
};