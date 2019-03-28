<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" persistent max-width="800" content content-class="centered-dialog">
      <v-card>
        <v-card-title
          class="headline grey lighten-1"
          primary-title
        >
          {{ title }}
        </v-card-title>

        <v-card-text>
          {{ message }}
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            v-show="isOkBtnDisplayed()"
            color="primary"
            flat
            @click="okclick"
          >
            OK
          </v-btn>
          <v-btn
            v-show="isCancelBtnDisplayed()"
            color="primary"
            flat
            @click="cancelclick"
          >
            Cancel
          </v-btn>
          <v-btn
            v-show="isYesBtnDisplayed()"
            color="primary"
            flat
            @click="yesclick"
          >
            はい
          </v-btn> 
          <v-btn
            v-show="isNoBtnDisplayed()"
            color="primary"
            flat
            @click="noclick"
          >
            いいえ
          </v-btn>         
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
    export default {
        data () {
            return {
                title: '',
                message: '',
                buttontype: 'ok',
                dialog: false,
                resolve: null,
                reject: null,
            }
        },
        methods: {
            open (title, message, buttontype) {
                this.title = title;
                this.message = message;
                this.buttontype = buttontype;
                this.dialog = true;

                return new Promise((resolve, reject) => {
                    this.resolve = resolve;
                    this.reject = reject;
                });
            },
            close () {
                this.resolve(null);
                this.dialog = false;
            },
            okclick () {
                this.resolve('ok');
                this.dialog = false;
            },
            cancelclick () {
                this.resolve('cancel');
                this.dialog = false;
            },
            yesclick () {
                this.resolve('yes');
                this.dialog = false;
            },
            noclick () {
                this.resolve('no');
                this.dialog = false;
            },
            isOkBtnDisplayed () {
                if(this.buttontype == 'ok' || this.buttontype == 'okcancel') {
                    return true;
                }
                return false;
            },
            isCancelBtnDisplayed () {
                if(this.buttontype == 'okcancel') {
                    return true;
                }
                return false;                
            },
            isYesBtnDisplayed () {
                if(this.buttontype == 'yes' || this.buttontype == 'yesno') {
                    return true;
                }
                return false;
            },
            isNoBtnDisplayed () {
                if(this.buttontype == 'yesno') {
                    return true;
                }
                return false; 
            },            
        }
    }
</script>