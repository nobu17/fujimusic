<template>
  <div>
    <v-container :class="{'ma-0 pa-0': $vuetify.breakpoint.smAndDown}">
      <v-layout wrap>
        <v-flex xs12>
          <v-flex xs12>
            <v-carousel class="hidden-sm-and-down">
              <div v-for="(item,i) in classInfo.imageList" :key="i">
                <v-carousel-item v-if="item.fileUrl" :src="item.fileUrl"></v-carousel-item>
              </div>
            </v-carousel>
            <v-carousel class="hidden-md-and-up" height="250">
              <div v-for="(item,i) in classInfo.imageList" :key="i">
                <v-carousel-item v-if="item.fileUrl" :src="item.fileUrl"></v-carousel-item>
              </div>
            </v-carousel>
          </v-flex>
          <v-flex xs12>
            <h3 class="t-title stripe ma-3 text-md-center text-xs-center">案内</h3>
            <p
              :class="{'article_xs ml-3 mb-3 multiLine': $vuetify.breakpoint.smAndDown, 'article ml-5 mb-4 multiLine': $vuetify.breakpoint.mdAndUp}"
            >{{classInfo.description}}</p>
          </v-flex>
          <v-flex xs12>
            <h3 class="t-title stripe ma-3 text-md-center text-xs-center xs12 md6">時間</h3>
            <div class="text-md-center text-xs-center mb-5">
              <p class="time-list text-md-center text-xs-center multiLine">{{classInfo.lessonTimes}}</p>
            </div>
          </v-flex>
          <v-flex xs12>
            <h3 class="t-title stripe ma-3 text-md-center text-xs-center xs12">練習場所</h3>
            <p
              :class="{'article_xs ml-3 multiLine': $vuetify.breakpoint.smAndDown, 'article ml-5 multiLine': $vuetify.breakpoint.mdAndUp}"
            >{{classInfo.lessonPlace}}</p>
            <v-flex class xs12>
              <div class="ggmap mr-2" v-html="mapAddress"></div>
            </v-flex>
            <hr class="class_end pt-5">
          </v-flex>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>    

<script>
export default {
  components: {},
  props: {
    classInfo: {
      type: Object,
      required: true
    },
    mapAddress: {
      type: String,
      required: true
    }
  }
};
</script>

<style>
</style>
