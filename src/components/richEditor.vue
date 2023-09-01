<template>
  <div class="rich-edit-container">
    <Toolbar :editor="editorRef" :defaultConfig="toolbarConfig" :mode="mode" />
    <Editor
      class="overflow-y-hidden"
      v-model="modelValue"
      :defaultConfig="editorConfig"
      :mode="mode"
      @onCreated="handleCreated"
      @onChange="handleChange"
    />
    <br />
  </div>
</template>

<script setup lang="ts">
import '@wangeditor/editor/dist/css/style.css';
import { Editor, Toolbar } from '@wangeditor/editor-for-vue';

import type { IToolbarConfig, IEditorConfig } from '@wangeditor/editor';

export type Mode = 'default' | 'simple';

defineOptions({
  name: 'richEditor',
});

const props = withDefaults(
  defineProps<{
    modelValue: string;
    mode?: Mode;
    toolbarConfig?: Partial<IToolbarConfig>; // 工具词条配置
    editorConfig?: Partial<IEditorConfig>; // 编辑器配置
  }>(),
  {
    modelValue: '',
    mode: 'default',
    toolbarConfig: () => ({}),
    editorConfig: () => ({
      placeholder: '请输入内容...',
    }),
  }
);

const emit = defineEmits(['update:modelValue', 'editChange']);
const modelValue = useVModel(props, 'modelValue', emit);
const editorRef = shallowRef(); // 编辑器实例，必须用 shallowRef

const handleCreated = (editor: any) => {
  editorRef.value = editor; // 记录 editor 实例，重要！
};
const handleChange = (editor: any) => {
  modelValue.value = editor.getHtml();
  emit('editChange', editor);
};

onBeforeUnmount(() => {
  const editor = editorRef.value;
  if (editor == null) return;
  editor.destroy();
});

defineExpose({
  editorRef,
});
</script>

<style lang="scss" scoped></style>
