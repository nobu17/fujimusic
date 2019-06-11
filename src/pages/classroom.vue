<template>
  <div v-scroll="onScroll">
    <v-flex xs12>
      <v-flex xs12>
        <h3 class="title-head text-md-center text-xs-center mt-3 mb-1">
          <v-icon class="mr-3" color="red" size="45">queue_music</v-icon>三島教室
        </h3>
      </v-flex>
      <v-flex xs12>
        <LoadingPartialScreen :isLoading="isLoading"/>
      </v-flex>
      <ClassInfoDisplay
        v-if="classInfoList[classIdList[0]]"
        :classInfo="classInfoList[classIdList[0]]"
        :mapAddress="mapList[0]"
      />
    </v-flex>
    <v-flex xs12>
      <v-alert v-if="errorMessage !== ''" :value="true" type="error">{{ errorMessage }}</v-alert>
    </v-flex>
    <v-flex xs12>
      <v-flex xs12>
        <h3 class="title-head text-md-center text-xs-center mt-3 mb-4">
          <v-icon class="mr-3" color="red" size="45">queue_music</v-icon>清水教室
        </h3>
      </v-flex>
      <v-flex xs12>
        <LoadingPartialScreen :isLoading="isLoading"/>
      </v-flex>
      <ClassInfoDisplay
        v-if="classInfoList[classIdList[1]]"
        :classInfo="classInfoList[classIdList[1]]"
        :mapAddress="mapList[1]"
      />
    </v-flex>
    <div>
      <v-fab-transition>
        <v-btn
          v-show="scrollButtonDisplied"
          class="topButton"
          color="pink"
          dark
          fixed
          absolute
          bottom
          right
          fab
          @click="scrollTop()"
        >
          <v-icon>keyboard_arrow_up</v-icon>
        </v-btn>
      </v-fab-transition>
    </div>
  </div>
</template>
<script>
import LoadingPartialScreen from "../components/common/loadingPartialScreen";
import ClassInfoDisplay from "../components/classroom/classInfoDisplay";
export default {
  components: {
    LoadingPartialScreen,
    ClassInfoDisplay
  },
  created() {
    this.isLoading = true;
    const req = {
      classIdList: this.classIdList,
      isForceCacheClear: false,
      success: () => {
        this.isLoading = false;
      },
      error: err => {
        this.isLoading = false;
        this.errorMessage =
          "ロードに失敗しました。画面をリロードしてください。" + err.message;
      }
    };
    this.$store.dispatch("classroom/readMultileClass", req);
  },
  methods: {
    onScroll() {
      const top = window.pageYOffset;
      if (top > 250) {
        this.scrollButtonDisplied = true;
      } else {
        this.scrollButtonDisplied = false;
      }
    },
    scrollTop() {
      window.scrollTo(0, 0);
    }
  },
  computed: {
    // クラス情報(keyが教室ID)
    classInfoList() {
      return this.$store.getters["classroom/classInfoList"];
    }
  },
  data() {
    return {
      scrollButtonDisplied: false,
      classIdList: ["mishima", "shimizu"],
      isLoading: false,
      mapList: [
        '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3263.4748489019794!2d138.8928783152435!3d35.11982198032903!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x60199aa48290b123%3A0x257af58e66246c58!2z6ZW35rOJ55S6IOWNl-mDqOWcsOWMuuOCu-ODs-OCv-ODvA!5e0!3m2!1sja!2sjp!4v1560262537319!5m2!1sja!2sjp" width="600" height="450" frameborder="0" style="border:0" allowfullscreen></iframe>',
        '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3266.6276866031067!2d138.46901731524142!3d35.04104298034855!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x601a347b0a0ebed7%3A0x21192d9f12bb8838!2z6Z2Z5bKh5biCIOa4heawtOWMl-mDqOS6pOa1geOCu-ODs-OCv-ODvA!5e0!3m2!1sja!2sjp!4v1551108237512" width="600" height="450" frameborder="0" style="border:0" allowfullscreen></iframe>'
      ],
      errorMessage: ""
    };
  },
  head: {
    title: {
      inner: "fujimusic ギタースクール",
      separator: "|",
      complement: "教室紹介"
    },
    meta: [
      {
        name: "description",
        content: "fujimusicの三島教室と清水教室の紹介です。"
      }
    ]
  }
};
</script>
<style>
.topButton {
  margin-bottom: 40px;
}
.article {
  letter-spacing: 4px;
  font-size: 16px;
  line-height: 35px;
  background-color: #fafafa;
}
.time-list {
  letter-spacing: 4px;
  font-size: 16px;
  line-height: 20px;
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

