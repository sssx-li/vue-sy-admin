import { usePagination } from './usePagination';

import type { FormInstance, FormRules } from 'element-plus';
import type { TableItem, TableRes } from '@/service/types';

type THandle = 'create' | 'edit' | 'delete';

export function usePage<T = TableItem>({
  url,
  searchForm = {},
  queryForm = {},
  validateRules = {} as FormRules,
}: {
  url: string;
  searchForm?: Record<string, any>;
  queryForm?: Record<string, any>;
  validateRules: FormRules;
}) {
  const { success } = useMessage();
  const { t } = useI18n();
  const confirm = useConfirm();
  const loading = ref(false);
  const dataSource = reactive<TableRes<T>>({ data: [], count: 0 });

  const { pageInfo, pageSizeChange, currentPageChange, resetPageSize } =
    usePagination();
  watch(
    () => pageInfo,
    () => {
      getPageData();
    },
    { deep: true }
  );

  const formInline = reactive({ ...queryForm });
  const formRef = ref<FormInstance>();
  const rules = reactive<FormRules>(validateRules);
  const dialogParams = reactive<{
    visible: boolean;
    loading: boolean;
    type: Exclude<THandle, 'delete'>;
  }>({
    visible: false,
    loading: false,
    type: 'create',
  });
  const getPageData = async () => {
    loading.value = true;
    const { data, code } = await useHandleApiRes<TableRes<T>>(
      ApiRequest.get({
        url,
        params: { ...searchForm, ...pageInfo },
      })
    );
    if (code === ResponseStatusCodeEnum.success) {
      Object.assign(dataSource, data);
    }
    loading.value = false;
  };

  const handleCancel = () => {
    dialogParams.type = 'create';
    dialogParams.visible = false;
    dialogParams.loading = false;
    Object.assign(formInline, { ...queryForm });
    formRef.value?.resetFields();
  };
  const handleConfirm = () => {
    formRef.value?.validate().then(async (valid) => {
      if (valid) {
        dialogParams.loading = true;
        if (dialogParams.type === 'create') {
          await handleCreate();
        } else {
          await handleEdit();
        }
        handleCancel();
        pageInfo.currentPage === 1 ? getPageData() : resetPageSize();
      }
    });
  };
  const handleAction = (type: THandle, row?: Record<string, any>) => {
    if (type === 'delete') {
      handleDelete(row!);
      return;
    }
    Object.assign(formInline, type === 'create' ? { ...queryForm } : row);
    dialogParams.type = type as Exclude<THandle, 'delete'>;
    dialogParams.visible = true;
  };
  const handleCreate = async () => {
    const { code } = await useHandleApiRes(
      ApiRequest.post({
        url,
        data: {
          ...formInline,
        },
      })
    );
    if (code === ResponseStatusCodeEnum.success) {
      success(t('tips.create_success'));
    }
  };
  const handleEdit = async () => {
    const { code } = await useHandleApiRes(
      ApiRequest.put({
        url,
        data: {
          ...formInline,
        },
      })
    );
    if (code === ResponseStatusCodeEnum.success) {
      success(t('tips.edit_success'));
    }
  };
  const handleDelete = (row: Record<string, any>) => {
    confirm({
      title: t('tips.delete'),
      content: t('tips.delete_confirm', {
        desc: row.name,
      }),
      options: {
        type: 'warning',
      },
    }).then(async () => {
      const { code } = await useHandleApiRes(
        ApiRequest.delete({
          url,
          params: { id: row.id },
        })
      );
      if (code === ResponseStatusCodeEnum.success) {
        success(t('tips.delete_success'));
        pageInfo.currentPage === 1 ? getPageData() : resetPageSize();
      }
    });
  };
  getPageData();

  return {
    loading,
    dataSource,
    pageInfo,
    formInline,
    formRef,
    rules,
    dialogParams,
    getPageData,
    pageSizeChange,
    currentPageChange,
    handleAction,
    handleCreate,
    handleEdit,
    handleDelete,
    handleCancel,
    handleConfirm,
  };
}
