// 获取富文本内容
export function richGetResult() {
  return ApiRequest.get({ url: RichEnum.GET_RESULT });
}

// 上传图片
export function richUploadImg(file: File) {
  const formData = new FormData();
  formData.append('file', file);
  return ApiRequest.post(
    {
      url: RichEnum.UPRODE_IMG,
      data: formData,
    },
    {
      beforeFetch({ options }) {
        options.headers = {
          ...options.headers,
          'Content-Type': 'multipart/form-data',
        };
        return { options };
      },
    }
  );
}

// 保存富文本内容
export function richSave(data: string) {
  return ApiRequest.post({
    url: RichEnum.SAVE,
    data: {
      data,
    },
  });
}
