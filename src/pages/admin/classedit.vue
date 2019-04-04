<template>
  <div>
    <v-container class="mt-0 mb-0">
      <v-layout text-xs-center wrap child-flex>
        <v-flex xs12>
          <h3 class="title-head text-md-center text-xs-center mt-3 mb-4">
            <v-icon class="mr-3" color="red" size="45">attach_money</v-icon>教室情報の編集
          </h3>
        </v-flex>
        <v-form v-if="classInfo" ref="form" v-model="valid" lazy-validation>
          <v-flex xs12>
            <v-textarea
              outline
              ref="titleText"
              v-model="classInfo.description"
              :rules="descriptionRules"
              label="説明"
              placeholder="説明を入力してください。"
              v-on:keyup.enter="submit"
            ></v-textarea>
          </v-flex>
          <v-flex xs12>
            <v-textarea
              outline
              v-model="classInfo.lessonTimes"
              :rules="lessonTimesRules"
              label="レッスン時間"
              placeholder="レッスン時間を入力してください。"
              rows="5"
              auto-grow
            ></v-textarea>
          </v-flex>
          <v-flex xs12>
            <v-textarea
              outline
              v-model="classInfo.lessonPlace"
              :rules="lessonPlaceRules"
              label="住所"
              placeholder="レッスン住所を入力してください。"
              rows="4"
              auto-grow
            ></v-textarea>
          </v-flex>
          <div v-for="(img, index) in classInfo.imageList" :key="index">
            <v-flex xs12>
              <ClassImageUploader
                @disabledChanged="disabledChanged"
                v-model="classInfo.imageList[index]"
              />
            </v-flex>
          </div>
          <v-flex xs12>
            <v-btn :disabled="!valid" @click="submit" color="info">確定</v-btn>
            <v-btn @click="cancel" color="info">キャンセル</v-btn>
          </v-flex>
        </v-form>
      </v-layout>
    </v-container>
    <MessageDialog ref="messageDialog"/>
    <LoadingScreen :isLoading="isLoading"/>
  </div>
</template>

<script>
import LoadingScreen from "../../components/common/loadingScreen";
import MessageDialog from "../../components/common/messageDialog";
import ClassImageUploader from "../../components/classedit/classImageUploader";
export default {
  components: {
    LoadingScreen,
    MessageDialog,
    ClassImageUploader
  },
  created() {
    // URLから教室IDを取得
    this.classId = this.$route.params.classId;
    if (this.classId) {
      this.isLoading = true;
      const req = {
        classId: this.classId,
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
      this.$store.dispatch("classroom/readClass", req);
    } else {
      //不正な場合は管理トップへ
      this.$router.push("./admin");
    }
  },
  computed: {
    // クラス情報
    classInfo() {
      return this.$store.getters["classroom/currentClassInfo"];
    }
  },
  data() {
    return {
      descriptionRules: [
        v => {
          if (!v || v.trim() == "") {
            return "説明を入力して下さい。";
          }
          return true;
        }
      ],
      lessonTimesRules: [
        v => {
          if (!v || v.trim() == "") {
            return "レッスン時間を入力して下さい。";
          }
          return true;
        }
      ],
      lessonPlaceRules: [
        v => {
          if (!v || v.trim() == "") {
            return "レッスン住所を入力して下さい。";
          }
          return true;
        }
      ],
      isModifingImage: false,
      valid: false,
      isLoading: false,
      classId: ""
    };
  },
  methods: {
    //画像を加工中の場合に確定を押下できなくするために保持
    disabledChanged(disabled) {
      this.isModifingImage = disabled;
    },
    submit() {
      if (this.$refs.form.validate() && !this.isModifingImage) {
        this.isLoading = true;
        const req = {
          classInfo: {
            classId: this.classId,
            description: this.classInfo.description,
            lessonTimes: this.classInfo.lessonTimes,
            lessonPlace: this.classInfo.lessonPlace
          },
          success: async () => {
            //成功したら画像を上げる
            await this.postImage();
          },
          error: err => {
            this.isLoading = false;
            //console.error(err);
            this.$refs.messageDialog.open(
              "エラー",
              "更新に失敗しました。" + err.message,
              "ok"
            );
          }
        };
        this.$store.dispatch("classroom/postClass", req);
      }
    },
    postImage() {
      const req = {
        classId: this.classId,
        imagesFiles: this.classInfo.imageList,
        success: async (result) => {
          this.isLoading = false;
          if (result.failFileList && result.failFileList.length > 0) {
            this.$refs.messageDialog.open(
              "エラー",
              "以下のファイルのアップロードに失敗しました。。" +
                result.failFileList.join(""),
              "ok"
            );
          } else {
              await this.$refs.messageDialog.open("情報", "処理が完了しました。", "ok");
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
      this.$store.dispatch("classroom/postImages", req);
    },
    cancel() {
      //管理トップへ
      if (confirm("変更をキャンセルして管理画面へ戻りますか？")) {
        this.$router.push("/admin");
      }
    }
  }
};
</script>

<style>
</style>
