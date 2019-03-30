<template>
  <div>
    <AdminNavigate class="mt-0 mb-0"/>
    <v-container class="mt-0 mb-0">
      <v-layout wrap>
        <v-flex xs12>
          <h3 class="title-head text-md-center text-xs-center mt-0 mb-1">
            <v-icon class="mr-3" color="red" size="45">attach_money</v-icon>お知らせ管理
          </h3>
        </v-flex>
        <v-flex xs12>
          <v-btn color="info" @click="mekeNewItem()">新規投稿</v-btn>
        </v-flex>
        <v-flex xs12>
          <v-select
            lebel="日時"
            v-model="selectedDate"
            item-text="date"
            :items="dateList"
            @change="selectionChange()"
          ></v-select>
        </v-flex>
        <v-flex xs12>
          <v-list two-line>
            <v-list-tile v-for="(item, index) in items" :key="index" @click="selectItem(item)">
              <v-list-tile-content>
                <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                <v-list-tile-sub-title>{{ item.postDate }}</v-list-tile-sub-title>
              </v-list-tile-content>

              <v-list-tile-action>
                <v-btn icon ripple @click="deleteItem(item, index)">
                  <v-icon color="grey lighten-1">delete_forever</v-icon>
                </v-btn>
              </v-list-tile-action>
            </v-list-tile>
          </v-list>
        </v-flex>
      </v-layout>
    </v-container>
    <InfoEditDialog ref="infoEditDialog"/>
    <MessageDialog ref="messageDialog"/>
    <LoadingScreen :isLoading="isLoading"/>
  </div>
</template>

<script>
import InfoEditDialog from "../../components/infoedit/infoeditDialog";
import LoadingScreen from "../../components/common/loadingScreen";
import MessageDialog from "../../components/common/messageDialog";
import AdminNavigate from "../../components/admin/adminNavigate";
export default {
  components: {
    InfoEditDialog,
    LoadingScreen,
    MessageDialog,
    AdminNavigate
  },
  created() {
    // init api call for reading datelist
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
      error: result => {
        this.isLoading = false;
      }
    };
    this.$store.dispatch("info/readDateList", req);
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
      isLoading: true,
      selectedDate: null,
      //dateList: [{ date: "2019-01" }, { date: "2019-02" }, { date: "2019-03" }],
      //perMonthItems: {},
      //items: [],
      iconPushed: false
    };
  },
  methods: {
    async selectItem(item) {
      //アイコン押下の場合はキャンセル
      if (!this.iconPushed) {
        const editItem = Object.assign(item);
        const result = await this.$refs.infoEditDialog.open(
          editItem.title,
          editItem.postDate,
          editItem.content
        );
        if (result) {
          // IDを付与
          result.id = editItem.id;
          this.isLoading = true;
          const req = {
            info: result,
            success: () => {
              this.isLoading = false;
            },
            error: err => {
              this.isLoading = false;
              console.error(err);
              this.$refs.messageDialog.open("エラー", err.message, "ok");
            }
          };
          this.$store.dispatch("info/editInfo", req);
        }
      }
      this.iconPushed = false;
    },
    async deleteItem(item, index) {
      this.iconPushed = true;
      if (confirm("削除を行いますか？")) {
        this.isLoading = true;
        const req = {
          info: item,
          success: () => {
            this.isLoading = false;
          },
          error: err => {
            this.isLoading = false;
            console.error(err);
            this.$refs.messageDialog.open("エラー", err.message, "ok");
          }
        };
        this.$store.dispatch("info/deleteInfo", req);
      }
    },
    async selectionChange() {
      // 選択した年月に応じて一覧を変更
      if (this.selectedDate && this.selectedDate !== "") {
        this.isLoading = true;
        const req = {
          selectDate: this.selectedDate,
          success: () => {
            this.isLoading = false;
            console.log("items", this.items);
          },
          error: err => {
            this.isLoading = false;
            console.error(err);
            this.$refs.messageDialog.open("エラー", err.message, "ok");
          }
        };
        this.$store.dispatch("info/readTargetMonthInfo", req);
      } else {
        //this.items = [];
      }
    },
    async mekeNewItem() {
      //現在日時
      const dt = new Date();
      const y = dt.getFullYear();
      const m = ("00" + (dt.getMonth() + 1)).slice(-2);
      const d = ("00" + dt.getDate()).slice(-2);
      const result = await this.$refs.infoEditDialog.open(
        "",
        y + "-" + m + "-" + d,
        ""
      );
      if (result) {
        this.isLoading = true;
        const req = {
          info: result,
          success: () => {
            this.isLoading = false;
            console.log("items", this.items);
          },
          error: err => {
            this.isLoading = false;
            console.error(err);
            this.$refs.messageDialog.open("エラー", err.message, "ok");
          }
        };
        this.$store.dispatch("info/postNewInfo", req);
      }
    }
  }
};
</script>

<style>
</style>
