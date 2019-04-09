<template>
  <div>
    <v-container class="mt-0 mb-0">
      <v-layout text-xs-center wrap child-flex>
        <v-flex xs12>
          <h3 class="title-head text-md-center text-xs-center mt-0 mb-1">
            <v-icon class="mr-3" color="red" size="45">attach_money</v-icon>トップページ画像変更
          </h3>
        </v-flex>
        <v-flex xs12 v-for="(img, index) in imageList" :key="index">
          <TopImageUploader @disabledChanged="disabledChanged" v-model="imageList[index]"/>
        </v-flex>
        <v-flex xs12>
          <v-btn :disabled="!valid" @click="submit" color="info">確定</v-btn>
          <v-btn @click="cancel" color="info">キャンセル</v-btn>
        </v-flex>
      </v-layout>
    </v-container>
    <MessageDialog ref="messageDialog"/>
    <LoadingScreen :isLoading="isLoading"/>
  </div>
</template>

<script>
import LoadingScreen from "../../components/common/loadingScreen";
import MessageDialog from "../../components/common/messageDialog";
import TopImageUploader from "../../components/toppageedit/topImageUploader";
export default {
  components: {
    LoadingScreen,
    MessageDialog,
    TopImageUploader
  },
  created() {
    // トップ画像のロード
    this.isLoading = true;
    const req = {
      
      success: () => {
        this.isLoading = false;
      },
      error: async err => {
        this.isLoading = false;
        //console.error(err);
        await this.$refs.messageDialog.open("エラー", err.message, "ok");
        this.$router.push("/admin");
      }
    };
    this.$store.dispatch("toppage/loadTopImageList", req);
  },
  computed: {
    // 画像一覧
    imageList() {
      return this.$store.getters["toppage/imageList"];
    }
  },
  methods: {
    //画像を加工中の場合に確定を押下できなくするために保持
    disabledChanged(disabled) {
      this.isModifingImage = disabled;
    },
    // 確定処理
    async submit() {
      if (this.imageList.length === 0) {
        await this.$refs.messageDialog.open(
          "エラー",
          "1枚以上の画像をアップロードしてください。",
          "ok"
        );
        return;
      }
      this.isLoading = true;
      const req = {
        imageList: this.imageList,
        success: async result => {
          this.isLoading = false;
          if (result.failFileList && result.failFileList.length > 0) {
            this.$refs.messageDialog.open(
              "エラー",
              "以下のファイルのアップロードに失敗しました。。" +
                result.failFileList.join(""),
              "ok"
            );
          } else {
            await this.$refs.messageDialog.open(
              "情報",
              "処理が完了しました。",
              "ok"
            );
            //クリアしてトップへ
            this.$store.commit("toppage/setImageList", { imageList: [] });
            this.$router.push("/admin");
          }
        },
        error: err => {
          this.isLoading = false;
          //console.error(err);
          this.$refs.messageDialog.open(
            "エラー",
            "画像更新に失敗しました。" + err.message,
            "ok"
          );
        }
      };
      this.$store.dispatch("toppage/postTopImageList", req);
    },
    cancel() {
      //管理トップへ
      if (confirm("変更をキャンセルして管理画面へ戻りますか？")) {
        //クリアしてトップへ
        this.$store.commit("toppage/setImageList", { imageList: [] });
        this.$router.push("/admin");
      }
    }
  },
  data() {
    return {
      valid: true,
      isLoading: false,
      isModifingImage: false
    };
  }
};
</script>

<style>
</style>
