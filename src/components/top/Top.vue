<template>
  <div>
    <v-layout wrap>
      <v-flex xs12>
        <v-carousel class="pa-2">
          <v-carousel-item v-for="(item,i) in topImages" :key="i" :src="item.src"></v-carousel-item>
        </v-carousel>
      </v-flex>
       <v-flex class="pa-2" xs12>
        <v-card color="blue">
          <v-card-title primary-title>
          <div>
            <h3 class="headline mb-0">アコースティックとギターの教室です</h3>
            <div>ああああああああああああああああああああああああああああああああああああああああああああ</div>
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
      topImages: [
        { src: "https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg" },
        { src: "https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg" }
      ]
    };
  }
};
</script>
