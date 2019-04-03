<template>
  <div>
    <input
      style="display: none"
      ref="input"
      type="file"
      color="info"
      accept="image/jpeg, image/jpg, image/png"
      :disabled="disabled"
      @change="resize()"
    >
    <v-container class="mt-0 mb-0">
      <v-layout wrap>
        <v-flex xs2>
          <v-btn color="info" @click="pickFile" :disabled="disabled">アップロード</v-btn>
        </v-flex>
        <v-flex xs10>
          <v-text-field label="アップロードボタンを押下してください。" readonly v-model="imageName"></v-text-field>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
export default {
  props: {
    drawImageArgs: {
      type: Function,
      required: true
    },
    value: {
      type: String,
      required: true
    }
  },
  mounted() {
    this.imageName = this.value;
  },
  data() {
    return {
      disabled: false,
      imageName: ""
    };
  },

  methods: {
    pickFile() {
      this.$refs.input.click();
    },
    resize() {
      this.disabled = true;
      const file = this.$refs.input.files[0];

      if (!file) {
        return;
      }

      this.imageName = file.name;
      this.$emit("input", this.imageName);
      const reader = new FileReader();

      reader.onload = event => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        const image = new Image();
        image.crossOrigin = "Anonymous";

        image.onload = () => {
          const drawImageArgs = this.drawImageArgs(image);

          if (drawImageArgs.length === 9) {
            canvas.width = drawImageArgs[7];
            canvas.height = drawImageArgs[8];
          }

          ctx.drawImage(...drawImageArgs);

          const base64 = canvas.toDataURL();
          const imageName = this.imageName;
          this.$emit("resized", {
            base64,
            imageName
          });
          this.disabled = false;
        };

        image.src = event.target.result;
      };

      reader.readAsDataURL(file);
    }
  }
};
</script>