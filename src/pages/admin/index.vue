<template>
  <div>
    <v-container :class="{'ma-0 pa-0': $vuetify.breakpoint.smAndDown}">
      <v-layout wrap>
        <v-flex xs12>
          <h3 class="title-head text-md-center text-xs-center mt-3 mb-4">
            <v-icon class="mr-3" color="red" size="45">attach_money</v-icon>管理ページ
          </h3>
        </v-flex>
        <v-flex xs12>
          <ul>
            <v-list>
              <template v-for="menu in menuList">
                <v-list-tile :key="menu.link" @click="changePage(menu.link)">
                  <v-list-tile-avatar>
                    <v-icon>{{ menu.icon }}</v-icon>
                  </v-list-tile-avatar>
                  <v-list-tile-content class="menuTitle">{{menu.text}}</v-list-tile-content>
                </v-list-tile>
              </template>
            </v-list>
          </ul>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
export default {
  methods: {
    changePage(url) {
      if (!url || url === "") {
        //なければトップページ
        url = "/admin";
      }
      // httpから始まる場合
      if (url.startsWith("http")) {
        window.open(url);
      } else {
        this.$router.push(url);
      }
    }
  },
  data() {
    return {
      menuList: [
        { text: "お知らせ管理", icon: "info", link: "/admin/infoedit" },
        {
          text: "トップページ画像変更",
          icon: "info",
          link: "/admin/topimageedit"
        },
        {
          text: "アルバム管理",
          icon: "info",
          link: "/admin/albumedit/edittop"
        },
        {
          text: "三島教室の設定",
          icon: "info",
          link: "/admin/classedit/mishima"
        },
        {
          text: "清水教室の設定",
          icon: "info",
          link: "/admin/classedit/shimizu"
        }
      ]
    };
  }
};
</script>

<style scoped>
.menuTitle {
  letter-spacing: 2px;
  font-size: 20px;
  line-height: 35px;
  background-color: transparent;
}
</style>

