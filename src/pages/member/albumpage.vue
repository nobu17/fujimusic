<template>
  <div>
    <v-container :class="{'ma-0 pa-0': $vuetify.breakpoint.smAndDown}">
      <v-layout justify-center wrap>
        <v-flex xs12>
          <h3 class="title-head text-md-center text-xs-center mt-3 mb-4">
            <v-icon class="mr-3" color="red" size="45">portrait</v-icon>
            {{ album.title }}
          </h3>
        </v-flex>
        <v-flex xs12>
          <h3 class="t-title stripe ma-3"></h3>
          <p class="article ml-5 multiLine">{{ album.description }}</p>
        </v-flex>
        <v-container fluid grid-list-md>
          <v-layout row wrap>
            <v-flex v-for="(image,index) in imageList" :key="index" xs12 md6>
              <v-hover>
                <v-card slot-scope="{ hover }" :class="`elevation-${hover ? 12 : 2}`">
                  <v-img :src="image" aspect-ratio="2" @click="openImage(image)"></v-img>
                </v-card>
              </v-hover>
            </v-flex>
          </v-layout>
        </v-container>
      </v-layout>
    </v-container>
    <ImageDialog ref="imageDialog" />
  </div>
</template>

<script>
import ImageDialog from "../../components/common/ImageDialog";
export default {
  components: {
    ImageDialog
  },
  created() {},
  methods: {
    // 画像表示DLG
    async openImage(image) {
        // 表示
        await this.$refs.imageDialog.open(image);
    }
  },
  data() {
    return {
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
