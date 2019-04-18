<template>
  <div>
    <v-container :class="{'ma-0 pa-0': $vuetify.breakpoint.smAndDown}">
      <v-layout justify-center wrap>
        <v-flex xs12>
          <h3 class="title-head text-md-center text-xs-center mt-3 mb-4">
            <v-icon class="mr-3" color="red" size="45">portrait</v-icon>アルバム
          </h3>
        </v-flex>
        <v-flex xs12>
          <h3 class="t-title stripe ma-3">一覧</h3>
          <p class="article ml-5 multiLine">フジミュージックの過去イベント写真です。画像をクリックすると写真が全て表示されます。</p>
        </v-flex>
        <v-container fluid grid-list-md>
          <v-layout row wrap>
            <v-flex xs12>
              <LoadingPartialScreen :isLoading="isLoading"/>
            </v-flex>
            <v-flex v-if="albumList" xs12 md6>
              <div v-for="(album,index) in albumList" :key="index" mb3>
                <v-hover>
                  <v-card slot-scope="{ hover }" :class="`elevation-${hover ? 12 : 2}`">
                    <v-card-title>{{ album.eventDateStr }} {{ album.title }}</v-card-title>
                    <v-img :src="album.thumbnail" aspect-ratio="2" @click="openAlbum(album)"></v-img>
                  </v-card>
                </v-hover>
              </div>
            </v-flex>
            <v-flex v-for="(album,index) in albums" :key="index" xs12 md6>
              <v-hover>
                <v-card slot-scope="{ hover }" :class="`elevation-${hover ? 12 : 2}`">
                  <v-card-title>{{ album.description }}</v-card-title>
                  <v-img :src="album.thumbnail" aspect-ratio="2" @click="openAlbum(album)"></v-img>
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
    return {
      isLoading: false,
      //albums: [{}],
      albums: [
        {
          albumId: "1",
          thumbnail: require("../../assets/album/album1.jpg"),
          description: "2017/4/9 Tommy BirthdayLive"
        },
        {
          albumId: "2",
          thumbnail: require("../../assets/album/album2.jpg"),
          description: "2017/5/7 fujimusic concert"
        },
        {
          albumId: "3",
          thumbnail: require("../../assets/album/album3.jpg"),
          description: "2017/5/7 fujimusic concert"
        },
        {
          albumId: "4",
          thumbnail: require("../../assets/album/album4.jpg"),
          description: "2017/5/7 fujimusic concert"
        }
      ]
    };
  }
};
</script>

<style>
</style>
