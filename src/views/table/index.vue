<template>
  <div class="table-container">
    <div class="flex mb-14px">
      <el-upload
        :disabled="state.fileList.length !== 0"
        accept=".xls,.xlsx"
        :show-file-list="false"
        action=""
        :http-request="handleUploadFile"
      >
        <el-button type="primary">
          <i-ep-upload-filled class="icon text-14px" />
          上传Excel文件
        </el-button>
      </el-upload>
      <el-button @click="handleExport" class="ml-14px" type="primary">
        <i-ep:download class="icon text-14px" />
        下载Excel文件
      </el-button>
    </div>
    <el-table
      :data="state.excelData"
      stripe
      :loading="loading"
      style="width: 100%"
      size="small"
      :height="500"
    >
      <el-table-column
        v-for="item in state.excelHead"
        :key="item"
        :prop="item"
        :label="item"
      >
        <template #default="scope">
          <span class="overflow-ellipsis">{{ scope.row[item as any] }}</span>
        </template>
      </el-table-column>
      <!-- 新增、编辑、删除功能最好是确定表单的字段(英文)，当然不确定也可以。无非就是更新下excelData的数据，在这里就不做了~ -->
      <!-- <el-table-column label="操作" width="150" fixed="right">
        <template #default="scope">
          <el-button type="primary" link @click="handleEdit(scope.row)">
            编辑
          </el-button>
          <el-button type="danger" link @click="handelDelete(scope.row)">
            删除
          </el-button>
        </template>
      </el-table-column> -->
    </el-table>
  </div>
</template>

<script setup lang="ts">
import { read, utils, writeFile } from 'xlsx';

import type { WorkBook } from 'xlsx';
import type { UploadRequestOptions } from 'element-plus';
defineOptions({
  name: 'tablePage',
  inheritAttrs: false,
});

const { warning } = useMessage();
const loading = ref(false);
const state = reactive<{
  fileList: any[];
  fileName: string;
  excelHead: string[];
  excelData: unknown[];
}>({
  fileList: [],
  fileName: '', // 文件名
  excelHead: [], // 表头
  excelData: [], // 表格数据
});

// 文件上传
const handleUploadFile: (data: UploadRequestOptions) => any = (data) => {
  const { file } = data;
  const { name } = file;
  state.fileName = name;
  // 获取文件类型
  const ext = name.substring(name.lastIndexOf('.') + 1);
  const accept = ['xlsx', 'xls'];
  if (!accept.includes(ext)) {
    warning('请选择xls或者xlsx文件');
    return;
  }
  loading.value = true;
  readFile(file);
};

// 解析excel表格数据（这里主要解析单表）
const readFile = (file: File, callback?: (data: WorkBook) => void) => {
  const reader = new FileReader();
  reader.onload = (e) => {
    const data = e.target?.result;
    const workbook = read(data, { type: 'binary' });
    const { Sheets, Workbook } = workbook;
    const sheetList = Workbook!.Sheets;
    const currentSheetName = sheetList![0].name || '';
    // 表头：二维数组格式-[[value,...], ...]
    state.excelHead =
      (utils.sheet_to_json(Sheets[currentSheetName], {
        header: 1,
      })[0] as []) || [];
    // 表格数据：数组对象格式-[{key, value}, ...]
    state.excelData = utils.sheet_to_json(Sheets[currentSheetName], {
      raw: false,
    });
    console.log(state.excelData, state.excelHead);
    if (callback) callback(workbook);
  };
  reader.readAsBinaryString(file);
  loading.value = false;
};

const handleExport = () => {
  downLoadElsx(state.excelData, 'Sheet1', state.fileName);
};

// 下载文件
const downLoadElsx = (
  data: any[],
  sheetName = 'Sheet1',
  fileName = 'example.xlsx'
) => {
  if (data.length === 0) {
    warning('表格数据为空');
    return;
  }
  const jsonWorkSheet = utils.json_to_sheet(data);
  const workBook: WorkBook = {
    SheetNames: [sheetName],
    Sheets: {
      [sheetName]: jsonWorkSheet,
    },
  };
  writeFile(workBook, fileName);
};

/* // 编辑
const handleEdit = (row: any) => {};
// 删除
const handelDelete = (row: any) => {}; */
</script>

<style lang="scss" scoped></style>
