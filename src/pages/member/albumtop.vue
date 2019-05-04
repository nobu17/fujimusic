<template>
  <div>
    <v-container :class="{'ma-0 pa-0': $vuetify.breakpoint.smAndDown}">
      <v-layout justify-center row wrap>
        <v-flex xs12>
          <h3 class="title-head text-md-center text-xs-center mt-3 mb-4">
            <v-icon class="mr-3" color="red" size="45">portrait</v-icon>アルバム
          </h3>
        </v-flex>
        <v-flex xs12>
          <h3 class="t-title text-xs-center stripe ma-3">一覧</h3>
          <p class="article ml-5 multiLine">フジミュージックの過去イベント写真です。画像を選択すると写真が全て表示されます。</p>
        </v-flex>
        <v-flex xs12>
          <LoadingPartialScreen :isLoading="isLoading"/>
        </v-flex>
        <v-container fluid grid-list-md pa-2>
          <v-layout row wrap>
            <v-flex v-for="(album,index) in albumList" :key="index" xs12 md6>
              <v-hover>
                <v-card slot-scope="{ hover }" :class="`elevation-${hover ? 12 : 2}`">
                  <v-card-title class="al_title">{{ album.eventDateStr }} {{ album.title }}</v-card-title>
                  <v-img :src="album.thumbnail.fileUrl" aspect-ratio="2" @click="openAlbum(album)"></v-img>
                </v-card>
              </v-hover>
            </v-flex>
          </v-layout>
        </v-container>
      </v-layout>
    </v-container>
    <MessageDialog ref="messageDialog"/>
  </div>
</template>

<script>
import LoadingPartialScreen from "../../components/common/loadingPartialScreen";
import MessageDialog from "../../components/common/messageDialog";
export default {
  components: {
    LoadingPartialScreen,
    MessageDialog
  },
  created() {
    this.isLoading = true;
    const req = {
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
  methods: {
    // アルバムを開く
    openAlbum(album) {
      this.$router.push("/member/albumpage/" + album.albumId);
    }
  },
  data() {
    return {};
  }
};
</script>

<style scoped>
.al_title {
  font-size: 20px;
}
</style>
