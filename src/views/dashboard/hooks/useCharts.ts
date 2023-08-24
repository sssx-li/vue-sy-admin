import type { DashboardStatistic } from '@/service/types';

export function useCharts() {
  const interviewChartRef = ref<HTMLDivElement>();
  const { setOption: setInterviewData } = useEcharts(interviewChartRef);

  const followChartRef = ref<HTMLDivElement>();
  const { setOption: setFollowData } = useEcharts(followChartRef);

  async function getInterviewData() {
    const { code, data } = await useHandleApiRes<
      Omit<DashboardStatistic, 'name'>[]
    >(dashboardInterviewStatistics());
    if (code === ResponseStatusCodeEnum.success) {
      setInterviewData({
        xAxis: {
          type: 'category',
          data: data.map((item) => item.time) as string[],
        },
        yAxis: {
          type: 'value',
        },
        series: [
          {
            type: 'line',
            smooth: true,
            data: data.map((item) => item.count) as number[],
          },
        ],
      });
    }
  }

  async function getFollowData() {
    const { code, data } = await useHandleApiRes<
      Omit<DashboardStatistic, 'time'>[]
    >(dashboardFollowStatistics());
    if (code === ResponseStatusCodeEnum.success) {
      console.log('data2', data);
      setFollowData({
        tooltip: {
          trigger: 'item',
        },
        series: [
          {
            type: 'pie',
            radius: '60%',
            data: data.map((item) => ({ value: item.count, name: item.name })),
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)',
              },
            },
          },
        ],
      });
    }
  }

  return {
    // 访问量统计数据
    interviewChartRef,
    getInterviewData,

    // 关注人群统计数据
    followChartRef,
    getFollowData,
  };
}
