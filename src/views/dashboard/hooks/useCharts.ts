import type { DashboardStatistic } from '@/service/types';

export function useCharts() {
  // 关注量统计
  const interviewChartRef = ref<HTMLDivElement>();
  const { setOption: setInterviewData } = useEcharts(interviewChartRef);
  async function getInterviewData() {
    const { code, data } = await useHandleApiRes<
      Omit<DashboardStatistic, 'name'>[]
    >(dashboardInterviewStatistics());
    if (code === ResponseStatusCodeEnum.success) {
      setInterviewData({
        tooltip: {
          trigger: 'axis',
        },
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

  // 访问人群统计
  const followChartRef = ref<HTMLDivElement>();
  const { setOption: setFollowData } = useEcharts(followChartRef);
  async function getFollowData() {
    const { code, data } = await useHandleApiRes<
      Omit<DashboardStatistic, 'time'>[]
    >(dashboardFollowStatistics());
    if (code === ResponseStatusCodeEnum.success) {
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
    // 关注量统计
    interviewChartRef,
    getInterviewData,

    // 访问人群统计
    followChartRef,
    getFollowData,
  };
}
