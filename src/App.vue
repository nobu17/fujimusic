<template>
  <v-app>
    <v-toolbar dark color="pink darken-2" app>
      <v-toolbar-title class="headline">
        <span class="px-2">fujimusic</span>
        <span class="px-2">ギタースクール</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn v-for="item in menu" :key="item.title" @click="changePage(item.link)" flat>
          <v-icon class="pr-1">{{ item.icon }}</v-icon>
          {{ item.title }}
        </v-btn>
      </v-toolbar-items>
      <v-menu class="hidden-md-and-up">
        <v-toolbar-side-icon slot="activator"></v-toolbar-side-icon>
        <v-list>
          <v-list-tile v-for="item in menu" :key="item.title" :to="item.link">
            <v-list-tile-content>
              <v-list-tile-title>
                <v-icon class="pr-1">{{ item.icon }}</v-icon>
                {{ item.title }}
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-menu>
    </v-toolbar>

    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: "App",
  components: {},
  methods: {
    changePage(url) {
      if (!url || url === "") {
        //なければトップページ
        url = "/root";
      }
      this.$router.push(url);
    }
  },
  data() {
    return {
      // メニュー表示アイテム
      menu: [
        { title: "ご案内", icon: "home", link: "/root" },
        { title: "お知らせ", icon: "info", link: "/info" },
        { title: "料金", icon: "card_travel", link: "/price" },
        { title: "教室紹介", icon: "face", link: "/classroom" },
        { title: "イベント", icon: "location_searching", link: "event" },
        { title: "Twitter", icon: "share" }
      ]
    };
  }
};
</script>
<style>
* {
  text-transform: none !important;
}
</style>