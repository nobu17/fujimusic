<template>
  <div>
    <v-layout wrap>
      <v-flex class="pa-2" v-for="(info,i) in infoList" :key="i" xs12>
        <v-card color="blue lighten-5">
          <v-card-title primary-title>
            <div>
              <h3 class="headline mb-0">{{info.date}} {{info.title}}</h3>
              <div>{{info.text}}</div>
            </div>
          </v-card-title>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
export default {
  data() {
    return {
      infoList: [
        { date: "2019/01/04", title: "あああ", text: "ほげげえええ" },
        { date: "2019/01/02", title: "ういいい", text: "ほげげえええ" }
      ]
    };
  }
};
</script>

<style>
</style>
