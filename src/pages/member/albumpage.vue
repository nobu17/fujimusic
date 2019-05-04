<template>
  <div>
    <v-container :class="{'ma-0 pa-0': $vuetify.breakpoint.smAndDown}">
      <v-layout justify-center wrap v-if="displayAlbumInfo">
        <v-layout wrap>
          <v-flex xs12>
            <v-btn color="primary" @click="changeAlbumTop()">アルバム一覧へ</v-btn>
          </v-flex>
        </v-layout>
        <v-flex xs12>
          <h3 class="title-head text-md-center text-xs-center mt-3 mb-4">
            <v-icon class="mr-3" color="red" size="45">portrait</v-icon>
            {{ displayAlbumInfo.title }}
          </h3>
        </v-flex>
        <v-flex xs12>
          <h3 class="t-title stripe ma-3"></h3>
          <p class="article ml-5 multiLine">{{ displayAlbumInfo.description }}</p>
        </v-flex>
        <v-container fluid grid-list-md>
          <v-layout row wrap>
            <v-flex v-for="(image,index) in displayAlbumInfo.imageList" :key="index" xs12 md6>
              <v-hover>
                <v-card slot-scope="{ hover }" :class="`elevation-${hover ? 12 : 2}`">
                  <v-img :src="image.fileUrl" aspect-ratio="2" @click="openImage(image)"></v-img>
                </v-card>
              </v-hover>
            </v-flex>
          </v-layout>
        </v-container>
      </v-layout>
    </v-container>
    <ImageDialog ref="imageDialog"/>
    <MessageDialog ref="messageDialog"/>
  </div>
</template>

<script>
import ImageDialog from "../../components/common/ImageDialog";
import MessageDialog from "../../components/common/messageDialog";
export default {
  components: {
    ImageDialog,
    MessageDialog
  },
  created() {
    // URLからアルバムIDを取得
    this.albumId = this.$route.params.albumId;
    const req = {
      albumId: this.albumId,
      success: () => {
        this.isLoading = false;
        //console.log("disp", this.displayAlbumInfo);
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
    this.$store.dispatch("album/readDisplayAlbumInfo", req);
  },
  computed: {
    // アルバム一覧
    displayAlbumInfo() {
      const disp = this.$store.getters["album/displayAlbumInfo"];
      if(disp) {
        disp.imageList = disp.imageList.filter(el => el.fileUrl !== "");
      }
      return disp;
    }
  },
  methods: {
    // 画像表示DLG
    async openImage(image) {
      // 表示
      await this.$refs.imageDialog.open("", image.fileUrl);
    },
    changeAlbumTop() {
      this.$router.push("/member/albumtop");
    }
  },
  data() {
    return {
      isLoading: false,
      albumId: "",
      album: {
        title: "",
        thumbnail: "",
        description: "",
        imageList: []
      }
    };
  }
};
</script>

<style>
</style>
