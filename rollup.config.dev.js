import alias from 'rollup-plugin-alias';
import commonjs from 'rollup-plugin-commonjs';
import injectProcessEnv from 'rollup-plugin-inject-process-env';
import path from 'path';
import resolve from 'rollup-plugin-node-resolve';
import sourcemaps from 'rollup-plugin-sourcemaps';
import typescript from 'rollup-plugin-typescript2';

const externals = {
  'react': 'React',
  'react-dom': 'ReactDOM',
}

const createConf = (page) => {
  return {
    input: `./examples/${page}.tsx`,
    output: [
      {
        file: `./dist/js/${page}.js`,
        format: 'iife',
        sourcemap: true,
        name: page.split('-').join('_'),
        globals: externals,
      }
    ],
    external: Object.keys(externals),
    plugins: [
      resolve(),
      alias({
        resolve: ['.ts', '.tsx'],
        entries: [
          { find: 'ober', replacement: '/Users/houfeng/my/dev/ober/src/' },
        ]
      }),
      commonjs({
        namedExports: {
          'examples/node_modules/react-is/index.js': [
            'isValidElementType',
            'isContextConsumer',
          ],
          'examples/node_modules/use-sync-external-store/shim/with-selector.js': [
            'useSyncExternalStoreWithSelector'
          ],
          'examples/node_modules/use-sync-external-store/shim/index.js': [
            'useSyncExternalStore'
          ]
        }
      }),
      typescript({
        useTsconfigDeclarationDir: true,
        tsconfig: path.resolve(__dirname, './tsconfig.dev.json')
      }),
      sourcemaps(),
      injectProcessEnv({
        NODE_ENV: 'production',
        OBER_CONFIG: { mode: 'property' },
      }),
    ]
  };
};

export default [
  createConf('develop'),
  createConf('benchmark-mota'),
  createConf('benchmark-mota-old'),
  createConf('benchmark-redux'),
  createConf('benchmark-mobx'),
  createConf('benchmark-normal'),
];