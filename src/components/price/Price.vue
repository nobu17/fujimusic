<template>
  <div>
    <v-layout wrap>
      <v-flex class="pa-2" xs12>
        <v-card color="blue lighten-5">
          <v-card-title primary-title>
            <div>
              <h3 class="headline mb-0 pa-2" >アコースティックとエレキギターの教室です</h3>
              <div class="pa-2" style="white-space:pre-wrap;">{{freeTrialDescription}}</div>
            </div>
          </v-card-title>
        </v-card>
      </v-flex>
      <v-flex class="pa-2" xs12>
        <v-card color="blue lighten-5">
          <v-card-title primary-title>
            <div>
              <h3 class="headline mb-0 pa-2">料金案内</h3>
              <div class="pa-2" style="white-space:pre-wrap;">{{priceDescription}}</div>
            </div>
          </v-card-title>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>
<script>
export default {
  data(){
    return {
      freeTrialDescription: "無料体験レッスン\nまずは体験レッスンで教室の様子をお確かめ下さい。\nギターをお持ちでない方は練習用ギターを\nお貸しいたしますので　お気軽にお申し付けください。\n予約\nメール\nfujimusic2011@gmail.com\n電話\n090-8471-5227 丸山幸男\nメールでお申し込みの方は\nお名前　年齢　性別\n教室名（三島　清水）\nアコースティックギターかエレキギター\n電話番号またはメールアドレスをご記入ください",
      priceDescription: "入会金　　　５０００円\n１ヵ月に３回のレッスンになります\n1回のレッスンは1時間です\n月会費3回分\n中学生以下　３０００円\n高校生　　　４０００円\n一般　　　　５０００円\n個人レッスン1回50分　３０００円　予約制"
    }
  }
};
</script>
