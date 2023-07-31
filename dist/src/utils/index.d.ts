/**
 * @description 检验对象
 * @param val
 * @returns
 */
declare const isObject: (val: unknown) => val is object;
/**
 * @description 检验布尔
 * @param val
 * @returns
 */
declare const isBoolean: (val: unknown) => val is boolean;
/**
 * @description 检验字符串
 * @param val
 * @returns
 */
declare const isString: (val: unknown) => val is string;
/**
 * @description 检验数组
 * @param val
 * @returns
 */
declare const isArray: (val: unknown) => val is any[];
/**
 * @description 检验undefined
 * @param val
 * @returns
 */
declare const isUndefined: (val: unknown) => val is undefined;
/**
 * @description 检验样式表
 * @param val
 * @returns
 */
declare const isStyle: (val: string) => boolean;
/**
 * @description 检验脚本
 * @param val
 * @returns
 */
declare const isScript: (val: string) => boolean;
export { isArray, isObject, isBoolean, isUndefined, isString, isScript, isStyle, };
