<template>
  <div>
    <v-container>
      <v-layout wrap>
        <v-flex class="pa-2" v-for="(room,i) in classRooms" :key="i" xs12>
          <v-card color="white">
            <v-card-title class="pink lighten-3">
              <div>
                <h3 class="white--text headline mb-0">{{room.name}}</h3>
              </div>
            </v-card-title>
            <v-card-text>
              <v-layout wrap>
                <v-flex xs12 md7>
                  <v-carousel>
                    <v-carousel-item v-for="(item,i) in room.images" :key="i" :src="item.src"></v-carousel-item>
                  </v-carousel>
                </v-flex>
                <v-flex xs12 md5>
                  <div class="title ml-4" style="white-space:pre-wrap;">{{room.description}}</div>
                </v-flex>
              </v-layout>
            </v-card-text>
          </v-card>
          <v-flex class="pa-2" xs12>
            <div class="ggmap" v-html="room.map"></div>
          </v-flex>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>
<script>
export default {
  data() {
    return {
      classRooms: [
        {
          name: "三島教室",
          description:
            "月に3回　2人1組のレッスンになります\n1回　1時間です\n個人レッスンを御希望の方は相談ください\n火曜日　19：00～21：00\n水曜日　19：00～21：00\n木曜日　19：00～21：00\n日曜日　　9：00～12：00",
          images: [
            { src: require("../../assets/classroom/mishima1.jpg") },
            { src: "https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg" }
          ],
          map:
            '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3263.477240510063!2d138.89287291524357!3d35.119762280328864!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x60199aa4829704d9%3A0x941ace08ced74506!2z44CSNDExLTA5NDQg6Z2Z5bKh55yM6ae_5p2x6YOh6ZW35rOJ55S656u55Y6f77yS77yR77yR4oiS77yT77yQIOmVt-azieeUuuWNl-mDqOWcsOWMuuOCu-ODs-OCv-ODvDLpmo4!5e0!3m2!1sja!2sjp!4v1550762841359" width="800" height="600" frameborder="0" style="border:0" allowfullscreen></iframe>'
        },
        {
          name: "清水教室",
          description: "説明です",
          images: [
            { src: require("../../assets/classroom/shimizu1.jpg") },
            { src: "https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg" }
          ],
          map:
            '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3266.6276866031067!2d138.46901731524142!3d35.04104298034855!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x601a347b0a0ebed7%3A0x21192d9f12bb8838!2z6Z2Z5bKh5biCIOa4heawtOWMl-mDqOS6pOa1geOCu-ODs-OCv-ODvA!5e0!3m2!1sja!2sjp!4v1551108237512" width="600" height="450" frameborder="0" style="border:0" allowfullscreen></iframe>'
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

