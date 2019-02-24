<template>
  <div>
    <v-layout justify-center wrap>
      <v-container fluid grid-list-md>
        <v-layout row wrap>
          <v-flex v-for="card in cards" :key="card.title" xs12 md4>
            <v-hover>
              <v-card slot-scope="{ hover }" :class="`elevation-${hover ? 12 : 2}`">
                <v-img :src="card.src" height="200px" @click="openImage(card.message, card.src)"></v-img>
                <v-card-actions>{{ card.message }}</v-card-actions>
              </v-card>
            </v-hover>
          </v-flex>
        </v-layout>
      </v-container>
    </v-layout>
    <ImageDialog ref="imageDialog"/>
  </div>
</template>

<script>
import ImageDialog from "../common/ImageDialog";

export default {
  components: {
    ImageDialog
  },
  data() {
    return {
      cards: [
        {
          src: "https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg",
          message: "test1"
        },
        {
          src: "https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg",
          message: "test2"
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
</style>
