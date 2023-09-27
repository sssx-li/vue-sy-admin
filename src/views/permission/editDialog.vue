<template>
  <el-dialog
    v-model="visible"
    :title="type === 'create' ? $t('table.create') : $t('table.edit')"
    :width="520"
    @closed="resetDialog"
  >
    <el-form
      :model="formInline"
      :rules="rules"
      ref="formRef"
      label-width="100px"
      style="max-width: 460px"
    >
      <el-form-item label="上级名称" prop="pid">
        <el-tree-select
          v-model="formInline.pid"
          :disabled="disableTreeSelect"
          :data="permissionOptions"
          :render-after-expand="false"
          :props="{ label: ({ meta }: any) =>  keyInI18n(meta.title as string, 'nav')
                ? $t(`nav.${meta.title}`) + `(${meta.title})`
                : meta.title, value: 'id' }"
          check-strictly
          clearable
          filterable
          class="w-100%"
        >
          <template #default="{ data: { name, meta } }">
            {{
              keyInI18n(meta.title as string, 'nav')
                ? $t(`nav.${meta.title}`) + `(${name})`
                : meta.title
            }}
          </template>
        </el-tree-select>
      </el-form-item>
      <el-form-item label="名称" prop="meta.title">
        <el-input
          v-model="formInline.meta.title"
          autocomplete="off"
          placeholder="eg. 首页"
        />
      </el-form-item>
      <el-form-item label="路径" prop="path">
        <el-input
          v-model="formInline.path"
          autocomplete="off"
          placeholder="eg. /dashboard"
        />
      </el-form-item>
      <el-form-item
        label="图标"
        prop="meta.icon"
        v-if="formInline.type === 'menu'"
      >
        <icon-select v-model="formInline.meta.icon" />
      </el-form-item>
      <el-form-item label="组件路径" prop="meta.component">
        <el-input
          v-model="formInline.meta.component"
          autocomplete="off"
          placeholder="eg. ../view/dashboard/index.vue"
        />
      </el-form-item>
      <el-form-item label="类型" prop="type">
        <el-select
          v-model="formInline.type"
          placeholder="请选择类型"
          class="w-100%"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="resetDialog" :disabled="loading"> 取消 </el-button>
        <el-button type="primary" @click="handleConfirm" :loading="loading">
          确定
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import type { DialogCallbackType } from '@/hooks/useDialog';
import type {
  PermissionType,
  PermissionUIItem,
  RouteMeta,
} from '@/service/types';

defineOptions({
  name: 'permissionEditDialog',
  inheritAttrs: false,
});

export interface EmitType {
  (e: 'callback', type: DialogCallbackType): void;
  (e: 'update:disableTreeSelect', value: boolean): void;
}
defineProps<{
  permissionOptions: PermissionUIItem[];
  disableTreeSelect: boolean;
}>();
const emit = defineEmits<EmitType>();

const queryForm: {
  path: string;
  type: PermissionType;
  pid: string | null;
  meta: RouteMeta;
} = {
  path: '',
  type: 'menu',
  pid: null,
  meta: { icon: '', title: '', component: '' },
};

const options: { label: string; value: PermissionType | 'close' }[] = [
  { label: '菜单权限', value: 'menu' },
  { label: '按钮权限', value: 'button' },
];

const {
  formInline,
  formRef,
  rules,
  loading,
  visible,
  type,
  resetDialog,
  handleConfirm,
  handleCreate,
  handleEdit,
  openDialog,
} = useDialog<typeof queryForm>({
  url: PermissionEnum.PERMISSIONS,
  queryForm,
  validateRules: {
    'meta.title': [
      {
        required: true,
        message: '请输入名称',
        trigger: 'blur',
      },
    ],
    path: [
      {
        required: true,
        message: '请输入路径',
        trigger: 'blur',
      },
    ],
    type: [
      {
        required: true,
        message: '请选择类型',
        trigger: 'change',
      },
    ],
  },
  callback: (_type: DialogCallbackType) => {
    if (_type === 'close') {
      emit('update:disableTreeSelect', false);
    } else {
      emit('callback', _type);
    }
  },
});

defineExpose({
  handleCreate,
  handleEdit,
  openDialog,
});
</script>

<style lang="scss" scoped></style>
