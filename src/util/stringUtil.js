export default {
  // firestoreは改行がうまく保存されないのでbbを改行として扱う
  decodeStringForFileStore(str) {
    if (str) {
      return str.replace("bb", "\n");
    }
    return str;
  },
  encodeStringForFileStore(str) {
    if (str) {
      return str.replace("\n", "bb");
    }
    return str;
  }
};
