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
      <el-form-item label="名称" prop="name">
        <el-input v-model="formInline.name" placeholder="请输入名称"></el-input>
      </el-form-item>
      <el-form-item label="类型" prop="type">
        <el-select
          style="width: 100%"
          v-model="formInline.type"
          placeholder="请选择类型"
        >
          <el-option
            v-for="role in roleOptions"
            :key="role.value"
            :value="role.value"
            :label="role.label"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="权限" prop="ids">
        <!-- check-strictly:遵循父子不互相关联的做法。相关时父级id不会被选中，后续有时间优化 -->
        <el-tree-select
          v-model="formInline.ids"
          :data="permissionOptions"
          :render-after-expand="false"
          :props="{ label: ({ meta }: any) => `${i18nKey2Text(meta.title as string, 'nav')}${locale === 'zh' ? ('(' + meta.title + ')') : ''}`, value: 'id' }"
          node-key="id"
          clearable
          multiple
          filterable
          check-on-click-node
          show-checkbox
          check-strictly
          class="w-100%"
        >
          <template #default="{ data: { name, meta } }">
            {{
              `${i18nKey2Text(meta.title as string, 'nav')}${
                locale === 'zh' ? '(' + name + ')' : ''
              }`
            }}
          </template>
        </el-tree-select>
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
import type { PermissionUIItem, RoleType } from '@/service/types';

defineOptions({
  name: 'roleEditDialog',
  inheritAttrs: false,
});

interface EmitType {
  (e: 'callback', type: DialogCallbackType): void;
}
defineProps<{
  permissionOptions: PermissionUIItem[];
}>();
const emit = defineEmits<EmitType>();

const { locale } = useI18n();
const queryForm: {
  name: string;
  type: RoleType;
  ids: number[];
} = {
  name: '',
  type: 'admin',
  ids: [],
};

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
  url: RoleEnum.ROLE,
  queryForm,
  validateRules: {
    name: [
      {
        required: true,
        message: '请输入名称',
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
    if (_type !== 'close') {
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
