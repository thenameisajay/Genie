/**
 *
 * @param image The image to convert to base64
 * @returns  The base64 string of the image.
 */
export async function imageToBase64(image: File) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}
