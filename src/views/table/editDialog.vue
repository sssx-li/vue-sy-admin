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
      <el-form-item :label="$t('table.username')" prop="name">
        <el-input v-model="formInline.name" autocomplete="off" />
      </el-form-item>
      <el-form-item :label="$t('table.age')" prop="age">
        <el-input v-model.number="formInline.age" autocomplete="off" step="1" />
      </el-form-item>
      <el-form-item :label="$t('table.sex')" prop="sex">
        <el-select
          v-model="formInline.sex"
          :placeholder="$t('table.tips.select_sex')"
          class="w-100%"
        >
          <el-option :label="$t('table.man')" :value="1" />
          <el-option :label="$t('table.woman')" :value="0" />
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="resetDialog" :disabled="loading">
          {{ $t('table.cancel') }}
        </el-button>
        <el-button type="primary" @click="handleConfirm" :loading="loading">
          {{ $t('table.ok') }}
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import type { DialogType } from '@/hooks/useDialog';
import type { FormRules } from 'element-plus';

defineOptions({
  name: 'tableEditDialog',
  inheritAttrs: false,
});

export interface EmitType {
  (e: 'callback', type: DialogType): void;
}

const emit = defineEmits<EmitType>();

const queryForm: {
  name: string;
  age: number | null;
  sex: number;
} = {
  name: '',
  age: null,
  sex: 1,
};
const { t } = useI18n();
const ruleConfig = computed<FormRules>(() => ({
  name: [
    {
      required: true,
      message: t('table.tips.enter_username'),
      trigger: 'blur',
    },
  ],
  sex: [
    {
      required: true,
      message: t('table.tips.select_sex'),
      trigger: 'change',
    },
  ],
  age: [
    {
      required: true,
      message: t('table.tips.enter_age'),
      trigger: 'blur',
    },
    {
      type: 'number',
      message: t('table.tips.age_must_be_a_number'),
      trigger: 'change',
    },
  ],
}));

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
  url: TableEnum.LIST,
  queryForm,
  validateRules: ruleConfig,
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
