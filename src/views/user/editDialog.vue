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
      <el-form-item label="用户名" prop="username">
        <el-input
          v-model="formInline.username"
          placeholder="请输入用户名"
        ></el-input>
      </el-form-item>
      <el-form-item label="性别" prop="sex">
        <el-select
          style="width: 100%"
          v-model="formInline.sex"
          placeholder="请选择性别"
        >
          <el-option :value="0" label="女" />
          <el-option :value="1" label="男" />
        </el-select>
      </el-form-item>
      <el-form-item label="角色" prop="role">
        <el-select
          style="width: 100%"
          v-model="formInline.role"
          placeholder="请选择类型"
        >
          <el-option
            v-for="role in roleList"
            :key="role.type"
            :value="role.type"
            :label="role.name"
          ></el-option>
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
import type { RoleItem, RoleType } from '@/service/types';

defineOptions({
  name: 'roleEditDialog',
  inheritAttrs: false,
});

interface EmitType {
  (e: 'callback', type: DialogCallbackType): void;
}
defineProps<{
  roleList: RoleItem[];
}>();
const emit = defineEmits<EmitType>();

const { getCache, removeCache, setCache } = useLocalCache();
const confirm = useConfirm();

const queryForm: {
  username: string;
  role: RoleType;
  sex: 0 | 1;
  id?: number;
} = {
  username: '',
  role: 'normal',
  sex: 1,
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
  url: UserEnum.USER,
  queryForm,
  validateRules: {
    username: [
      {
        required: true,
        message: '请输入名称',
        trigger: 'blur',
      },
    ],
    sex: [
      {
        required: true,
        message: '请选择性别',
        trigger: 'change',
      },
    ],
    role: [
      {
        required: true,
        message: '请选择角色',
        trigger: 'change',
      },
    ],
  },
  callback: (_type: DialogCallbackType) => {
    if (_type === 'edit') {
      const userInfo = getCache('userInfo');
      if (userInfo.id === formInline.id) {
        if (userInfo.role !== formInline.role) {
          // 当前用户角色修改，需要重新登录
          removeCache('token');
          removeCache('userInfo');
          confirm({
            options: { showCancelButton: false },
            content: '当前用户角色发生变化，请重新登录!',
          }).then(() => {
            window.location.reload();
          });
          return;
        }
        // 更新用户信息
        if (userInfo.username !== formInline.username) {
          const { userInfo: storeUserInfo } = storeToRefs(useUserStore());
          setCache('userInfo', {
            ...userInfo,
            ...formInline,
          });
          storeUserInfo.value.username = formInline.username;
        }
      }
    }
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
