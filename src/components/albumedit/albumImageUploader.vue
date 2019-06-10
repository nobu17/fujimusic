<template>
  <v-container class="mt-0 mb-0">
    <v-layout wrap>
      <v-flex xs12 v-if="base64">
        <v-img :src="base64" height="300" :contain="true"/>
      </v-flex>
      <v-flex xs12>
        <ResizableImageInput
          :imageName="fileName"
          :canDelete="true"
          @resized="resizeFinish"
          @disabledChanged="disabledChanged"
          @deleteClicked="deleteClicked"
        />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import ResizableImageInput from "../common/resizableImageInput";

export default {
  components: { ResizableImageInput },
  props: {
    value: {
      type: Object,
      required: true
    }
  },
  mounted() {
    this.base64 = this.value.fileUrl;
    this.fileName = this.value.fileName;
  },
  computed: {},
  data() {
    return {
      base64: "",
      fileName: ""
    };
  },

  methods: {
    //ボタンの有効状態の切り替わり
    disabledChanged(disabled) {
      this.$emit("disabledChanged", disabled);
    },
    deleteClicked() {
      this.base64 = "";
      this.fileName = "";
      this.$emit("input", { fileUrl: this.base64, fileName: this.fileName });
      this.$emit("deleteClicked");
    },
    resizeFinish({ base64, imageName }) {
      // 親にイベント発行
      //console.log(base64);
      this.base64 = base64;
      this.fileName = imageName;
      this.$emit("input", { fileUrl: this.base64, fileName: this.fileName });
    }
  }
};
</script>