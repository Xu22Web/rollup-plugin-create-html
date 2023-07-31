import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import { defineConfig } from 'rollup';
import typescript from 'rollup-plugin-typescript2';

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
  plugins: [typescript(), commonjs(), resolve(), terser()],
});
