<template>
  <div>
    <AdminNavigate/>
    <v-container :class="{'ma-0 pa-0': $vuetify.breakpoint.smAndDown}">
      <v-layout justify-center wrap>
        <v-flex xs12>
          <h3 class="title-head text-md-center text-xs-center mt-3 mb-4">
            <v-icon class="mr-3" color="red" size="45">portrait</v-icon>アルバム編集
          </h3>
        </v-flex>
        <v-flex xs12>
          <v-btn @click="makeNewAlbum()" color="info" class="ml-4 mr-4" block>新規投稿</v-btn>
        </v-flex>
        <v-flex xs12>
          <h3 class="t-title stripe text-xs-center ma-3">一覧</h3>
          <p class="article ml-5 multiLine">編集したいアルバムを選択してください。</p>
        </v-flex>
        <v-flex xs12>
          <ul>
            <v-list v-if="albumList">
              <template v-for="album in albumList">
                <v-list-tile :key="album.albumdId" @click="dummy()">
                  <v-list-tile-content
                    class="menuTitle"
                    @click="openAlbum(album)"
                  >{{ album.eventDateStr }} {{ album.title }}</v-list-tile-content>
                  <v-list-tile-action>
                    <v-btn icon ripple @click="deleteAlbum(album)">
                      <v-icon color="red lighten-1">delete_forever</v-icon>
                    </v-btn>
                  </v-list-tile-action>
                </v-list-tile>
              </template>
            </v-list>
          </ul>
        </v-flex>
      </v-layout>
    </v-container>
    <MessageDialog ref="messageDialog"/>
    <LoadingScreen :isLoading="isLoading"/>
  </div>
</template>

<script>
import LoadingScreen from "../../../components/common/loadingScreen";
import MessageDialog from "../../../components/common/messageDialog";
import AdminNavigate from "../../../components/admin/adminNavigate";
export default {
  components: {
    LoadingScreen,
    MessageDialog,
    AdminNavigate
  },
  created() {
    this.isLoading = true;
    const req = {
      isForceCacheOff: true,
      success: () => {
        this.isLoading = false;
      },
      error: async err => {
        this.isLoading = false;
        await this.$refs.messageDialog.open(
          "エラー",
          "ロードに失敗しました。画面をリロードしてください",
          "ok"
        );
      }
    };
    this.$store.dispatch("album/readAlbumList", req);
  },
  computed: {
    // アルバム一覧
    albumList() {
      return this.$store.getters["album/albumList"];
    }
  },
  data() {
    return {
      isLoading: false
    };
  },
  methods: {
    dummy() {},
    openAlbum(album) {
      if (album) {
        this.$router.push("/admin/albumedit/edit/" + album.albumId);
      }
    },
    makeNewAlbum() {
      this.$router.push("/admin/albumedit/edit/" + "newMake");
    },
    async deleteAlbum(album) {
      if (confirm("選択したアルバムを削除しますか？")) {
        this.isLoading = true;
        const req = {
          albumId: album.albumId,
          success: () => {
            this.isLoading = false;
          },
          error: async err => {
            this.isLoading = false;
            await this.$refs.messageDialog.open(
              "エラー",
              "削除に失敗しました。画面をリロードしてください",
              "ok"
            );
          }
        };
        this.$store.dispatch("album/deleteAlbum", req);
      }
    }
  }
};
</script>

<style>
</style>
