<template>
  <div class="login-container flex justify-center items-center flex-col">
    <div class="form-content w450px p30px relative">
      <select-lang class="absolute! top-10px right-10px" />
      <div class="title text-center text-30px mb30px">{{ $t('title') }}</div>
      <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" size="large">
        <el-form-item prop="username">
          <el-input
            v-model="ruleForm.username"
            :placeholder="$t('errorTip.please_enter_username')"
          />
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="ruleForm.password"
            type="password"
            show-password
            :placeholder="$t('errorTip.please_enter_password')"
            @keydown="handleKeyDown"
          />
        </el-form-item>
        <el-form-item class="mt-40px">
          <el-button
            :loading="loading"
            @click="handleLogin"
            type="primary"
            class="w100%"
          >
            {{ $t('nav.login') }}
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { FormInstance, FormRules } from 'element-plus';
import type { UserLoginRes } from '@/service/types';

const router = useRouter();
const { setCache } = useLocalCache();
const { t } = useI18n();

const loading = ref(false);
const ruleForm = reactive({
  username: 'admin',
  password: 'admin1234',
});
const ruleFormRef = ref<FormInstance>();
const computedRule = computed(() => ({
  username: [
    {
      required: true,
      message: t('errorTip.please_enter_username'),
      trigger: 'blur',
    },
    {
      min: 2,
      max: 12,
      message: t('errorTip.username_length', { min: 2, max: 12 }),
      trigger: 'blur',
    },
  ],
  password: [
    {
      required: true,
      message: t('errorTip.please_enter_password'),
      trigger: 'blur',
    },
    {
      min: 4,
      max: 12,
      message: t('errorTip.password_length', { min: 4, max: 12 }),
      trigger: 'blur',
    },
  ],
}));
const rules = ref<FormRules>(computedRule as any);

const handleLogin = () => {
  if (!ruleFormRef.value) return;
  ruleFormRef.value.validate(async (valid, fields) => {
    if (valid) {
      loading.value = true;
      const { code, data } = await useHandleApiRes<UserLoginRes>(
        userLogin({ ...ruleForm })
      );
      if (code === ResponseStatusCodeEnum.success) {
        setCache('token', data.token);
        await router.push('/');
      }
      loading.value = false;
    } else {
      console.log('error submit!', fields);
    }
  });
};
const handleKeyDown = (ev: KeyboardEvent | Event) => {
  if ((ev as KeyboardEvent).key === 'Enter') {
    handleLogin();
  }
};
</script>

<style lang="scss" scoped>
.login-container {
  @include wh(100%, 100vh);

  .form-content {
    border: 1px solid #ccc;
    border-radius: 8px;
  }
}
</style>

<style lang="scss">
/* 解决Chrome浏览器输入框自动填充背景色 */
input {
  display: inline-block;
  padding: 12px 5px 12px 15px;
  font-size: 16px;
  color: #11142d;
  caret-color: #11142d;
  background: transparent;
  border: 0;
  border-radius: 0;

  &:-webkit-autofill {
    box-shadow: 0 0 0 1000px #fff inset !important;
    -webkit-text-fill-color: #11142d !important;
  }
}
</style>
