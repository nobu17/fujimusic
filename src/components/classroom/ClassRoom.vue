<template>
  <div>
    <v-container>
      <v-layout wrap>
        <v-flex v-for="(room,i) in classRooms" :key="i" xs12>
          <v-flex xs12>
            <h3 class="title-head text-md-center mb-4">
              <v-icon class="mr-3" color="red" size="45">queue_music</v-icon>
              {{room.name}}
            </h3>
          </v-flex>
          <v-flex xs12>
            <v-carousel>
              <v-carousel-item v-for="(item,i) in room.images" :key="i" :src="item.src"></v-carousel-item>
            </v-carousel>
          </v-flex>
          <v-flex xs12>
            <h3 class="t-title stripe ma-3">案内</h3>
            <p class="article ml-5 multiLine">{{room.description}}</p>
          </v-flex>
          <v-flex xs12>
            <h3 class="t-title stripe ma-3">時間</h3>
            <ul class="article ml-5" type="disc">
              <li
                v-for="(time,i) in room.lessonTimes"
                :key="i"
              >{{time.weekOfDay + " " + time.start + "～" + time.end }}</li>
            </ul>
          </v-flex>
          <v-flex xs12>
            <h3 class="t-title stripe ma-3">練習場所</h3>
            <p class="article ml-5">{{room.locationInfo.address}}</p>
            <p class="article ml-5">{{room.locationInfo.etc}}</p>
            <v-flex class xs12>
              <div class="ggmap ml-5" v-html="room.locationInfo.map"></div>
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
  data() {
    return {
      classRooms: [
        {
          name: "三島教室",
          description:
            "三島教室は月に3回、2人1組のレッスンになります。\n1回、1時間です。個人レッスンを御希望の方は相談ください。",
          lessonTimes: [
            { weekOfDay: "火曜日", start: "19:00", end: "21:00" },
            { weekOfDay: "水曜日", start: "19:00", end: "21:00" },
            { weekOfDay: "木曜日", start: "19:00", end: "21:00" },
            { weekOfDay: "日曜日", start: "09:00", end: "12:00" }
          ],
          images: [
            { src: require("../../assets/classroom/mishima1.jpg") },
            { src: "https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg" }
          ],
          locationInfo: {
            address: "静岡県駿東郡長泉町竹原211-30 南部地区センター2F",
            etc: "※駐車場あり",
            map:
              '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3263.477240510063!2d138.89287291524357!3d35.119762280328864!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x60199aa4829704d9%3A0x941ace08ced74506!2z44CSNDExLTA5NDQg6Z2Z5bKh55yM6ae_5p2x6YOh6ZW35rOJ55S656u55Y6f77yS77yR77yR4oiS77yT77yQIOmVt-azieeUuuWNl-mDqOWcsOWMuuOCu-ODs-OCv-ODvDLpmo4!5e0!3m2!1sja!2sjp!4v1550762841359" width="800" height="600" frameborder="0" style="border:0" allowfullscreen></iframe>'
          }
        },
        {
          name: "清水教室",
          description:
            "清水教室は月に3回、2人1組のレッスンになります。\n1回、1時間です。個人レッスンを御希望の方は相談ください。",
          lessonTimes: [{ weekOfDay: "日曜日", start: "15:00", end: "20:00" }],
          images: [
            { src: require("../../assets/classroom/shimizu1.jpg") },
            { src: "https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg" }
          ],
          locationInfo: {
            address: "静岡県静岡市清水区八坂2110-2　北部交流センター１F",
            etc: "※駐車場あり",
            map:
              '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3266.6276866031067!2d138.46901731524142!3d35.04104298034855!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x601a347b0a0ebed7%3A0x21192d9f12bb8838!2z6Z2Z5bKh5biCIOa4heawtOWMl-mDqOS6pOa1geOCu-ODs-OCv-ODvA!5e0!3m2!1sja!2sjp!4v1551108237512" width="600" height="450" frameborder="0" style="border:0" allowfullscreen></iframe>'
          }
        }
      ]
    };
  }
};
</script>
<style>
.article {
  letter-spacing: 4px;
  font-size: 16px;
  line-height: 35px;
  background-color: #fafafa;
}
.multiLine {
  white-space: pre-wrap;
}
.title-head {
  letter-spacing: 4px;
  font-size: 34px;
  line-height: 35px;
  font-weight: 200;
}
.t-title {
  letter-spacing: 4px;
  font-size: 30px;
  font-weight: 200;
}
.stripe {
  position: relative;
  padding: -0.3em;
}
.stripe:after {
  content: "";
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 7px;
  background: repeating-linear-gradient(
    -45deg,
    gold,
    gold 2px,
    white 2px,
    white 4px
  );
}

.class_end {
  border: none;
  border-top: dashed 3px #ff0000;
  height: 4px;
  color: #ffffff;
}

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
  height: 80%;
}
</style>

