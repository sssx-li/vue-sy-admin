import type { DashboardCountInfo } from '@/service/types';

/**
 * 统计数据
 * @returns
 */
export function useCount() {
  const countState = ref([0, 0, 0]);
  const transitionCountState = useTransition(countState, {
    duration: 1000,
    transition: [0.75, 0, 0.25, 1],
  });

  const UICountInfos = computed(() => [
    {
      title: '访问量',
      icon: 'interviews',
      color: '#409eff',
      count: transitionCountState.value[0].toFixed(0),
    },
    {
      title: '留言量',
      icon: 'messages',
      color: '#eebe77',
      count: transitionCountState.value[1].toFixed(0),
    },
    {
      title: '关注量',
      icon: 'follows',
      color: '#67c23a',
      count: transitionCountState.value[2].toFixed(0),
    },
  ]);

  (async () => {
    const {
      code,
      data: { interviews, messages, follows },
    } = await useHandleApiRes<DashboardCountInfo>(dashboardCountInfo());
    if (code === ResponseStatusCodeEnum.success) {
      countState.value = [interviews, messages, follows];
    }
  })();

  return {
    countState,
    UICountInfos,
  };
}
