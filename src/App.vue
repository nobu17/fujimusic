<template>
  <v-app>
    <v-toolbar dark color="pink darken-2" app>
      <v-toolbar-title class="headline">
        <span class="px-2" @click="changePage(menu[0].link)">fujimusic</span>
        <span class="hidden-sm-and-down px-2">ギタースクール</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn v-for="item in filteredMenu" :key="item.title" @click="changePage(item.link)" flat>
          <v-icon class="pr-1">{{ item.icon }}</v-icon>
          {{ item.title }}
        </v-btn>
      </v-toolbar-items>
      <v-menu class="hidden-md-and-up">
        <v-toolbar-side-icon slot="activator"></v-toolbar-side-icon>
        <v-list>
          <v-list-tile
            v-for="item in filteredMenu"
            :key="item.title"
            @click="changePage(item.link)"
          >
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
  computed: {
    // ユーザのログイン状態に応じてフィルタしたメニュー
    filteredMenu() {
      return this.menu.filter(item => {
        // 認証設定が無ければ無条件ok
        if (!item.isNeedAdmin && !item.isNeedLogin) {
          return true;
        }
        if (item.isNeedLogin) {
          if (this.isLoggedIn) {
            return true;
          }
        }
        if (item.isNeedAdmin) {
          if (this.isAdmin) {
            return true;
          }
        }
        return false;
      });
    },
    // ログイン状態
    isLoggedIn() {
      return this.$store.getters["auth/isLoggedIn"];
    },
    // ログイン中ユーザは管理者かどうか
    isAdmin() {
      return this.$store.getters["auth/isAdmin"];
    }
  },
  methods: {
    changePage(url) {
      if (!url || url === "") {
        //なければトップページ
        url = "/root";
      }
      // httpから始まる場合は別タブ(twitter)
      if (url.startsWith("http")) {
        window.open(url);
      } else {
        this.$router.push(url);
      }
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
        { title: "生徒紹介", icon: "tag_faces", link: "/students" },
        {
          title: "Twitter",
          icon: "share",
          link: "https://twitter.com/fujimusic2011"
        },
        {
          title: "アルバム",
          icon: "location_searching",
          link: "/member/albumtop",
          isNeedLogin: true
        },
        {
          title: "管理ページ",
          icon: "https",
          link: "/admin",
          isNeedAdmin: true
        },
        {
          title: "ログアウト",
          icon: "cancel_presentation",
          link: "/logout",
          isNeedLogin: true
        }
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