export const blobUrlToFile = (blobUrl: any,fileName: any) => new Promise((resolve) => {
  fetch(blobUrl).then((res) => {
    res.blob().then((blob) => {
      // please change the file.extension with something more meaningful
      // or create a utility function to parse from URL
      const file = new File([blob], fileName, {type: blob.type})
      resolve(file)
    })
  })
})
export const getBase64 = (file: any) => {
  return new Promise((resolve,reject) => {
     const reader = new FileReader();
     reader.onload = () => resolve(reader.result);
     reader.onerror = error => reject(error);
     reader.readAsDataURL(file);
  });
}
export function createObjectURL(object: any) {
  return (window.URL) ? window.URL.createObjectURL(object) : window.webkitURL.createObjectURL(object);
}

