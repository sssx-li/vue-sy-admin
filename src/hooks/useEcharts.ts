import * as echarts from 'echarts';

/**
 *
 * @param { HTMLElement | Ref<HTMLElement | undefined> } el html元素
 * @returns
 *
 */
export function useEcharts(el: HTMLElement | Ref<HTMLElement | undefined>) {
  let echartInstance: echarts.ECharts;

  /**
   * 初始化图表配置
   * @param options 图表配置项数据
   */
  const setOption = (options: echarts.EChartsOption) => {
    echartInstance.setOption(options);
  };

  /**
   * 更新图表数据
   * @param data SeriesOption
   */
  const updateData = (data: echarts.SeriesOption) => {
    const options = echartInstance.getOption() as echarts.EChartsOption;
    options.series = data;
    echartInstance.setOption(options, true);
  };

  useEventListener(window, 'resize', () => {
    echartInstance.resize();
  });

  onMounted(() => {
    const dom = toValue(el);
    echartInstance = echarts.init(dom);
  });

  return {
    echartInstance: echartInstance!,
    setOption,
    updateData,
  };
}
