import cleanup from 'rollup-plugin-cleanup';
import resolve from 'rollup-plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import typescript from 'rollup-plugin-typescript2';

const externals = {
  'react': 'React',
  'react-dom': 'ReactDOM',
}

const createConf = ({ name, input, min } = {}) => {
  const suffix = min ? '.min' : '';
  return {
    input: input,
    output: [
      {
        file: `./dist/${name}-es${suffix}.js`,
        format: 'es'
      },
      {
        file: `./dist/${name}-cjs${suffix}.js`,
        format: 'cjs'
      },
      {
        file: `./dist/${name}-umd${suffix}.js`,
        format: 'umd',
        name: 'Mota',
        globals: externals,
      },
      {
        file: `./dist/${name}-iife${suffix}.js`,
        format: 'iife',
        name: 'Mota',
        globals: externals,
      }
    ],
    external: Object.keys(externals),
    plugins: [
      resolve(),
      min && terser(),
      cleanup({ comments: 'none' }),
      typescript({
        useTsconfigDeclarationDir: true,
      }),
    ].filter(Boolean)
  };
};

const normalOptions = { name: 'mota', input: './src/index.ts' };
const serverOptions = { name: 'mota-server', input: './src/server.ts' };

export default [
  createConf({ ...normalOptions }),
  createConf({ ...normalOptions, min: true }),
  createConf({ ...serverOptions }),
  createConf({ ...serverOptions, min: true }),
];