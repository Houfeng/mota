import cleanup from 'rollup-plugin-cleanup';
import resolve from 'rollup-plugin-node-resolve';
import { terser } from "rollup-plugin-terser";

export default [
  {
    input: './dist/es/index.js',
    output: [
      {
        file: './dist/cjs/mota.js',
        format: 'cjs'
      },
      {
        file: './dist/umd/mota.js',
        format: 'umd',
        name: "mota"
      },
      {
        file: './dist/iife/mota.js',
        format: 'iife',
        name: "mota"
      }
    ],
    external: ['react', 'react-dom'],
    plugins: [
      resolve(),
      cleanup({ comments: "none" }),
    ]
  },
  {
    input: './dist/es/index.js',
    output: [
      {
        file: './dist/cjs/mota.min.js',
        format: 'cjs'
      },
      {
        file: './dist/umd/mota.min.js',
        format: 'umd',
        name: "mota"
      },
      {
        file: './dist/iife/mota.min.js',
        format: 'iife',
        name: "mota"
      }
    ],
    external: ['react', 'react-dom'],
    plugins: [
      resolve(),
      terser(),
      cleanup({ comments: "none" }),
    ]
  }
];