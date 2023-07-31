import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import { defineConfig } from "rollup";
import typescript from 'rollup-plugin-typescript2';
import terser from '@rollup/plugin-terser';
import json from '@rollup/plugin-json';

export default defineConfig({
  input: './src/index.ts',
  output: [
    {
      file: 'dist/index.cjs.js',
      format: 'cjs',
    },
    {
      file: 'dist/index.js',
      format: 'es',
    },
  ],
  plugins: [typescript(), commonjs(), resolve(), json(), terser()],
});
