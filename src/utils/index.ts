/**
 * @description 检验对象
 * @param val
 * @returns
 */
const isObject = (val: unknown): val is object => typeof val === 'object';

/**
 * @description 检验布尔
 * @param val
 * @returns
 */
const isBoolean = (val: unknown): val is boolean => typeof val === 'boolean';

/**
 * @description 检验字符串
 * @param val
 * @returns
 */
const isString = (val: unknown): val is string => typeof val === 'string';

/**
 * @description 检验数组
 * @param val
 * @returns
 */
const isArray = (val: unknown): val is any[] => Array.isArray(val);

/**
 * @description 检验undefined
 * @param val
 * @returns
 */
const isUndefined = (val: unknown): val is undefined => val === undefined;

/**
 * @description 检验样式表
 * @param val
 * @returns
 */
const isStyle = (val: string) => /.+\.css$/.test(val);

/**
 * @description 检验脚本
 * @param val
 * @returns
 */
const isScript = (val: string) => /.+\.m?js$/.test(val);

export {
  isArray,
  isObject,
  isBoolean,
  isUndefined,
  isString,
  isScript,
  isStyle,
};
