<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" persistent max-width="800" class="diag">
      <v-card>
        <v-container>
          <v-layout text-xs-center wrap child-flex>
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-flex xs12>
                <v-text-field
                  ref="titleText"
                  v-model="editModel.title"
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
                      v-model="editModel.postDate"
                      label="投稿日時"
                      :rules="postDateRules"
                      prepend-icon="event"
                      readonly
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model="editModel.postDate" @input="menu = false" locale="ja-JP"></v-date-picker>
                </v-menu>
              </v-flex>
              <v-flex xs12>
                <v-textarea
                  v-model="editModel.content"
                  :rules="contentRules"
                  label="内容"
                  placeholder="記事内容を入力してください。"
                  rows="8"
                  auto-grow
                ></v-textarea>
              </v-flex>
              <v-flex xs12>
                <v-btn :disabled="!valid" @click="submit" color="info">確定</v-btn>
                <v-btn @click="cancel" color="info">キャンセル</v-btn>
              </v-flex>
            </v-form>
          </v-layout>
        </v-container>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
export default {
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
      postDateRules: [
        v => {
          if (!v || v.trim() == "") {
            return "日付を入力して下さい。";
          }
          return true;
        }
      ],
      contentRules: [
        v => {
          if (!v || v.trim() == "") {
            return "内容を入力して下さい。";
          }
          return true;
        }
      ],
      editModel: {
        title: "",
        postDate: "2019-01-01",
        content: ""
      },
      menu: false,
      valid: false,
      dialog: false,
      resolve: null,
      reject: null
    };
  },
  methods: {
    open(title, postDate, content) {
      this.editModel.title = title;
      this.editModel.postDate = postDate;
      this.editModel.content = content;
      this.dialog = true;

      // バリデーションクリア
      this.$refs.form.resetValidation();

      // フォーカス
      this.$nextTick(() => {
        this.$refs.titleText.focus();
      });

      return new Promise((resolve, reject) => {
        this.resolve = resolve;
        this.reject = reject;
      });
    },
    submit() {
      if (this.$refs.form.validate()) {
        this.resolve(this.editModel);
        this.dialog = false;
      }
    },
    cancel() {
      this.resolve(null);
      this.dialog = false;
    }
  }
};
</script>

<style scoped>
.diag {
  background-color: aqua;
}
</style>
