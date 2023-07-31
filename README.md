# rollup-plugin-create-html

A Rollup plugin which creates HTML files to serve Rollup bundles and assets.

This plugin was inspired by [@rollup/plugin-html](https://www.npmjs.com/package/@rollup/plugin-html) and [rollup-plugin-html2](https://www.npmjs.com/package/rollup-plugin-html2)

## Install

```bash
pnpm install rollup-plugin-create-html -D
```

## Usage

```js
import { defineConfig } from 'rollup';
import html from 'rollup-plugin-create-html';
import postcss from 'rollup-plugin-postcss';
import typescript from 'rollup-plugin-typescript2';

export default defineConfig({
  input: ['./src/index.ts', './src/test.ts'],
  output: {
    dir: './dist',
    // ModuleFormat es -> type="module"
    format: 'es',
  },
  plugins: [
    // optional: with postcss
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
        },
      ],
      link: [
        // <link href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css" rel="stylesheet"></link>
        {
          href: 'https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css',
          rel: 'stylesheet',
        },
        // './src/images/icon.png' -> './icon.png' <link href="./icon.png" rel="icon">
        {
          href: './src/images/icon.png',
          rel: 'icon',
        },
      ],
      fileName: 'index.html',
    }),
    // optional: with typescript
    typescript(),
  ],
});
```

## Options

### `template`

Type: `string`

Optional: `false`

Description: `an HTML template`

Example:

```js
// a path
template: './index.html',
```

```js
// a simple html template
tempalte: '<html></html>',

// a complex html template
template: `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
  </head>
  <body></body>
</html>`,
```

### `title`

Type: `string`

Optional: `true`

Description: `title tag in an HTML template`

Example:

```js
// <title>rollup-plugin-create-html</title>
title: 'rollup-plugin-create-html',
```

### `prefix`

Type: `string`

Optional: `true`

Default: `'/'`

Description: `the prefix of all injected stylesheets and scripts`

Example:

```js
// '/index.js' -> './index.js'
prefix: './',
```

### `meta`

Type: `MetaAttributes | MetaAttributes[]`

Optional: `true`

Description: `meta tag in an HTML template`

Example:

```js
// <meta name="description" content="rollup-plugin-create-html">
meta: {
  name: 'description',
  content: 'rollup-plugin-create-html',
},
```

```js
// <meta name="description" content="rollup-plugin-create-html">
meta: [
  {
    name: 'description',
    content: 'rollup-plugin-create-html',
  }
],
```

### `inject`

Type: `boolean | Record<string, boolean | LinkAttributes | ScriptAttributes>`

Optional: `true`

Default: `true`

Description: `whether to inject all stylesheets and scripts or not`

Example:

```js
// not to be injected
inject: false,
```

```js
inject: {
// <head>
//   <script src="/index.js" type="module" defer></script>
// <head>
'index.js': {
  defer: true,
  location: 'head',
},
// <link href="/index.css" rel="stylesheet" media="screen and (max-width: 600px)">
'index.css': {
  media: 'screen and (max-width: 600px)',
},
// not to be injected
'test.js': false,
},
```

### `script`

Type: `ScriptAttributes | ScriptAttributes[]`

Optional: `true`

Description: `script tag in an HTML template`

Example:

```js
// <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
script: {
  src: 'https://unpkg.com/vue@3/dist/vue.global.js',
},
```

```js
// <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
script: [
  {
    src: 'https://unpkg.com/vue@3/dist/vue.global.js',
  },
],
```

### `link`

Type: `LinkAttributes | LinkAttributes[]`

Optional: `true`

Description: `link tag in an HTML template`

Example:

```js
// <link href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css" rel="stylesheet"></link>
link: {
  href: 'https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css',
  rel: 'stylesheet',
},
```

```js
link: [
// <link href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css" rel="stylesheet"></link>
{
  href: 'https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css',
  rel: 'stylesheet',
},
// './src/images/icon.png' -> '/icon.png'
// <link href="/icon.png" rel="icon">
{
  href: './src/images/icon.png',
  rel: 'icon',
},
],
```

### `fileName`

Type: `string`

Optional: `true`

Description: `fileName of the output html`

Example:

```js
fileName: 'index.html',
```
