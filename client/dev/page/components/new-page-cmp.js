;(function() {
    window.browser = window.browser || window.chrome;

    Vue.component("new-page-cmp", {
      data() {
        return {
          url: "https://powershellgallery.com",
          dialog: false,
          snackbar: false
        }
      },
      props: ['pages'],
      template: `
      <v-layout row justify-center>
      <v-dialog v-model="dialog" fullscreen transition="dialog-bottom-transition" :overlay=false>
        <v-btn primary flat slot="activator" @click.native="refreshUrl()"><v-icon>add</v-icon></v-btn>
        <v-card class="background-white">
          <v-toolbar class="primary">
            <v-btn icon @click.native="closeDialog()">
              <v-icon>close</v-icon>
            </v-btn>
            <v-toolbar-title>New page</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
              <v-btn flat @click.native="add()">Save</v-btn>
            </v-toolbar-items>
          </v-toolbar>
          <v-subheader>Add a new page</v-subheader>
          <v-container class="container">
            <v-flex xs12>
              <v-text-field
                autofocus
                v-model="url"
                v-on:keyup.enter="add"
                v-bind:class="{'page-error': !url}"
                name="input-1-3"
                label="Add another page"
                single-line></v-text-field>
            </v-flex>
          </v-container>
          <v-snackbar
            error
            v-model="snackbar"
            >
                Not a valid URL
            <v-btn flat @click.native="snackbar = false">Close</v-btn>
          </v-snackbar>
        </v-card>
      </v-dialog>
    </v-layout>`,
      mounted() {},
      methods: {
        closeDialog() {
            this.dialog = false;
            let self = this;
            browser.tabs.query({currentWindow: true, active: true}, function(tabs){
              self.url = tabs[0].url;
            });
        },
        add() {
          /*
          // Consider activating the regex again
          if(!IsUrl(this.url)) {
              this.snackbar = true;
              return;
          }*/

          this.pages.push({
            _id: Math.random() * 2000 + "" + Date.now(),
            pageMessage: this.url
          });
          //localStorage.setItem("pages", JSON.stringify(this.pages));
          browser.storage.sync.set({ pages: this.pages });

          this.closeDialog();
        },
        refreshUrl() {
          let self = this;
          browser.tabs.query({currentWindow: true, active: true}, function(tabs){
            self.url = tabs[0].url;
          });
        }
      }
    });

    function IsUrl(value) {
        const pattern = /[-a-zA-Z0-9]{1,256}:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/
        return pattern.test(value);
      }
  }());
