<template>
  <div>
    <v-container>
      <v-layout justify-center wrap>
        <v-flex xs12>
          <h3 class="title-head text-md-center text-xs-center mb-4">
            <v-icon class="mr-3" color="red" size="45">portrait</v-icon>イベント
          </h3>
        </v-flex>
        <v-flex xs12>
          <h3 class="t-title stripe ma-3">案内</h3>
          <p class="article ml-5 multiLine">フジーミュージックのイベント時の写真を紹介します。画像をクリックすると拡大します。</p>
        </v-flex>
        <v-container fluid grid-list-md>
          <v-layout row wrap>
            <v-flex v-for="card in cards" :key="card.title" xs12 md6>
              <v-hover>
                <v-card slot-scope="{ hover }" :class="`elevation-${hover ? 12 : 2}`">
                  <v-img :src="card.src" aspect-ratio="2" @click="openImage(card.message, card.src)"></v-img>
                  <v-card-actions>{{ card.message }}</v-card-actions>
                </v-card>
              </v-hover>
            </v-flex>
          </v-layout>
        </v-container>
      </v-layout>
    </v-container>
    <ImageDialog ref="imageDialog"/>
  </div>
</template>

<script>
import ImageDialog from "../components/common/ImageDialog";

export default {
  components: {
    ImageDialog
  },
  data() {
    return {
      cards: [
        {
          src: require("../assets/album/album1.jpg"),
          message: "2017/4/9 Tommy BirthdayLive"
        },
        {
          src: require("../assets/album/album2.jpg"),
          message: "2017/5/7 fujimusic concert"
        },
        {
          src: require("../assets/album/album3.jpg"),
          message: "2017/5/7 fujimusic concert"
        },
        {
          src: require("../assets/album/album4.jpg"),
          message: "2017/5/7 fujimusic concert"
        }
      ]
    };
  },
  methods: {
    openImage(message, imageSrc) {
      this.$refs.imageDialog.open(message, imageSrc);
    }
  }
};
</script>

<style>
.article {
  letter-spacing: 4px;
  font-size: 16px;
  line-height: 35px;
  background-color: #fafafa;
}
.t-title {
  letter-spacing: 4px;
  font-size: 30px;
  font-weight: 200;
}
.stripe {
  position: relative;
  padding: -0.3em;
}
.stripe:after {
  content: "";
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 7px;
  background: repeating-linear-gradient(
    -45deg,
    gold,
    gold 2px,
    white 2px,
    white 4px
  );
}
</style>
