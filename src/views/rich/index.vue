<template>
  <div class="rich-container b-solid b-1px b-#ccc">
    <Toolbar
      class="b-b-solid b-b-1px b-b-#ccc"
      :editor="editorRef"
      :defaultConfig="toolbarConfig"
      :mode="mode"
    />
    <Editor
      class="min-h-250px overflow-y-hidden"
      v-model="valueHtml"
      :defaultConfig="editorConfig"
      :mode="mode"
      @onCreated="handleCreated"
      @onChange="handleChange"
    />
  </div>
</template>

<script setup lang="ts">
import '@wangeditor/editor/dist/css/style.css';
import { Editor, Toolbar } from '@wangeditor/editor-for-vue';

defineOptions({
  name: 'rich',
  inheritAttrs: false,
});

const mode = ref<'default' | 'simple'>('default');

// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef();

// 内容 HTML
const valueHtml = ref('<p>hello</p>');

// 模拟 ajax 异步获取内容
onMounted(() => {
  setTimeout(() => {
    valueHtml.value = '<p>模拟 Ajax 异步设置内容</p>';
  }, 1500);
});

// 工具词条配置
const toolbarConfig = {};
// 编辑器配置
const editorConfig = { placeholder: '请输入内容...' };

const handleCreated = (editor: any) => {
  editorRef.value = editor;
};

const handleChange = (editor: any) => {
  console.log('change', editor);
  // console.log(editor.getHtml());
};

onBeforeUnmount(() => {
  const editor = editorRef.value;
  if (editor == null) return;
  editor.destroy();
});
</script>

<style lang="scss" scoped></style>
