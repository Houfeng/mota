import { ObserveMode } from 'ober';
import commonjs from 'rollup-plugin-commonjs';
import injectProcessEnv from 'rollup-plugin-inject-process-env';
import path from 'path';
import resolve from 'rollup-plugin-node-resolve';
import sourcemaps from 'rollup-plugin-sourcemaps';
import typescript from 'rollup-plugin-typescript2';

const createConf = (page) => {
  return {
    input: `./examples/${page}.tsx`,
    output: [
      {
        file: `./dist/js/${page}.js`,
        format: 'iife',
        sourcemap: true,
        name: 'Mota'
      }
    ],
    external: ['react', 'react-dom'],
    plugins: [
      resolve(),
      commonjs({
        ignoreDynamicRequires: true,
        namedExports: {
          'node_modules/react/index.js': [
            'useState',
            'useMemo',
            'useLayoutEffect'
          ],
        },
      }),
      typescript({
        useTsconfigDeclarationDir: true,
        tsconfig: path.resolve(__dirname, './tsconfig.dev.json')
      }),
      sourcemaps(),
      injectProcessEnv({
        NODE_ENV: 'production',
        OBER_CONFIG: { mode: ObserveMode.property },
      }),
    ]
  };
};

export default [
  createConf('develop'),
  createConf('benchmark-mota'),
  createConf('benchmark-normal'),
];