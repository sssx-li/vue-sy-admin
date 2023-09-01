export function imgToBase64(file: File) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = function () {
      resolve(reader.result);
    };
    reader.readAsDataURL(file);
  });
}
