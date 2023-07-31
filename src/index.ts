import fs from 'fs';
import { parse } from 'node-html-parser';
import path from 'path';
import type {
  NormalizedOutputOptions,
  OutputBundle,
  Plugin,
  PluginContext,
} from 'rollup';
import type {
  HTMLTemplatePluginOptions,
  LinkAttributes,
  ScriptAttributes,
} from '../types';
import {
  checkInject,
  checkLink,
  checkMeta,
  checkPrefix,
  checkScript,
  checkTemplateAndFileName,
  checkTitle,
} from './check';
import { createElement, getElement, insertElement } from './html';
import {
  isArray,
  isBoolean,
  isObject,
  isScript,
  isString,
  isStyle,
} from './utils';

/**
 * @description 处理注入
 * @param param0
 * @returns
 */
const handleInject = (
  ctx: PluginContext,
  {
    link,
    script,
    inject,
    bundle,
    output,
    prefix,
  }: Pick<HTMLTemplatePluginOptions, 'link' | 'script' | 'inject'> & {
    bundle: OutputBundle;
    output: NormalizedOutputOptions;
    prefix: string;
  }
) => {
  // links
  const links = link ? (Array.isArray(link) ? link : [link]) : [];
  // scripts
  const scripts = script ? (Array.isArray(script) ? script : [script]) : [];
  // 存在 link
  if (links.length) {
    links.forEach((link) => {
      // 链接
      const { href } = link;
      if (href && fs.existsSync(href)) {
        // 文件状态
        const state = fs.statSync(href);
        // 文件
        if (state.isFile()) {
          // 文件名
          const fileName = path.basename(href);
          // 文件路径
          const filePath = `${prefix}${fileName}`;
          link.href = filePath;
          ctx.emitFile({
            fileName,
            source: fs.readFileSync(href),
            type: 'asset',
          });
          return;
        }
        ctx.error('Invalid `href` must be a local path or a url');
      }
    });
  }
  // 存在 script
  if (scripts.length) {
    scripts.forEach((script) => {
      // 链接
      const { src } = script;
      if (src && fs.existsSync(src)) {
        // 文件状态
        const state = fs.statSync(src);
        // 文件
        if (state.isFile()) {
          // 文件名
          const fileName = path.basename(src);
          // 文件路径
          const filePath = `${prefix}${fileName}`;
          script.src = filePath;
          ctx.emitFile({
            fileName,
            source: fs.readFileSync(src),
            type: 'asset',
          });
          return;
        }
        ctx.error('Invalid `src` must be a local path or a url');
      }
    });
  }
  // 注入
  if (inject) {
    Object.values(bundle).forEach((file) => {
      // 文件信息
      const { fileName } = file;
      // 不注入
      if (
        isObject(inject) &&
        isBoolean(inject[fileName]) &&
        !inject[fileName]
      ) {
        return;
      }
      // 属性
      const attrs =
        isObject(inject) && isObject(inject[fileName])
          ? <LinkAttributes | ScriptAttributes>inject[fileName]
          : {};
      // 文件路径
      const filePath = `${prefix}${fileName}`;
      // asset 文件
      if (file.type !== 'chunk') {
        // 样式文件
        if (isStyle(fileName)) {
          links.push({
            href: filePath,
            rel: 'stylesheet',
            ...attrs,
          });
          return;
        }
        // 脚本文件
        if (isScript(fileName)) {
          scripts.push({
            src: filePath,
            ...attrs,
          });
          return;
        }
      }
      // 入口文件快
      if (file.type === 'chunk' && file.isEntry) {
        // 脚本文件
        if (isScript(fileName)) {
          scripts.push({
            src: filePath,
            type: output.format === 'es' ? 'module' : undefined,
            ...attrs,
          });
          return;
        }
      }
    });
  }
  return { links, scripts };
};

/**
 * @description 创建 html 模板
 * @param ctx
 * @param data
 * @param param2
 */
const createHTML = (
  ctx: PluginContext,
  data: string,
  {
    title,
    meta,
    links,
    scripts,
  }: Pick<HTMLTemplatePluginOptions, 'title' | 'meta'> & {
    links: LinkAttributes[];
    scripts: ScriptAttributes[];
  }
) => {
  // 文档
  const doc = parse(data, {
    comment: true,
    lowerCaseTagName: true,
    parseNoneClosedTags: true,
    voidTag: {
      closingSlash: true,
    },
  });
  // html
  const html = doc.querySelector('html');
  if (!html) {
    ctx.error("`template` doesn't contain the `html` tag");
  }
  // head
  const head = getElement(html, 'head', false);
  // <meta>
  if (meta) {
    // 查找已存在 meta
    const metaEles = head.querySelectorAll('meta');
    // metas
    const metas = isArray(meta) ? meta : [meta];
    metas.forEach((meta) => {
      // attrs
      const { name, content } = meta;
      // 新 meta
      const newMeta = createElement(head, 'meta', {
        name,
        content,
      });
      if (isString(name)) {
        // 旧 meta
        const oldMeta = metaEles.find(
          (metaEle) => metaEle.attributes.name === name
        );
        // 替换旧 meta
        if (oldMeta) {
          head.exchangeChild(oldMeta, newMeta);
          return;
        }
      }
      // 插入元素
      insertElement(head, newMeta, true);
    });
  }
  // <title>
  if (title) {
    const titleEle = getElement(head, 'title', true);
    titleEle.set_content(title);
  }

  // <link>
  if (links.length) {
    // 插入 head
    links.forEach((attrs) => {
      // link 元素
      const linkEle = createElement(head, 'link', attrs);
      // 插入元素
      insertElement(head, linkEle, true);
    });
  }
  // <script>
  if (scripts.length) {
    // <body>
    const body = getElement(html, 'body', true);
    // 插入 head
    scripts.forEach((attrs) => {
      // 插入位置
      const { location } = attrs;
      // 属性过滤
      const attrsFiltered = Object.fromEntries(
        Object.entries(attrs).filter(([key]) => key !== 'location')
      );
      if (location === 'head') {
        // script 元素
        const scriptEle = createElement(head, 'script', attrsFiltered);
        // 插入元素
        insertElement(head, scriptEle, true);
        return;
      }
      if (location === 'bodyStart') {
        // script 元素
        const scriptEle = createElement(body, 'script', attrsFiltered);
        // 插入元素
        insertElement(body, scriptEle, false);
        return;
      }
      // script 元素
      const scriptEle = createElement(body, 'script', attrsFiltered);
      // 插入元素
      insertElement(body, scriptEle, true);
    });
  }
  return doc.toString();
};

/**
 * @description html-template 插件
 * @returns
 */
const htmlTemplate = (options: Readonly<HTMLTemplatePluginOptions>): Plugin => {
  // 配置
  let {
    template,
    inject = true,
    title,
    meta,
    link,
    script,
    fileName,
    prefix = '',
  } = options;
  prefix = prefix.endsWith('/') ? prefix : `${prefix}/`;
  return {
    name: 'html-template',
    buildStart() {
      // 模板和文件名
      checkTemplateAndFileName(this, { template, fileName });
      // 注入
      checkInject(this, { inject });
      // 标题
      checkTitle(this, { title });
      // meta
      checkMeta(this, { meta });
      // link
      checkLink(this, { link });
      // script
      checkScript(this, { script });
      // prefix
      checkPrefix(this, { prefix });
    },
    outputOptions(options) {
      // 配置
      const { dir, file } = options;
      // 文件名存在
      if (fileName) {
        // 模板文件名
        const templateFileName = path.basename(fileName);
        this.cache.set('templateFileName', templateFileName);
        return;
      }
      // 目标路径
      let distDir = './';
      if (dir) {
        distDir = path.resolve(distDir, dir);
      } else if (file) {
        // 打包路径
        const bundleDir = path.dirname(file);
        distDir = path.resolve(distDir, bundleDir);
      }
      // 模板文件名
      const templateFileName = path.basename(template);
      // 模板文件路径
      const templateFilePath = path.resolve(distDir, path.basename(template));
      if (templateFilePath !== path.resolve(template)) {
        this.cache.set('templateFileName', templateFileName);
        return;
      }
      this.error(
        "Could't write the generated HTML to the source template, define one of the options: `file`, `output.file` or `output.dir`"
      );
    },
    generateBundle(output, bundle) {
      // 是否是文件
      const isFile = this.cache.get<boolean>('templateIsFile');
      // 模板文件名
      const templateFileName = this.cache.get<string>('templateFileName');
      // HTML template 字符串
      const data = isFile
        ? fs.readFileSync(template, { encoding: 'utf-8' })
        : template;
      // 处理 inject
      const { links, scripts } = handleInject(this, {
        link,
        script,
        bundle,
        output,
        inject,
        prefix,
      });
      // html
      let source = createHTML(this, data, {
        title,
        meta,
        links,
        scripts,
      });
      this.emitFile({
        fileName: templateFileName,
        source,
        type: 'asset',
      });
    },
  };
};

export default htmlTemplate;
