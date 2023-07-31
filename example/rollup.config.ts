import { defineConfig } from 'rollup';
import html from 'rollup-plugin-create-html';
import postcss from 'rollup-plugin-postcss';
import typescript from 'rollup-plugin-typescript2';

export default defineConfig({
  input: ['./src/index.ts', './src/test.ts'],
  output: {
    dir: './dist',
    format: 'es',
  },
  plugins: [
    postcss({ extract: true }),
    html({
      template: './src/index.html',
      // <title>rollup-plugin-create-html</title>
      title: 'rollup-plugin-create-html',
      // './index.css' './index.js'
      prefix: './',
      // <meta name="description" content="rollup-plugin-create-html">
      meta: {
        name: 'description',
        content: 'rollup-plugin-create-html',
      },
      inject: {
        // <script src="./index.js" type="module" defer></script>
        'index.js': {
          defer: true,
          location: 'head',
        },
        // <link href="./index.css" rel="stylesheet" media="screen and (max-width: 600px)">
        'index.css': {
          media: 'screen and (max-width: 600px)',
        },
        // not to be injected
        'test.js': false,
      },
      script: [
        // <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
        {
          src: 'https://unpkg.com/vue@3/dist/vue.global.js',
          location: 'bodyEnd',
        },
      ],
      link: [
        // <link href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css" rel="stylesheet"></link>
        {
          href: 'https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css',
          rel: 'stylesheet',
        },
        // <link href="./icon.png" rel="icon">
        {
          href: './src/images/icon.png',
          rel: 'icon',
        },
      ],
      fileName: 'index.html',
    }),
    typescript(),
  ],
});
