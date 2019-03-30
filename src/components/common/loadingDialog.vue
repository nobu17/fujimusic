<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" persistent content content-class="centered-dialog">
      <v-container fill-height>
        <v-layout column justify-center align-center>
          <v-progress-circular indeterminate :size="70" :width="7" :color="progressColor"></v-progress-circular>
          <h1>{{ message }}</h1>         
        </v-layout>
      </v-container>
    </v-dialog>
  </v-layout>
</template>

<script>
    export default {
        props: {
            progressColor: {
                type: String,
                required: false
            },           
        },
        data () {
            return {
                message: 'Now Loading...',
                dialog: false,
                resolve: null,
                reject: null,
            }
        },
        methods: {
            open (message) {

                if(message){
                    this.message = message;
                } else {
                    this.message = 'Now Loading...';
                }

                this.dialog = true;
            },
            close () {
                this.dialog = false;
            },
        }
    }
</script>

<style>
  .dialog.centered-dialog,
  .v-dialog.centered-dialog
 {
    background: #282c2dad;
    box-shadow: none;
    border-radius: 6px;
    width: auto;
    color: whitesmoke;
  }
</style>