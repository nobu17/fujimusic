import imageCompression from "browser-image-compression";
export default {
  // キャッシュ無効化用にランダム値を付与したURLを取得
  getUrl(isForceCacheOff, url) {
    if (isForceCacheOff) {
      return url + "&rand=" + this.getRandomInt();
    }
    return url;
  },
  getRandomInt() {
    return Math.floor(Math.random() * Math.floor(9999));
  },
  // 画像の圧縮
  async compressImageAsync(file) {
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 800,
      useWebWorker: true
    };
    try {
      const compressedFile = await imageCompression(file, options);
      return compressedFile;
    } catch (error) {
      // console.error(error)
      throw error;
    }
  },
  // 画像を圧縮した上でDataUrl形式で返却
  async getCompressImageDataUrl(file) {
    const img = await this.compressImageAsync(file);
    return imageCompression.getDataUrlFromFile(img);
  }
};
