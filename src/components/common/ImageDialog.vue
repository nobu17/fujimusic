<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" width="85%">
      <v-card>
        <v-img :src="imageSrc" aspect-ratio="1.7" ></v-img>
        <v-card-actions v-if="message !== ''">{{ message }}</v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>
<script>
export default {
  data() {
    return {
      message: "",
      imageSrc: "",
      dialog: false,
      resolve: null,
      reject: null
    };
  },
  methods: {
    open(message, imageSrc) {
      this.message = message;
      this.imageSrc = imageSrc;
      this.dialog = true;

      return new Promise((resolve, reject) => {
        this.resolve = resolve;
        this.reject = reject;
      });
    },
    close() {
      this.resolve(null);
      this.dialog = false;
    }
  }
};
</script>
