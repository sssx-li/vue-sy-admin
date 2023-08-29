<template>
  <el-button type="primary" @click="confirmPaint">保存签名</el-button>
  <el-button @click="clearPaint">清空签名</el-button>
  <el-button @click="saveToImg">保存为图片</el-button>
  <br />
  <canvas
    ref="autographRef"
    width="400"
    height="400"
    tabindex="0"
    @mousedown="onMouseDown"
    class="b-solid b-1px b-#ccc mt-10px outline-none mr-40px"
  ></canvas>
  <img :src="imgUrl" width="400" height="400" class="b-solid b-1px b-#ccc" />
</template>

<script setup lang="ts">
defineOptions({
  name: 'autograph',
  inheritAttrs: false,
});

const { warning } = useMessage();
const autographRef = ref<HTMLCanvasElement>();
const imgUrl = ref('');

// 鼠标按下
const onMouseDown = (e: MouseEvent) => {
  const canvas = e.target as HTMLCanvasElement;
  const ctx: any = canvas.getContext('2d');
  ctx!.beginPath();
  const { offsetX, offsetY } = e;
  ctx!.moveTo(offsetX, offsetY);
  ctx!.lineTo(offsetX, offsetY);
  ctx!.stroke();

  canvas.onmousemove = (e) => onMouseMove(e, ctx!);
  canvas.onmouseup = () => onMouseUp(canvas);
  canvas.focus();
};
// 鼠标移动
function onMouseMove(
  { offsetX, offsetY }: MouseEvent,
  ctx: CanvasRenderingContext2D
) {
  ctx.lineTo(offsetX, offsetY);
  ctx.stroke();
}
// 鼠标抬起
function onMouseUp(canvas: HTMLCanvasElement) {
  canvas.onmousemove = null;
  canvas.onmouseup = null;
}

// 判断canvas是否为空
function canvasIsNull(canvas: HTMLCanvasElement) {
  const blank = document.createElement('canvas');
  blank.width = canvas.width;
  blank.height = canvas.height;
  return blank.toDataURL() === canvas.toDataURL();
}
// 确认绘制
function confirmPaint() {
  const canvas = autographRef.value!;
  if (canvasIsNull(canvas)) {
    warning('签名为空，请先绘制');
    return;
  }
  imgUrl.value = canvas.toDataURL();
}
// 清空绘制
function clearPaint() {
  const canvas = autographRef.value!;
  const ctx = canvas.getContext('2d');
  ctx!.clearRect(0, 0, canvas.width, canvas.height);
  imgUrl.value = '';
}
// 保存为图片
function saveToImg() {
  const canvas = autographRef.value!;
  if (canvasIsNull(canvas)) {
    warning('签名为空，请先绘制');
    return;
  }
  const img = canvas.toDataURL();
  const a = document.createElement('a');
  a.href = img;
  a.download = '签名';
  a.click();
}
</script>

<style lang="scss" scoped></style>
