<template>
  <div>
    <v-container :class="{'ma-0 pa-0': $vuetify.breakpoint.smAndDown}">
      <v-layout wrap>
        <v-flex xs12>
          <h3 class="title-head text-md-center text-xs-center mt-3 mb-4">
            <v-icon class="mr-3" color="red" size="45">tag_faces</v-icon>生徒紹介
          </h3>
        </v-flex>
        <v-flex xs12>
          <p class="article ml-5 multiLine">フジミュージックの生徒(卒業生)の紹介です。</p>
        </v-flex>
        <v-flex xs12>
          <h3 class="t-title stripe ma-3">音羽歯科</h3>
          <p
            class="article ml-5 multiLine"
          >清水教室の生徒の山田さんの経営する歯科医院です。フジミュージックで毎年開催するＢＢＱの写真も載っていますので見てみてください。</p>
          <v-hover>
            <div slot-scope="{ hover }" :class="`ml-5 mb-3 elevation-${hover ? 12 : 2}`">
              <v-img
                class="otologo"
                :src="require('../assets/students/otowa.png')"
                @click="openUrl('http://otowashika.com/')"
              ></v-img>
            </div>
          </v-hover>
        </v-flex>
        <v-flex xs12>
          <h3 class="t-title stripe ma-3">Ｔｏｍｍｙ</h3>
          <p
            class="article ml-5 multiLine"
          >フジミュージックの卒業生で、現在は静岡を中心に音楽活動をしているTommyさんのサイトです。フジミュージックのイベントにも定期的に参加してくれています。</p>
          <v-hover>
            <div slot-scope="{ hover }" :class="`ml-5 mb-3 elevation-${hover ? 12 : 2}`">
              <v-img
                class="otologo"
                :src="require('../assets/students/tommy.jpg')"
                @click="openUrl('https://ameblo.jp/tommy-karen/')"
              ></v-img>
            </div>
          </v-hover>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
export default {
  methods: {
    openUrl(url) {
      window.open(url);
    }
  },
  head: {
    title: {
      inner: "fujimusic ギタースクール",
      separator: "|",
      complement: "生徒紹介"
    },
    meta: [{ name: "description", content: "fujimusicの生徒の紹介です。" }]
  }
};
</script>

<style>
.otologo {
  border: medium solid black;
}
</style>
