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
  }
};
