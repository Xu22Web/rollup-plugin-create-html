import fs from 'fs';
import { PluginContext } from 'rollup';
import { HTMLTemplatePluginOptions } from '../../types';
import { isArray, isBoolean, isObject, isString } from '../utils';

/**
 * @description 校验模板
 * @param ctx
 * @param param1
 * @returns
 */
const checkTemplateAndFileName = (
  ctx: PluginContext,
  {
    template,
    fileName,
  }: Pick<HTMLTemplatePluginOptions, 'template' | 'fileName'>
) => {
  if (isString(template) && template) {
    // 文件存在
    const exists = fs.existsSync(template);
    // 存在
    if (exists) {
      // 是否是文件
      const isFile = fs.statSync(template).isFile();
      if (isFile) {
        // 加入文件监听
        ctx.addWatchFile(template);
        ctx.cache.set('templateIsFile', isFile);
        return;
      }
    }
    // template is an html
    if (!fileName) {
      ctx.error(
        'When `template` is an HTML string, the `fileName` option must be defined'
      );
    }
    ctx.cache.set('templateIsFile', false);
    return;
  }
  // template 不存在
  ctx.error('`template` must be defined as a file path or an HTML string');
};

/**
 * @description 校验注入
 * @param ctx
 * @param param1
 * @returns
 */
const checkInject = (
  ctx: PluginContext,
  { inject }: Pick<HTMLTemplatePluginOptions, 'inject'>
) => {
  if (inject === undefined) {
    return;
  }
  if (isBoolean(inject)) {
    return;
  }
  if (
    isObject(inject) &&
    Object.values(inject).every((v) => isBoolean(v) || isObject(v))
  ) {
    return;
  }
  ctx.warn(
    'Invalid `inject` must be `true`, `false`, Recored<string, boolean | LinkAttributes | ScriptAttributes> or `undefined`'
  );
};

/**
 * @description 校验标题
 * @param ctx
 * @param param1
 * @returns
 */
const checkTitle = (
  ctx: PluginContext,
  { title }: Pick<HTMLTemplatePluginOptions, 'title'>
) => {
  if (title === undefined) {
    return;
  }
  if (isString(title)) {
    return;
  }
  ctx.warn('Invalid `title` must be `string` or `undefined`');
};

/**
 * @description 校验 meta
 * @param ctx
 * @param param1
 * @returns
 */
const checkMeta = (
  ctx: PluginContext,
  { meta }: Pick<HTMLTemplatePluginOptions, 'meta'>
) => {
  if (meta === undefined) {
    return;
  }
  if (isArray(meta) && meta.every((m) => m instanceof Object)) {
    return;
  }
  if (isObject(meta)) {
    return;
  }
  ctx.warn('Invalid `meta` must be `object`, `object[]` or `undefined`');
};

/**
 * @description 校验 link
 * @param ctx
 * @param param1
 * @returns
 */
const checkLink = (
  ctx: PluginContext,
  { link }: Pick<HTMLTemplatePluginOptions, 'link'>
) => {
  if (link === undefined) {
    return;
  }
  if (isArray(link) && link.every((l) => isObject(l))) {
    return;
  }
  if (isObject(link)) {
    return;
  }
  ctx.warn('Invalid `link` must be `object`, `object[]` or `undefined`');
};

/**
 * @description 校验 script
 * @param ctx
 * @param param1
 * @returns
 */
const checkScript = (
  ctx: PluginContext,
  { script }: Pick<HTMLTemplatePluginOptions, 'script'>
) => {
  if (script === undefined) {
    return;
  }
  if (isArray(script) && script.every((s) => isObject(s))) {
    return;
  }
  if (isObject(script)) {
    return;
  }
  ctx.warn('Invalid `script` must be `object`, `object[]` or `undefined`');
};

/**
 * @description 校验 prefix
 * @param ctx
 * @param param1
 * @returns
 */
const checkPrefix = (
  ctx: PluginContext,
  { prefix }: Pick<HTMLTemplatePluginOptions, 'prefix'>
) => {
  if (prefix === undefined) {
    return;
  }

  if (isString(prefix)) {
    return;
  }
  ctx.warn('Invalid `prefix` must be `string` or `undefined`');
};

export {
  checkInject,
  checkLink,
  checkScript,
  checkMeta,
  checkPrefix,
  checkTemplateAndFileName,
  checkTitle,
};
