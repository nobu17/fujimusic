<template>
  <div>
    <v-container>
      <v-layout wrap>
        <v-flex xs12>
          <h3 class="title-head text-md-center text-xs-center mb-4">
            <v-icon class="mr-3" color="red" size="45">attach_money</v-icon>料金案内
          </h3>
        </v-flex>
        <v-flex xs12>
          <h3 class="t-title stripe ma-3 text-md-center text-xs-center">入会案内</h3>
          <p
            :class="{'article_xs ml-3 mb-3': $vuetify.breakpoint.smAndDown, 'article ml-5 mb-4': $vuetify.breakpoint.mdAndUp}"
          >
            まずは体験レッスンで教室の様子をお確かめ下さい。
            ギターをお持ちでない方は練習用ギターを
            お貸しいたしますので お気軽にお申し付けください。
          </p>
          <p
            :class="{'article_xs ml-3 mb-3': $vuetify.breakpoint.smAndDown, 'article ml-5 mb-4': $vuetify.breakpoint.mdAndUp}"
          >
            メール：
            fujimusic2011@gmail.com
          </p>
          <p
            :class="{'article_xs ml-3 mb-3': $vuetify.breakpoint.smAndDown, 'article ml-5 mb-4': $vuetify.breakpoint.mdAndUp}"
          >
            電話：
            090-8471-5227 丸山幸男
          </p>
          <p
            :class="{'article_xs ml-3 mb-3': $vuetify.breakpoint.smAndDown, 'article ml-5 mb-4': $vuetify.breakpoint.mdAndUp}"
          >※メールでお申し込みの方は下記をご記入ください</p>
          <ul
            :class="{'article_xs ml-3 mb-3': $vuetify.breakpoint.smAndDown, 'article ml-5 mb-4': $vuetify.breakpoint.mdAndUp}"
            type="disc"
          >
            <li>お名前、年齢、性別</li>
            <li>教室名（三島、清水）</li>
            <li>アコースティックギターかエレキギター</li>
            <li>電話番号またはメールアドレス</li>
          </ul>
        </v-flex>
        <v-flex xs12 md4>
          <h3 class="t-title stripe ma-3 text-md-center text-xs-center">入会金</h3>
          <h3 class="t-title text-md-right text-xs-right mr-3">{{entryFee}}</h3>
        </v-flex>
        <v-flex xs12 md4>
          <h3 class="t-title stripe ma-3 text-md-center text-xs-center">月会費</h3>
          <h3 class="t-title text-md-right text-xs-right mr-3">一般 {{monthlyFeeNormal}}</h3>
          <h3 class="t-title text-md-right text-xs-right mr-3">高校生 {{monthlyFeeHighSchool}}</h3>
          <h3 class="t-title text-md-right text-xs-right mr-3">中学生以下 {{monthlyFeeChild}}</h3>
          <p
            :class="{'article_xs ml-3 mb-3': $vuetify.breakpoint.smAndDown, 'article ml-5 mb-4': $vuetify.breakpoint.mdAndUp}"
          >※１ヵ月に３回のレッスンになります。1回のレッスンは1時間です</p>
        </v-flex>
        <v-flex xs12 md4>
          <h3 class="t-title stripe ma-3 text-md-center text-xs">個人レッスン</h3>
          <h3 class="t-title text-md-right text-xs-right mr-3">{{personalLessonFee}}</h3>
          <p
            :class="{'article_xs ml-3 mb-3': $vuetify.breakpoint.smAndDown, 'article ml-5 mb-4': $vuetify.breakpoint.mdAndUp}"
          >※1回毎の料金です。予約制です。</p>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>
<script>
export default {
  updated() {
    ("#app").scrollTop(0);
  },
  data() {
    return {
      entryFee: "￥5,000",
      monthlyFeeNormal: "￥5,000",
      monthlyFeeHighSchool: "￥4,000",
      monthlyFeeChild: "￥3,000",
      personalLessonFee: "￥3,000",
      freeTrialDescription:
        "無料体験レッスン\nまずは体験レッスンで教室の様子をお確かめ下さい。\nギターをお持ちでない方は練習用ギターを\nお貸しいたしますので　お気軽にお申し付けください。\n予約\nメール\nfujimusic2011@gmail.com\n電話\n090-8471-5227 丸山幸男\nメールでお申し込みの方は\nお名前　年齢　性別\n教室名（三島　清水）\nアコースティックギターかエレキギター\n電話番号またはメールアドレスをご記入ください",
      priceDescription:
        "入会金　　　５０００円\n１ヵ月に３回のレッスンになります\n1回のレッスンは1時間です\n月会費3回分\n中学生以下　３０００円\n高校生　　　４０００円\n一般　　　　５０００円\n個人レッスン1回50分　３０００円　予約制"
    };
  },
  head: {
    title: {
      inner: "fujimusic ギタースクール",
      separator: "|",
      complement: "料金案内"
    },
    meta: [{ name: "description", content: "fujimusicの料金案内です。" }]
  }
};
</script>
<style>
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
</style>
