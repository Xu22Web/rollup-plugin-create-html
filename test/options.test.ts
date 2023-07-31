import { OutputAsset } from 'rollup';
import postcss from 'rollup-plugin-postcss';
import typescript from 'rollup-plugin-typescript2';
import { describe, expect, it } from 'vitest';
import html from '../src';
import { getOutput } from './fixtures/utils';

describe('html-template', () => {
  it('full options', async () => {
    // 文件名
    const outFileName = 'index.html';
    // 导出
    const output = await getOutput({
      input: 'test/fixtures/index.ts',
      output: {
        dir: 'test/dist',
        format: 'es',
      },
      plugins: [
        postcss({ extract: true }),
        html({
          template: 'test/fixtures/index.html',
          title: 'rollup-plugin-create-html',
          prefix: './',
          meta: {
            name: 'description',
            content: 'rollup-plugin-create-html',
          },
          inject: {
            'index.js': {
              defer: true,
              location: 'head',
            },
            'index.css': {
              media: 'screen and (max-width: 600px)',
            },
          },
          script: [
            {
              src: 'https://unpkg.com/vue@3/dist/vue.global.js',
              location: 'bodyEnd',
            },
          ],
          link: [
            {
              href: 'https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css',
              rel: 'stylesheet',
            },
            {
              href: 'test/fixtures/images/icon.png',
              rel: 'icon',
            },
          ],
          fileName: outFileName,
        }),
        typescript(),
      ],
    });
    // 导出文件
    const file = <OutputAsset | undefined>(
      output.find(
        ({ fileName, type }) => fileName === outFileName && type === 'asset'
      )
    );
    expect(file?.source).toMatchInlineSnapshot(
      `
      "<!DOCTYPE html>
      <html lang=\\"en\\">
        <head>
          <meta charset=\\"utf-8\\" />
          <meta name=\\"viewport\\" content=\\"width=device-width\\" />
          <meta name=\\"description\\" content=\\"rollup-plugin-create-html\\">
          <title>rollup-plugin-create-html</title>
          <link href=\\"https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css\\" rel=\\"stylesheet\\">
          <link href=\\"./icon.png\\" rel=\\"icon\\">
          <link href=\\"./index.css\\" rel=\\"stylesheet\\" media=\\"screen and (max-width: 600px)\\">
          <script src=\\"./index.js\\" type=\\"module\\" defer></script>
        </head>
        <body>
          <div id=\\"app\\"></div>
          <script src=\\"https://unpkg.com/vue@3/dist/vue.global.js\\"></script>
        </body>
      </html>
      "
    `
    );
  });

  it('template: string(a template of html)', async () => {
    // 导出
    const output = await getOutput({
      input: 'test/fixtures/index.ts',
      output: {
        dir: 'test/dist',
        format: 'es',
      },
      plugins: [
        postcss({ extract: true }),
        html({
          template: '<html></html>',
          fileName: 'index.html',
        }),
        typescript(),
      ],
    });
    // 导出文件
    const file = <OutputAsset | undefined>(
      output.find(
        ({ fileName, type }) => fileName === 'index.html' && type === 'asset'
      )
    );
    expect(file?.source).toMatchInlineSnapshot(`
      "<html>
        <head>
          <link href=\\"/index.css\\" rel=\\"stylesheet\\">
        </head>
        <body>
          <script src=\\"/index.js\\" type=\\"module\\"></script>
        </body>
      </html>"
    `);
  });

  it('template: string(a local path)', async () => {
    // 导出
    const output = await getOutput({
      input: 'test/fixtures/index.ts',
      output: {
        dir: 'test/dist',
        format: 'es',
      },
      plugins: [
        postcss({ extract: true }),
        html({
          template: 'test/fixtures/index.html',
        }),
        typescript(),
      ],
    });
    // 导出文件
    const file = <OutputAsset | undefined>(
      output.find(
        ({ fileName, type }) => fileName === 'index.html' && type === 'asset'
      )
    );
    expect(file?.source).toMatchInlineSnapshot(`
      "<!DOCTYPE html>
      <html lang=\\"en\\">
        <head>
          <meta charset=\\"utf-8\\" />
          <meta name=\\"viewport\\" content=\\"width=device-width\\" />
          <link href=\\"/index.css\\" rel=\\"stylesheet\\">
        </head>
        <body>
          <div id=\\"app\\"></div>
          <script src=\\"/index.js\\" type=\\"module\\"></script>
        </body>
      </html>
      "
    `);
  });

  it('title: string', async () => {
    // 导出
    const output = await getOutput({
      input: 'test/fixtures/index.ts',
      output: {
        dir: 'test/dist',
        format: 'es',
      },
      plugins: [
        postcss({ extract: true }),
        html({
          template: 'test/fixtures/index.html',
          title: 'rollup-plugin-create-html',
        }),
        typescript(),
      ],
    });
    // 导出文件
    const file = <OutputAsset | undefined>(
      output.find(
        ({ fileName, type }) => fileName === 'index.html' && type === 'asset'
      )
    );
    expect(file?.source).toMatchInlineSnapshot(`
      "<!DOCTYPE html>
      <html lang=\\"en\\">
        <head>
          <meta charset=\\"utf-8\\" />
          <meta name=\\"viewport\\" content=\\"width=device-width\\" />
          <title>rollup-plugin-create-html</title>
          <link href=\\"/index.css\\" rel=\\"stylesheet\\">
        </head>
        <body>
          <div id=\\"app\\"></div>
          <script src=\\"/index.js\\" type=\\"module\\"></script>
        </body>
      </html>
      "
    `);
  });

  it('prefix: string', async () => {
    // 导出
    const output = await getOutput({
      input: 'test/fixtures/index.ts',
      output: {
        dir: 'test/dist',
        format: 'es',
      },
      plugins: [
        postcss({ extract: true }),
        html({
          template: 'test/fixtures/index.html',
          prefix: './',
        }),
        typescript(),
      ],
    });
    // 导出文件
    const file = <OutputAsset | undefined>(
      output.find(
        ({ fileName, type }) => fileName === 'index.html' && type === 'asset'
      )
    );
    expect(file?.source).toMatchInlineSnapshot(`
      "<!DOCTYPE html>
      <html lang=\\"en\\">
        <head>
          <meta charset=\\"utf-8\\" />
          <meta name=\\"viewport\\" content=\\"width=device-width\\" />
          <link href=\\"./index.css\\" rel=\\"stylesheet\\">
        </head>
        <body>
          <div id=\\"app\\"></div>
          <script src=\\"./index.js\\" type=\\"module\\"></script>
        </body>
      </html>
      "
    `);
  });

  it('meta: MetaAttibutes', async () => {
    // 导出
    const output = await getOutput({
      input: 'test/fixtures/index.ts',
      output: {
        dir: 'test/dist',
        format: 'es',
      },
      plugins: [
        postcss({ extract: true }),
        html({
          template: 'test/fixtures/index.html',
          meta: {
            name: 'description',
            content: 'rollup-plugin-create-html',
          },
        }),
        typescript(),
      ],
    });
    // 导出文件
    const file = <OutputAsset | undefined>(
      output.find(
        ({ fileName, type }) => fileName === 'index.html' && type === 'asset'
      )
    );
    expect(file?.source).toMatchInlineSnapshot(`
      "<!DOCTYPE html>
      <html lang=\\"en\\">
        <head>
          <meta charset=\\"utf-8\\" />
          <meta name=\\"viewport\\" content=\\"width=device-width\\" />
          <meta name=\\"description\\" content=\\"rollup-plugin-create-html\\">
          <link href=\\"/index.css\\" rel=\\"stylesheet\\">
        </head>
        <body>
          <div id=\\"app\\"></div>
          <script src=\\"/index.js\\" type=\\"module\\"></script>
        </body>
      </html>
      "
    `);
  });

  it('meta: MetaAttributes[]', async () => {
    // 导出
    const output = await getOutput({
      input: 'test/fixtures/index.ts',
      output: {
        dir: 'test/dist',
        format: 'es',
      },
      plugins: [
        postcss({ extract: true }),
        html({
          template: 'test/fixtures/index.html',
          meta: [
            {
              name: 'description',
              content: 'rollup-plugin-create-html',
            },
            {
              name: 'viewport',
              content: 'width=device-width, initial-scale=1',
            },
          ],
        }),
        typescript(),
      ],
    });
    // 导出文件
    const file = <OutputAsset | undefined>(
      output.find(
        ({ fileName, type }) => fileName === 'index.html' && type === 'asset'
      )
    );
    expect(file?.source).toMatchInlineSnapshot(`
      "<!DOCTYPE html>
      <html lang=\\"en\\">
        <head>
          <meta charset=\\"utf-8\\" />
          <meta name=\\"viewport\\" content=\\"width=device-width, initial-scale=1\\">
          <meta name=\\"description\\" content=\\"rollup-plugin-create-html\\">
          <link href=\\"/index.css\\" rel=\\"stylesheet\\">
        </head>
        <body>
          <div id=\\"app\\"></div>
          <script src=\\"/index.js\\" type=\\"module\\"></script>
        </body>
      </html>
      "
    `);
  });

  it('inject: boolean', async () => {
    // 导出
    const output = await getOutput({
      input: 'test/fixtures/index.ts',
      output: {
        dir: 'test/dist',
        format: 'es',
      },
      plugins: [
        postcss({ extract: true }),
        html({
          template: 'test/fixtures/index.html',
          inject: false,
        }),
        typescript(),
      ],
    });
    // 导出文件
    const file = <OutputAsset | undefined>(
      output.find(
        ({ fileName, type }) => fileName === 'index.html' && type === 'asset'
      )
    );
    expect(file?.source).toMatchInlineSnapshot(`
      "<!DOCTYPE html>
      <html lang=\\"en\\">
        <head>
          <meta charset=\\"utf-8\\" />
          <meta name=\\"viewport\\" content=\\"width=device-width\\" />
        </head>
        <body>
          <div id=\\"app\\"></div>
        </body>
      </html>
      "
    `);
  });

  it('inject: Record<string, boolean | LinkAttributes | ScriptAttributes>', async () => {
    // 导出
    const output = await getOutput({
      input: ['test/fixtures/index.ts', 'test/fixtures/test.ts'],
      output: {
        dir: 'test/dist',
        format: 'es',
      },
      plugins: [
        postcss({ extract: true }),
        html({
          template: 'test/fixtures/index.html',
          inject: {
            'index.js': {
              defer: true,
              location: 'head',
            },
            'index.css': {
              media: 'screen and (max-width: 600px)',
            },
            'test.js': false,
          },
        }),
        typescript(),
      ],
    });
    // 导出文件
    const file = <OutputAsset | undefined>(
      output.find(
        ({ fileName, type }) => fileName === 'index.html' && type === 'asset'
      )
    );
    expect(file?.source).toMatchInlineSnapshot(`
      "<!DOCTYPE html>
      <html lang=\\"en\\">
        <head>
          <meta charset=\\"utf-8\\" />
          <meta name=\\"viewport\\" content=\\"width=device-width\\" />
          <link href=\\"/index.css\\" rel=\\"stylesheet\\" media=\\"screen and (max-width: 600px)\\">
          <script src=\\"/index.js\\" type=\\"module\\" defer></script>
        </head>
        <body>
          <div id=\\"app\\"></div>
        </body>
      </html>
      "
    `);
  });

  it('script: ScriptAttributes', async () => {
    // 导出
    const output = await getOutput({
      input: 'test/fixtures/index.ts',
      output: {
        dir: 'test/dist',
        format: 'es',
      },
      plugins: [
        postcss({ extract: true }),
        html({
          template: 'test/fixtures/index.html',
          script: {
            src: 'https://unpkg.com/vue@3/dist/vue.global.js',
            location: 'bodyEnd',
          },
        }),
        typescript(),
      ],
    });
    // 导出文件
    const file = <OutputAsset | undefined>(
      output.find(
        ({ fileName, type }) => fileName === 'index.html' && type === 'asset'
      )
    );
    expect(file?.source).toMatchInlineSnapshot(`
      "<!DOCTYPE html>
      <html lang=\\"en\\">
        <head>
          <meta charset=\\"utf-8\\" />
          <meta name=\\"viewport\\" content=\\"width=device-width\\" />
          <link href=\\"/index.css\\" rel=\\"stylesheet\\">
        </head>
        <body>
          <div id=\\"app\\"></div>
          <script src=\\"https://unpkg.com/vue@3/dist/vue.global.js\\"></script>
          <script src=\\"/index.js\\" type=\\"module\\"></script>
        </body>
      </html>
      "
    `);
  });

  it('script: ScriptAttributes[]', async () => {
    // 导出
    const output = await getOutput({
      input: 'test/fixtures/index.ts',
      output: {
        dir: 'test/dist',
        format: 'es',
      },
      plugins: [
        postcss({ extract: true }),
        html({
          template: 'test/fixtures/index.html',
          script: [
            {
              src: 'https://unpkg.com/vue@3/dist/vue.global.js',
              location: 'bodyEnd',
            },
          ],
        }),
        typescript(),
      ],
    });
    // 导出文件
    const file = <OutputAsset | undefined>(
      output.find(
        ({ fileName, type }) => fileName === 'index.html' && type === 'asset'
      )
    );
    expect(file?.source).toMatchInlineSnapshot(`
      "<!DOCTYPE html>
      <html lang=\\"en\\">
        <head>
          <meta charset=\\"utf-8\\" />
          <meta name=\\"viewport\\" content=\\"width=device-width\\" />
          <link href=\\"/index.css\\" rel=\\"stylesheet\\">
        </head>
        <body>
          <div id=\\"app\\"></div>
          <script src=\\"https://unpkg.com/vue@3/dist/vue.global.js\\"></script>
          <script src=\\"/index.js\\" type=\\"module\\"></script>
        </body>
      </html>
      "
    `);
  });

  it('link: LinkAttributes', async () => {
    // 导出
    const output = await getOutput({
      input: 'test/fixtures/index.ts',
      output: {
        dir: 'test/dist',
        format: 'es',
      },
      plugins: [
        postcss({ extract: true }),
        html({
          template: 'test/fixtures/index.html',
          link: {
            href: 'https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css',
            rel: 'stylesheet',
          },
        }),
        typescript(),
      ],
    });
    // 导出文件
    const file = <OutputAsset | undefined>(
      output.find(
        ({ fileName, type }) => fileName === 'index.html' && type === 'asset'
      )
    );
    expect(file?.source).toMatchInlineSnapshot(`
      "<!DOCTYPE html>
      <html lang=\\"en\\">
        <head>
          <meta charset=\\"utf-8\\" />
          <meta name=\\"viewport\\" content=\\"width=device-width\\" />
          <link href=\\"https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css\\" rel=\\"stylesheet\\">
          <link href=\\"/index.css\\" rel=\\"stylesheet\\">
        </head>
        <body>
          <div id=\\"app\\"></div>
          <script src=\\"/index.js\\" type=\\"module\\"></script>
        </body>
      </html>
      "
    `);
  });

  it('link: LinkAttributes[]', async () => {
    // 导出
    const output = await getOutput({
      input: 'test/fixtures/index.ts',
      output: {
        dir: 'test/dist',
        format: 'es',
      },
      plugins: [
        postcss({ extract: true }),
        html({
          template: 'test/fixtures/index.html',
          link: [
            {
              href: 'https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css',
              rel: 'stylesheet',
            },
            {
              href: 'test/fixtures/images/icon.png',
              rel: 'icon',
            },
          ],
        }),
        typescript(),
      ],
    });
    // 导出文件
    const file = <OutputAsset | undefined>(
      output.find(
        ({ fileName, type }) => fileName === 'index.html' && type === 'asset'
      )
    );
    expect(file?.source).toMatchInlineSnapshot(`
      "<!DOCTYPE html>
      <html lang=\\"en\\">
        <head>
          <meta charset=\\"utf-8\\" />
          <meta name=\\"viewport\\" content=\\"width=device-width\\" />
          <link href=\\"https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css\\" rel=\\"stylesheet\\">
          <link href=\\"/icon.png\\" rel=\\"icon\\">
          <link href=\\"/index.css\\" rel=\\"stylesheet\\">
        </head>
        <body>
          <div id=\\"app\\"></div>
          <script src=\\"/index.js\\" type=\\"module\\"></script>
        </body>
      </html>
      "
    `);
    // 导出文件
    const exists = output.some(
      ({ fileName, type }) => fileName === 'icon.png' && type === 'asset'
    );
    expect(exists).toBe(true);
  });

  it('fileName', async () => {
    // 文件名
    const outFileName = 'test.html';
    // 导出
    const output = await getOutput({
      input: 'test/fixtures/index.ts',
      output: {
        dir: 'test/dist',
        format: 'es',
      },
      plugins: [
        postcss({ extract: true }),
        html({
          template: 'test/fixtures/index.html',
          fileName: outFileName,
        }),
        typescript(),
      ],
    });
    // 导出存在
    const exists = output.some(
      ({ fileName, type }) => fileName === outFileName && type === 'asset'
    );
    expect(exists).toBe(true);
  });

  it('minifyOptions', async () => {
    // 导出
    const output = await getOutput({
      input: 'test/fixtures/index.ts',
      output: {
        dir: 'test/dist',
        format: 'es',
      },
      plugins: [
        postcss({ extract: true }),
        html({
          template: 'test/fixtures/index.html',
        }),
        typescript(),
      ],
    });
    // 导出文件
    const file = <OutputAsset | undefined>(
      output.find(
        ({ fileName, type }) => fileName === 'index.html' && type === 'asset'
      )
    );
    expect(file?.source).toMatchInlineSnapshot(
      `
      "<!DOCTYPE html>
      <html lang=\\"en\\">
        <head>
          <meta charset=\\"utf-8\\" />
          <meta name=\\"viewport\\" content=\\"width=device-width\\" />
          <link href=\\"/index.css\\" rel=\\"stylesheet\\">
        </head>
        <body>
          <div id=\\"app\\"></div>
          <script src=\\"/index.js\\" type=\\"module\\"></script>
        </body>
      </html>
      "
    `
    );
  });
});
