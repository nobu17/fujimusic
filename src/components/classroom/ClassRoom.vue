<template>
  <div>
    <v-layout wrap>
      <v-flex class="pa-2" v-for="(room,i) in classRooms" :key="i" xs12>
        <v-card color="blue lighten-5">
          <v-carousel class="pa-4">
            <v-carousel-item v-for="(item,i) in room.images" :key="i" :src="item.src"></v-carousel-item>
          </v-carousel>
          <v-card-title primary-title>
            <div>
              <h3 class="headline mb-0">{{room.name}}</h3>
              <div>{{room.description}}</div>
            </div>
          </v-card-title>
        </v-card>
        <v-flex class="pa-2" xs12>
          <div class="ggmap" v-html="room.map"></div>
        </v-flex>
      </v-flex>
    </v-layout>
  </div>
</template>
<script>
export default {
  data() {
    return {
      classRooms: [
        {
          name: "三島教室",
          description: "説明です",
          images: [
            { src: "https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg" },
            { src: "https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg" }
          ],
          map:
            '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3263.477240510063!2d138.89287291524357!3d35.119762280328864!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x60199aa4829704d9%3A0x941ace08ced74506!2z44CSNDExLTA5NDQg6Z2Z5bKh55yM6ae_5p2x6YOh6ZW35rOJ55S656u55Y6f77yS77yR77yR4oiS77yT77yQIOmVt-azieeUuuWNl-mDqOWcsOWMuuOCu-ODs-OCv-ODvDLpmo4!5e0!3m2!1sja!2sjp!4v1550762841359" width="800" height="600" frameborder="0" style="border:0" allowfullscreen></iframe>'
        },
        {
          name: "清水教室",
          description: "説明です",
          images: [
            { src: "https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg" },
            { src: "https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg" }
          ],
          map:
            '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3263.477240510063!2d138.89287291524357!3d35.119762280328864!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x60199aa4829704d9%3A0x941ace08ced74506!2z44CSNDExLTA5NDQg6Z2Z5bKh55yM6ae_5p2x6YOh6ZW35rOJ55S656u55Y6f77yS77yR77yR4oiS77yT77yQIOmVt-azieeUuuWNl-mDqOWcsOWMuuOCu-ODs-OCv-ODvDLpmo4!5e0!3m2!1sja!2sjp!4v1550762841359" width="800" height="600" frameborder="0" style="border:0" allowfullscreen></iframe>'
        }
      ]
    };
  }
};
</script>
<style>
.ggmap {
  position: relative;
  padding-bottom: 56.25%;
  padding-top: 30px;
  height: 0;
  overflow: hidden;
}

.ggmap iframe,
.ggmap object,
.ggmap embed {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>

