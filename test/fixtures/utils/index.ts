import { OutputOptions, RollupOptions, rollup } from 'rollup';

/**
 * @description 获取输出
 * @param config
 * @returns
 */
const getOutput = async (config: RollupOptions) => {
  // bundle
  const bundle = await rollup(config);
  // 输出
  const { output } = await bundle.generate(<OutputOptions>config.output);
  return output;
};

export { getOutput };
