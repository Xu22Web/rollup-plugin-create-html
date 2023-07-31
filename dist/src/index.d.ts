import type { Plugin } from 'rollup';
import type { HTMLTemplatePluginOptions } from '../types';
/**
 * @description html-template 插件
 * @returns
 */
declare const htmlTemplate: (options: Readonly<HTMLTemplatePluginOptions>) => Plugin;
export default htmlTemplate;
