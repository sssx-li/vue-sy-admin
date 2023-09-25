<template>
  <el-dialog
    v-model="visible"
    :title="type === 'create' ? $t('table.create') : $t('table.edit')"
  >
    <el-form
      :model="formInline"
      :rules="rules"
      ref="formRef"
      label-width="100px"
      style="max-width: 460px"
    >
      <el-form-item label="名称" prop="name">
        <el-input
          v-model="formInline.name"
          autocomplete="off"
          placeholder="请输入名称"
        />
      </el-form-item>
      <el-form-item label="路径" prop="path">
        <el-input
          v-model="formInline.path"
          autocomplete="off"
          placeholder="请输入路径"
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
import type { DialogType } from '@/hooks/useDialog';
import { PermissionType } from '@/service/types';

defineOptions({
  name: 'permissionEditDialog',
  inheritAttrs: false,
});

export interface EmitType {
  (e: 'callback', type: DialogType, ext?: any): void;
}

const emit = defineEmits<EmitType>();

const queryForm: {
  path: string;
  type: PermissionType;
  name: string;
} = {
  name: '',
  path: '',
  type: 'menu',
};

const options: { label: string; value: PermissionType }[] = [
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
    name: [
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
  callback: () => {
    emit('callback', type.value);
  },
});

defineExpose({
  handleCreate,
  handleEdit,
  openDialog,
});
</script>

<style lang="scss" scoped></style>
