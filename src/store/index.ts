import piniaPersist from 'pinia-plugin-persist';

export const useStore = () => {
  return {
    user: useUserStore(),
  };
};

const store = createPinia();

// 持久化pinia
export default store.use(piniaPersist);
