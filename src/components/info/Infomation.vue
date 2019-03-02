<template>
  <div>
    <v-container>
      <v-layout wrap>
        <v-flex xs12>
          <h3 class="title-head text-md-center mb-4"><v-icon class="mr-3" color="red" size="45">info</v-icon>お知らせ</h3>
        </v-flex>
        <v-flex class="cardroot mb-2 xs12 md12" v-for="(info,i) in infoList" :key="i">
          <v-card class="cardroot" color="elevation-0 transparent">
            <v-card-title>
              <div>
                <h3 class="mr-4 mb-2 title-head">
                  <div>
                    <v-icon color="red" size="40">calendar_today</v-icon>
                    {{info.date}}&nbsp;&nbsp;{{info.title}}
                  </div>
                </h3>
                <div class="article">{{info.text}}</div>
              </div>
            </v-card-title>
          </v-card>
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
          date: "2019/01/04",
          title: "あああ",
          text:
            "ほげげえええ。ああああああああああああああああああああああああああああああああ。"
        },
        { date: "2019/01/02", title: "ういいい", text: "ほげげえええ" },
        { date: "2019/01/01", title: "ういいい", text: "ほげげえええ" }
      ]
    };
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
.title-head {
  letter-spacing: 4px;
  font-size: 30px;
  line-height: 35px;
  font-weight: 300;
}
.cardroot {
  border-left: solid 8px #FF8A80;
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
</style>
