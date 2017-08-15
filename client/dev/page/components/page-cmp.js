;(function() {
  window.browser = window.browser || window.chrome;
  Vue.component("page-cmp", {
    data() {
      return {
        title: "Tabby",
        pages: [],
        pageForm: {
          page: {
            pageMessage: ""
          }
        },
        fab: false,
      }
    },
    template: `
      <v-container class="container"><v-layout row wrap>
        <v-flex xs12 text-xs-center>
          <img src="client/dist/extension/images/logo.png" />
        </v-flex>

        <v-flex xs12>
          <v-list>
            <v-divider></v-divider>
            <template v-for="(page, index) in pages">
            <v-list-tile v-bind:key="page._id">
              <v-list-tile-content>
                <v-list-tile-title @click="navigate(page.pageMessage);">{{ page.pageMessage }}</v-list-tile-title>
              </v-list-tile-content>
              <v-list-tile-action>
                <v-btn icon ripple @click="remove(page._id);">
                  <v-icon class="grey--text text--lighten-1">delete</v-icon>
                </v-btn>
              </v-list-tile-action>
            </v-list-tile>
            <v-divider v-if="index + 1 < pages.length"></v-divider>
            </template>
          </v-list>
        </v-flex>

        <!--<v-flex xs12>
        <form class="page-form"
              @submit.prevent="add(pageForm.page)">
          <v-flex xs12>
            <v-text-field
              v-model="pageForm.page.pageMessage"
              v-bind:class="{'page-error': !pageForm.page.pageMessage}"
              name="input-1-3"
              label="Add another page"
              single-line></v-text-field>
          </v-flex>
        </form>
        </v-flex>-->
        <v-flex xs12>
          <new-page-cmp v-bind:pages="pages"></new-page-cmp>
        </v-flex>
        <!--<v-speed-dial
          v-model="fab"
          :direction="'right'"
          :transition="'slide-y-reverse-transition'"
        >
          <v-btn
            slot="activator"
            class="blue"
            fab
            hover
            v-model="fab"
          >
            <v-icon>add</v-icon>
            <v-icon>close</v-icon>
          </v-btn>
          <v-btn
            fab
            small
            class="yellow"
          >
            <v-icon>star</v-icon>
          </v-btn>
          <v-btn
            fab
            small
            class="green"
          >
            <v-icon>add</v-icon>
          </v-btn>
        </v-speed-dial>-->
        <!--<new-page-cmp></new-page-cmp>-->
      </v-layout></v-container>
    `,
    mounted() {
      this.getAll();
    },
    methods: {
      getAll() {
        //let pages = localStorage.getItem("pages");
        let pages = browser.storage.sync.get('pages', result => {
          this.pages = result.pages
          console.log(result);
        });
        /*try {
          this.pages = JSON.parse(pages) || [];
        }catch(err) {
          console.error(err);
          this.pages = [];
        };*/
      },
      // add(message) {
      //   if(!IsUrl(message.pageMessage)) return;

      //   this.pages.push({
      //     _id: Math.random() * 2000 + "" + Date.now(),
      //     pageMessage: message.pageMessage
      //   });
      //   localStorage.setItem("pages", JSON.stringify(this.pages));
      //   this.pageForm.page.pageMessage = "";
      // },
      remove(id) {
        this.pages.forEach((page, index) => {
          if (page._id === id) {
            this.pages.splice(index, 1);
          }
        });
        //localStorage.setItem("pages", JSON.stringify(this.pages));
        browser.storage.sync.set({ pages: this.pages });
      },
      navigate(url) {
        browser.runtime.sendMessage({ openTab: url });
        //location.href = url;
      }
    }
  });
}());
