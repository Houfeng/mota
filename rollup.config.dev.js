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
      commonjs(),
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
  createConf('benchmark-normal'),
];