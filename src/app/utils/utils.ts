export class Utils {
  public static toBase64 = (file: File): Promise<string | ArrayBuffer> =>
    new Promise((resolve, reject) => {
      const fr = new FileReader();
      fr.readAsDataURL(file);
      fr.onload = () => resolve(fr.result);
      fr.onerror = (error) => reject(error);
    });
}
