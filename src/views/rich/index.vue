<template>
  <div class="rich-container h-100%">
    <RichEditor
      mode="default"
      v-model="valueHtml"
      :toolbar-config="toolbarConfig"
      :editor-config="editorConfig"
      class="h-300px min-w-710px"
    />
    <div class="mt-100px">
      <el-button type="primary" @click="handleConfirm">保存</el-button>
      <el-button @click="handleClear">清空</el-button>
    </div>
    <RichEditor
      mode="default"
      v-model="resHtml"
      :toolbar-config="{}"
      :editor-config="{ readOnly: true }"
      class="h-300px min-w-710px mt-14px"
    />
  </div>
</template>

<script setup lang="ts">
import type { IToolbarConfig, IEditorConfig } from '@wangeditor/editor';
import type { RichUploadImgRes } from '@/service/types';

defineOptions({
  name: 'rich',
  inheritAttrs: false,
});

const { success } = useMessage();

// 内容 HTML
const valueHtml = ref('');
const resHtml = ref('');

// 工具词条配置
const toolbarConfig: Partial<IToolbarConfig> = {};
// 编辑器配置
const editorConfig: Partial<IEditorConfig> = {
  placeholder: '请输入内容...',
  MENU_CONF: {
    uploadImage: {
      // server: RichEnum.UPRODE_IMG,
      // 自定义上传图片
      async customUpload(file: File, insertFn: any) {
        const {
          data: { url },
        } = await useHandleApiRes<RichUploadImgRes>(richUploadImg(file));
        insertFn(url);
      },
      // 小于该值就插入 base64 格式（而不上传），默认为 0
      // base64LimitSize: 5 * 1024, // 5kb
    },
  },
};

async function getRichContent() {
  const { data } = await useHandleApiRes(richGetResult());
  resHtml.value = data;
}

async function handleConfirm() {
  const { code, message } = await useHandleApiRes(richSave(valueHtml.value));
  if (code === ResponseStatusCodeEnum.success) {
    success(message);
    getRichContent();
  }
}
function handleClear() {
  valueHtml.value = '';
}

onBeforeMount(() => {
  getRichContent();
});
</script>

<style lang="scss" scoped></style>
