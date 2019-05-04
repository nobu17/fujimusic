<template>
  <div>
    <v-container class="mt-0 mb-0">
      <v-layout text-xs-center wrap child-flex>
        <v-flex xs12>
          <h3 class="title-head text-md-center text-xs-center mt-3 mb-4">
            <v-icon class="mr-3" color="red" size="45">attach_money</v-icon>アルバム情報編集
          </h3>
        </v-flex>
        <div v-if="displayAlbumInfo">
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-flex xs12>
              <v-text-field
                ref="titleText"
                v-model="displayAlbumInfo.title"
                :rules="titleRules"
                label="タイトル"
                placeholder="タイトルを入力してください。"
                v-on:keyup.enter="submit"
              ></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-menu
                v-model="menu"
                :close-on-content-click="false"
                :nudge-right="40"
                lazy
                transition="scale-transition"
                offset-y
                full-width
                min-width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-model="displayAlbumInfo.eventDateStr"
                    label="イベント日"
                    :rules="eventDateRules"
                    prepend-icon="event"
                    readonly
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="displayAlbumInfo.eventDateStr"
                  @input="menu = false"
                  locale="ja-JP"
                ></v-date-picker>
              </v-menu>
            </v-flex>
            <v-flex xs12>
              <v-textarea
                outline
                v-model="displayAlbumInfo.description"
                :rules="descriptionRules"
                label="説明"
                placeholder="説明を入力してください。"
                rows="4"
                auto-grow
              ></v-textarea>
            </v-flex>
          </v-form>
          <v-flex xs12>
            <h3>サムネイル(トップページ)画像</h3>
          </v-flex>
          <v-flex xs12>
            <AlbumImageUploader
              @disabledChanged="disabledChanged"
              v-model="displayAlbumInfo.thumbnail"
            />
          </v-flex>
          <v-flex xs12>
            <h3>アルバム画像</h3>
          </v-flex>
          <v-flex xs12 v-for="(img, index) in displayAlbumInfo.imageList" :key="index">
            <AlbumImageUploader
              @disabledChanged="disabledChanged"
              v-model="displayAlbumInfo.imageList[index]"
            />
          </v-flex>
          <v-flex xs12>
            <v-btn :disabled="!isCommitable" @click="submit" color="info">確定</v-btn>
            <v-btn @click="cancel" color="info">キャンセル</v-btn>
          </v-flex>
        </div>
      </v-layout>
    </v-container>
    <MessageDialog ref="messageDialog"/>
    <LoadingScreen :isLoading="isLoading"/>
  </div>
</template>

<script>
import LoadingScreen from "../../../components/common/loadingScreen";
import AlbumImageUploader from "../../../components/albumedit/albumImageUploader";
import MessageDialog from "../../../components/common/messageDialog";
export default {
  components: {
    LoadingScreen,
    AlbumImageUploader,
    MessageDialog
  },
  created() {
    // URLからアルバムIDを取得
    if (
      this.$route.params.albumId &&
      this.$route.params.albumId !== "newMake"
    ) {
      this.albumId = this.$route.params.albumId;
      // albumIdがない場合は新規
      if (this.albumId) {
        //console.log("para", this.$route.params);
        const req = {
          albumId: this.albumId,
          isForceCacheOff: true,
          success: () => {
            this.isLoading = false;
            this.$nextTick(() => {
              this.$refs.titleText.focus();
            });
          },
          error: async err => {
            this.isLoading = false;
            await this.$refs.messageDialog.open(
              "エラー",
              "更新に失敗しました。" ,
              "ok"
            );
          }
        };
        this.$store.dispatch("album/readDisplayAlbumInfo", req);
      }
    } else if (this.$route.params.albumId === "newMake") {
      this.$store.dispatch("album/readNewAlbumInfo");
      this.$nextTick(() => {
        this.$refs.titleText.focus();
      });
    }
  },
  computed: {
    // アルバム
    displayAlbumInfo() {
      return this.$store.getters["album/displayAlbumInfo"];
    },
    isCommitable() {
      if (this.valid && !this.isModifingImage) {
        return true;
      }
      return false;
    }
  },
  methods: {
    //画像を加工中の場合に確定を押下できなくするために保持
    disabledChanged(disabled) {
      this.isModifingImage = disabled;
    },
    submit() {
      if (this.$refs.form.validate() && !this.isModifingImage) {
        const req = {
          success: () => {
            this.isLoading = false;
            this.$router.push("/admin/albumedit/edittop");
          },
          error: async err => {
            this.isLoading = false;
            let msg = "";
            if (typeof err === "string") {
              msg = err;
            } else {
              msg = "ロードに失敗しました。画面をリロードしてください";
            }
            await this.$refs.messageDialog.open("エラー", msg, "ok");
            window.scrollTo(0, 0);
          }
        };
        this.isLoading = true;
        this.$store.dispatch("album/commitDisplayAlbumInfo", req);
      } else {
        window.scrollTo(0, 0);
      }
    },
    cancel() {
      //管理トップへ
      if (confirm("変更をキャンセルして一覧へ戻りますか？")) {
        this.$router.push("/admin/albumedit/edittop");
      }
    }
  },
  data() {
    return {
      titleRules: [
        v => {
          if (!v || v.trim() == "") {
            return "タイトルを入力して下さい。";
          }
          return true;
        }
      ],
      eventDateRules: [
        v => {
          if (!v || v.trim() == "") {
            return "イベント日時を入力して下さい。";
          }
          return true;
        }
      ],
      descriptionRules: [
        v => {
          if (!v || v.trim() == "") {
            return "説明を入力して下さい。";
          }
          return true;
        }
      ],
      menu: false,
      valid: false,
      isLoading: false,
      isModifingImage: false,
      albumId: ""
    };
  }
};
</script>

<style>
</style>
