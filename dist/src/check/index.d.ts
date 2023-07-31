import { PluginContext } from 'rollup';
import { HTMLTemplatePluginOptions } from '../../types';
/**
 * @description 校验模板
 * @param ctx
 * @param param1
 * @returns
 */
declare const checkTemplateAndFileName: (ctx: PluginContext, { template, fileName, }: Pick<HTMLTemplatePluginOptions, 'template' | 'fileName'>) => void;
/**
 * @description 校验注入
 * @param ctx
 * @param param1
 * @returns
 */
declare const checkInject: (ctx: PluginContext, { inject }: Pick<HTMLTemplatePluginOptions, 'inject'>) => void;
/**
 * @description 校验标题
 * @param ctx
 * @param param1
 * @returns
 */
declare const checkTitle: (ctx: PluginContext, { title }: Pick<HTMLTemplatePluginOptions, 'title'>) => void;
/**
 * @description 校验 meta
 * @param ctx
 * @param param1
 * @returns
 */
declare const checkMeta: (ctx: PluginContext, { meta }: Pick<HTMLTemplatePluginOptions, 'meta'>) => void;
/**
 * @description 校验 link
 * @param ctx
 * @param param1
 * @returns
 */
declare const checkLink: (ctx: PluginContext, { link }: Pick<HTMLTemplatePluginOptions, 'link'>) => void;
/**
 * @description 校验 script
 * @param ctx
 * @param param1
 * @returns
 */
declare const checkScript: (ctx: PluginContext, { script }: Pick<HTMLTemplatePluginOptions, 'script'>) => void;
/**
 * @description 校验 prefix
 * @param ctx
 * @param param1
 * @returns
 */
declare const checkPrefix: (ctx: PluginContext, { prefix }: Pick<HTMLTemplatePluginOptions, 'prefix'>) => void;
export { checkInject, checkLink, checkScript, checkMeta, checkPrefix, checkTemplateAndFileName, checkTitle, };
