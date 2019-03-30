<template>
  <div>
    <v-container class="mt-0 mb-0">
      <v-layout wrap>
        <v-flex xs12>
          <v-btn color="primary" @click="changePage('')">管理Topへ</v-btn>
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
  }
};
</script>

<style>
</style>
