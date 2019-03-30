<template>
  <div>
    <v-container :class="{'ma-0 pa-0': $vuetify.breakpoint.smAndDown}">
      <v-layout wrap>
        <v-flex xs12>
          <h3 class="title-head text-md-center text-xs-center mt-1 mb-4">
            <v-icon class="mr-3" color="pink" size="45">info</v-icon>お知らせ
          </h3>
        </v-flex>
        <v-flex xs12>
          <v-select
            :class="{'title-head_xs mb-3': $vuetify.breakpoint.smAndDown, 'title-head mb-4': $vuetify.breakpoint.mdAndUp}"
            :disabled="isLoading"
            lebel="日時"
            v-model="selectedDate"
            item-text="date"
            :items="dateList"
            @change="selectionChange()"
          ></v-select>
        </v-flex>
        <v-flex xs12>
          <LoadingPartialScreen :isLoading="isLoading"/>
        </v-flex>
        <v-flex xs12>
          <v-alert v-if="errorMessage != ''" :value="true" type="error">{{ errorMessage }}</v-alert>
        </v-flex>
        <v-flex xs12>
          <div v-show="!isLoading">
            <v-flex class="cardroot mb-2 xs12 md12" v-for="(info,i) in items" :key="i">
              <v-card class="cardroot" color="elevation-0 transparent">
                <v-card-title>
                  <div>
                    <h3
                      :class="{'title-head_xs mb-3': $vuetify.breakpoint.smAndDown, 'title-head mb-4': $vuetify.breakpoint.mdAndUp}"
                    >
                      <div>
                        <v-icon class="hidden-sm-and-down" color="red" size="40">calendar_today</v-icon>
                        <v-icon class="hidden-md-and-up" color="red" size="25">calendar_today</v-icon>
                        {{info.postDate}}&nbsp;&nbsp;{{info.title}}
                      </div>
                    </h3>
                    <div
                      style="white-space:pre-wrap; word-wrap:break-word;"
                      :class="{'article_xs': $vuetify.breakpoint.smAndDown, 'article': $vuetify.breakpoint.mdAndUp}"
                    >{{info.content}}</div>
                  </div>
                </v-card-title>
              </v-card>
            </v-flex>
          </div>
          <hr class="class_end mt-5 mb-4">
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
import LoadingPartialScreen from "../components/common/loadingPartialScreen";
export default {
  components: {
    LoadingPartialScreen
  },
  created() {
    this.isLoading = true;
    const req = {
      success: () => {
        this.isLoading = false;
        // 先頭のデータを選択
        if (this.dateList.length > 0) {
          this.selectedDate = this.dateList[0].date;
          this.selectionChange();
        }
      },
      error: err => {
        this.isLoading = false;
        this.errorMessage =
          "ロードに失敗しました。画面をリロードしてください。" + err.message;
      }
    };
    this.$store.dispatch("info/readDateList", req);
  },
  methods: {
    async selectionChange() {
      this.errorMessage = "";
      // 選択した年月に応じて一覧を変更
      if (this.selectedDate && this.selectedDate !== "") {
        this.isLoading = true;
        const req = {
          selectDate: this.selectedDate,
          success: () => {
            this.isLoading = false;
          },
          error: err => {
            this.isLoading = false;
            console.error(err);
            this.errorMessage =
              "ロードに失敗しました。画面をリロードしてください。" +
              err.message;
          }
        };
        this.$store.dispatch("info/readTargetMonthInfo", req);
      }
    }
  },
  computed: {
    // 日付一覧
    dateList() {
      return this.$store.getters["info/dateList"];
    },
    // 選択月の投稿一覧
    items() {
      return this.$store.getters["info/currentMonthInfoList"];
    }
  },
  data() {
    return {
      errorMessage: "",
      isLoading: true,
      selectedDate: null,
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

<style scoped>
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
  padding: 0.3em;
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
  border-top: dashed 3px pink;
  height: 4px;
  color: #ffffff;
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
