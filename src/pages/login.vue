<template>
  <div>
    <v-container :class="{'ma-0 pa-0': $vuetify.breakpoint.smAndDown}" grid-list-md text-xs-center>
      <v-layout wrap>
        <v-flex xs12>
          <h3 class="title-head text-md-center text-xs-center mt-3 mb-4">
            <v-icon class="mr-3" color="red" size="45">vpn_key</v-icon>ログイン
          </h3>
        </v-flex>
        <v-flex xs12>
          <v-form class="ml-4 mr-4" ref="form" v-model="valid" lazy-validation @submit="submit">
            <v-text-field
              ref="idTextbox"
              v-model="userModel.id"
              :rules="idRules"
              :counter="10"
              label="Id"
              required
            ></v-text-field>
            <v-text-field
              :type="'password'"
              v-model="userModel.password"
              :rules="passRules"
              :counter="10"
              label="Password"
              v-on:keyup.enter="submit"
              required
            ></v-text-field>
            <v-btn :disabled="!valid" type="button" @click="submit" color="info">ログイン</v-btn>
          </v-form>
        </v-flex>
        <v-flex xs12>
          <v-alert v-if="errorMessage != ''" :value="true" type="error">{{ errorMessage }}</v-alert>
        </v-flex>
      </v-layout>
    </v-container>
    <LoadingDialog ref="loadingDialog"/>
    <MessageDialog ref="messageDialog"/>
  </div>
</template>

<script>
import LoadingDialog from "../components/common/loadingDialog";
import MessageDialog from "../components/common/messageDialog";
export default {
  components: {
    LoadingDialog,
    MessageDialog
  },
  mounted() {
    this.$refs.idTextbox.focus();
  },
  methods: {
    submit() {
      this.errorMessage = "";

      if (this.$refs.form.validate()) {
        this.$refs.loadingDialog.open();
        const req = {
          authInfo: {
            userId: this.userModel.id,
            password: this.userModel.password
          },
          success: () => {
            this.$refs.loadingDialog.close();
            //画面遷移
            let url = this.$route.query.redirect;
            if (!url || url === "") {
              //なければトップページ
              url = "/root";
            }
            this.$router.push(url);
          },
          error: result => {
            this.$refs.loadingDialog.close();
            if (result.isAuthError) {
              this.errorMessage = "認証に失敗しました。";
            } else {
              this.errorMessage = "認証中にエラーが発生しました。";
            }
          }
        };
        this.$store.dispatch("auth/login", req);
      }
    }
  },
  data() {
    return {
      idRules: [
        v => {
          if (!v || v.trim() == "") {
            return "Idを入力して下さい。";
          }
          return true;
        }
      ],
      passRules: [
        v => {
          if (!v || v.trim() == "") {
            return "passwordを入力して下さい。";
          }
          return true;
        }
      ],
      valid: false,
      userModel: {
        id: "",
        password: ""
      },
      errorMessage: ""
    };
  }
};
</script>

<style>
</style>
