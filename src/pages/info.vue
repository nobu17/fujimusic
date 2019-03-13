<template>
  <div>
    <v-container>
      <v-layout wrap>
        <v-flex xs12>
          <h3 class="title-head text-md-center text-xs-center mb-4">
            <v-icon class="mr-3" color="red" size="45">info</v-icon>お知らせ
          </h3>
        </v-flex>
        <v-flex class="cardroot mb-2 xs12 md12" v-for="(info,i) in infoList" :key="i">
          <v-card class="cardroot" color="elevation-0 transparent">
            <v-card-title>
              <div>
                <h3
                  :class="{'title-head_xs mb-3': $vuetify.breakpoint.smAndDown, 'title-head mb-4': $vuetify.breakpoint.mdAndUp}"
                >
                  <div>
                    <v-icon class="hidden-sm-and-down" color="red" size="40">calendar_today</v-icon>
                    <v-icon class="hidden-md-and-up" color="red" size="25">calendar_today</v-icon>
                    {{info.date}}&nbsp;&nbsp;{{info.title}}
                  </div>
                </h3>
                <div
                  :class="{'article_xs': $vuetify.breakpoint.smAndDown, 'article': $vuetify.breakpoint.mdAndUp}"
                >{{info.text}}</div>
              </div>
            </v-card-title>
          </v-card>
        </v-flex>
        <v-flex xs12>
          <h3 class="title-head text-md-center text-xs-center mb-4">
            <v-icon class="mr-3" color="red" size="45">calendar_today</v-icon>予定表
          </h3>
          <v-flex class xs12>
            <div class="gc-wrap">
              <div class="g-calendar" v-html="calendarUrl"></div>
            </div>
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
      infoList: [
        {
          date: "2019/03/07",
          title: "リニューアル",
          text:
            "ホームページを移転しました。これからもよろしくお願いいたします。"
        }
      ],
      calendarUrl:
        '<iframe src="https://calendar.google.com/calendar/embed?src=i2g9m5u0sqojeuqocemfc4thi0%40group.calendar.google.com&ctz=Asia%2FTokyo&showPrint=0&showTabs=0" style="border: 0" width="800" height="600" frameborder="0" scrolling="no"></iframe>'
    };
  },
  head: {
    title: {
      inner: "fujimusic ギタースクール",
      separator: "|",
      complement: "お知らせ"
    },
    meta: [
      {
        name: "description",
        content: "fujimusicからお知らせとスケジュールを記載します。"
      }
    ]
  }
};
</script>

<style>
.article {
  letter-spacing: 4px;
  font-size: 17px;
  line-height: 35px;
  background-color: #fafafa;
}
.article_xs {
  letter-spacing: 2px;
  font-size: 15px;
  line-height: 25px;
  background-color: #fafafa;
}

.title-head {
  letter-spacing: 4px;
  font-size: 30px;
  line-height: 35px;
  font-weight: 300;
}
.title-head_xs {
  letter-spacing: 2px;
  font-size: 20px;
  line-height: 25px;
  font-weight: 150;
}
.cardroot {
  border-left: solid 8px #ff8a80;
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

.gc-wrap {
  max-width: 800px;
  margin: 3% auto;
}

.g-calendar {
  position: relative;
  overflow: hidden;
  height: 0;
  padding-bottom: 70%;
}

.g-calendar iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

@media screen and (max-width: 767px) {
  .g-calendar {
    padding-bottom: 90%;
  }
}
</style>
