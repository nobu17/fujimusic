<template>
  <div>
    <v-layout wrap>
      <v-flex xs12>
        <LoadingPartialScreen :isLoading="isLoading"/>
      </v-flex>
      <v-flex v-if="imageList.length > 0" xs12>
        <v-carousel class="hidden-sm-and-down ma-1" height="500">
          <div v-for="(item,i) in imageList" :key="i">
            <v-carousel-item v-if="item.fileUrl" :src="item.fileUrl"></v-carousel-item>
          </div>
        </v-carousel>
        <v-carousel class="hidden-md-and-up ma-1" height="250">
          <div v-for="(item,i) in imageList" :key="i">
            <v-carousel-item v-if="item.fileUrl" :src="item.fileUrl"></v-carousel-item>
          </div>
        </v-carousel>
      </v-flex>
      <v-flex v-if="errorMessage !== ''" xs12>
        <v-alert :value="true" type="error">{{ errorMessage }}</v-alert>
      </v-flex>
      <v-container :class="{'ma-0 pa-0': $vuetify.breakpoint.smAndDown}">
        <v-flex class="pa-3" xs12>
          <v-card class="mb-5 elevation-0 transparent">
            <v-card-title class="mb-2 justify-center">
              <div>
                <h3
                  :class="{'title-head_xs': $vuetify.breakpoint.smAndDown, 'title-head': $vuetify.breakpoint.mdAndUp}"
                >
                  <v-icon
                    color="red"
                    size="45"
                    class="hidden-sm-and-down mr-2"
                  >sentiment_satisfied_alt</v-icon>
                  <v-icon
                    color="red"
                    size="20"
                    class="hidden-md-and-up mr-2"
                  >sentiment_satisfied_alt</v-icon>
                  {{topTitle}}
                </h3>
              </div>
            </v-card-title>
            <v-card-text>
              <v-layout wrap>
                <v-flex xs12 md7>
                  <div
                    :class="{'article_xs': $vuetify.breakpoint.smAndDown, 'article mr-3': $vuetify.breakpoint.mdAndUp}"
                    style="white-space:pre-wrap;"
                  >{{topMessage}}</div>
                </v-flex>
                <v-flex xs12 md5>
                  <v-img :src="topTitleImage" class="ml-2" aspect-ratio="1.4"></v-img>
                </v-flex>
              </v-layout>
            </v-card-text>
          </v-card>
        </v-flex>
        <v-flex class="pa-2" xs12>
          <v-card class="elevation-0 transparent mb-5">
            <v-card-title class="mb-2 justify-center">
              <div>
                <h3
                  :class="{'title-head_xs': $vuetify.breakpoint.smAndDown, 'title-head': $vuetify.breakpoint.mdAndUp}"
                >
                  <v-icon color="red" size="45" class="hidden-sm-and-down mr-2">audiotrack</v-icon>
                  <v-icon color="red" size="20" class="hidden-md-and-up mr-2">audiotrack</v-icon>当教室の特徴
                </h3>
              </div>
            </v-card-title>
            <v-card-text>
              <v-layout wrap>
                <v-flex xs12 md3 class="goodpoints">
                  <v-card class="elevation-0 transparent">
                    <v-card-text class="text-xs-center">
                      <v-icon class="blue--text text--lighten-2" size="75">attach_money</v-icon>
                    </v-card-text>
                    <v-card-title primary-title class="layout justify-center">
                      <div class="headline text-xs-center stripe">
                        <v-icon class="pa-2">done_outline</v-icon>低価格
                      </div>
                    </v-card-title>
                    <v-card-text class="article">どなたでも気軽に参加できるように、一般的なギター教室と比較して安価な価格で受講できます。</v-card-text>
                  </v-card>
                </v-flex>
                <v-flex xs12 md3 class="goodpoints">
                  <v-card class="elevation-0 transparent">
                    <v-card-text class="text-xs-center">
                      <v-icon class="blue--text text--lighten-2" size="75">group</v-icon>
                    </v-card-text>
                    <v-card-title primary-title class="layout justify-center">
                      <div class="headline text-xs-center stripe">
                        <v-icon class="pa-2">done_outline</v-icon>幅広い年齢層
                      </div>
                    </v-card-title>
                    <v-card-text class="article">小学生から７０代まで、男女問わず様々な生徒がレッスンに参加しています。</v-card-text>
                  </v-card>
                </v-flex>
                <v-flex xs12 md3 class="goodpoints">
                  <v-card class="elevation-0 transparent">
                    <v-card-text class="text-xs-center">
                      <v-icon class="blue--text text--lighten-2" size="75">domain</v-icon>
                    </v-card-text>
                    <v-card-title primary-title class="layout justify-center">
                      <div class="headline text-xs-center stripe">
                        <v-icon class="pa-2">done_outline</v-icon>２つの教室
                      </div>
                    </v-card-title>
                    <v-card-text
                      class="article"
                    >静岡県東部(沼津市,三島市,長泉町,清水町,裾野市)と、中部(静岡市清水区,葵区,駿河区)で活動をしています。</v-card-text>
                  </v-card>
                </v-flex>
                <v-flex xs12 md3 class="goodpoints">
                  <v-card class="elevation-0 transparent">
                    <v-card-text class="text-xs-center">
                      <v-icon class="blue--text text--lighten-2" size="75">mic_none</v-icon>
                    </v-card-text>
                    <v-card-title primary-title class="layout justify-center">
                      <div class="headline text-xs-center stripe">
                        <v-icon class="pa-2">done_outline</v-icon>発表会
                      </div>
                    </v-card-title>
                    <v-card-text
                      class="article"
                    >年に2回の発表会で日頃の成果を披露できます。また、他の生徒と交流が楽します。BBQ等のイベントも行います。</v-card-text>
                  </v-card>
                </v-flex>
              </v-layout>
            </v-card-text>
          </v-card>
        </v-flex>
        <v-flex class="pa-2" xs12>
          <v-card class="elevation-0 transparent">
            <v-card-title class="mb-3 justify-center">
              <div>
                <h3
                  :class="{'title-head_xs mb-3': $vuetify.breakpoint.smAndDown, 'title-head': $vuetify.breakpoint.mdAndUp}"
                >
                  <v-icon color="red" size="45" class="hidden-sm-and-down mr-2">account_circle</v-icon>
                  <v-icon color="red" size="20" class="hidden-md-and-up mr-2">account_circle</v-icon>講師紹介
                </h3>
              </div>
            </v-card-title>
            <v-card-text>
              <v-layout wrap>
                <v-flex xs12 md7>
                  <div
                    :class="{'article_xs': $vuetify.breakpoint.smAndDown, 'article mr-3': $vuetify.breakpoint.mdAndUp}"
                    style="white-space:pre-wrap;"
                  >{{teacherProfile}}</div>
                </v-flex>
                <v-flex xs12 md5>
                  <v-img :src="teacherImage" class="ml-2" aspect-ratio="1.4"></v-img>
                </v-flex>
              </v-layout>
            </v-card-text>
          </v-card>
        </v-flex>
        <hr class="end mt-5 mb-5">
        <v-flex class="mt-5" xs12>
          <a class="exLink" href="http://www.guitar-kyoushitsu.com/">ギター教室navi</a>
        </v-flex>
      </v-container>
    </v-layout>
  </div>
</template>
<script>
import LoadingPartialScreen from "../components/common/loadingPartialScreen";
export default {
  components: {
    LoadingPartialScreen
  },
  created() {
    // トップ画像のロード
    this.isLoading = true;
    const req = {
      //ロード高速化のため画像の有無はチェックしない
      isPassCheckUrl: true,
      success: () => {
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
        this.errorMessage =
          "画像のロードに失敗しました。ページを更新してください。";
      }
    };
    this.$store.dispatch("toppage/loadTopImageList", req);
  },
  computed: {
    // 画像一覧
    imageList() {
      return this.$store.getters["toppage/imageList"];
    }
  },
  data() {
    return {
      errorMessage: "",
      isLoading: false,
      topTitle: "ご挨拶",
      topTitleImage: require("../assets/top/topimage.jpg"),
      topMessage:
        "fujimusic(フジミュージック）ギター教室には、小学生から60代、70代、の幅広い年代の生徒がいます。\nアットホームで気軽に楽しめ、そして、音楽好きな仲間を見つけることができる、そんな教室を目指しています。\nやってみたいけど、踏み出せない、そんなひとはいませんか？\nぜひ一緒に音楽を楽しみましょう！\n\n静岡県東部(沼津市,三島市,長泉町,清水町,裾野市)と、静岡県中部(静岡市清水区,葵区,駿河区)で活動をしています。",
      teacherImage: require("../assets/top/teacher.jpg"),
      teacherProfile:
        "名前：丸山 幸男(まるやま ゆきお)\nフジミュージック代表の丸山です。三島、清水教室のどちらの生徒も楽しみながらレッスンをしています。定期的な発表の場もあるので、飽きずにレッスンを続けることができます。フジミュージックに参加して一緒に楽しみましょう。"
    };
  },
  head: {
    title: {
      inner: "fujimusic ギタースクール",
      separator: "|",
      complement: "ギター教室"
    },
    meta: [
      {
        name: "description",
        content:
          "静岡県で活動しているギター教室です。東部(沼津市,三島市,長泉町,清水町,裾野市)と、中部(静岡市清水区,葵区,駿河区)で活動をしていす。"
      }
    ]
  }
};
</script>
<style>
.end {
  border: none;
  border-top: dashed 3px #ff0000;
  height: 4px;
  color: #ffffff;
}
.exLink {
  margin: 10px;
}
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
  font-size: 34px;
  line-height: 35px;
  font-weight: 200;
}
.title-head_xs {
  letter-spacing: 2px;
  font-size: 24px;
  line-height: 25px;
  font-weight: 150;
}

.goodpoints {
  letter-spacing: 4px;
  font-size: 22px;
  line-height: 35px;
  background-color: #fafafa;
}
.trans {
  color: #fafafa;
  background-color: #fafafa;
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
