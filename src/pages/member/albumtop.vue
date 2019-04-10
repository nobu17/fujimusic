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
            <v-flex v-for="(album,index) in albums" :key="index" xs12 md6>
              <v-hover>
                <v-card slot-scope="{ hover }" :class="`elevation-${hover ? 12 : 2}`">
                  <v-img :src="album.thumbnail" aspect-ratio="2" @click="openAlbum(album)"></v-img>
                  <v-card-actions>{{ album.desc }}</v-card-actions>
                </v-card>
              </v-hover>
            </v-flex>
          </v-layout>
        </v-container>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
export default {
  created() {},
  methods: {
    // アルバムを開く
    openAlbum(album) {

    }
  },
  data() {
    return {
      albums: [
        { }
      ]
    };
  }
};
</script>

<style>
</style>
