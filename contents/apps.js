let appList = [{
  name: "Sync Saved Windows",
  description: "An extension (Firefox and Chrome) to save opened windows and synchronise them across devices. Sync Saved Windows allows you to save your windows with multiple tabs and synchronise using your Google account. You no longer have to always leave the tabs open and you can organise your tabs into different windows.",
  url: "/sync-saved-windows"

}, {
  name: "Prayer Partners",
  description: "A web app to allow users to create personal prayer items and share prayer items with others. One can sign up using a Google Plus or Facebook account. Amazon Web Services DynamoDB is used for database storage and communication between users.",
  url: "/prayerpartners"
}, {
  name: "Bible Verse LaTex Formatter",
  description: "[Not implemented ... yet] A web app to format Bible Verse to be included as part of a LaTex document.",
  url: null
}, {
  name: "Markdown Note",
  description: "[Not implemented ... yet] A web app to create notes that support plain text, markdown syntax, and HTML syntax.",
  url: null
}];

Vue.component("app-box", {
  props: ['app'],
  methods: {
    openurl: function() {
      if (this.app.url !== null)
        window.open(this.app.url, "_blank");
    }
  },
  template: `
    <div class="app-wrapper">
      <div class="app">
        <div class="app-title" @click="openurl()">{{ app.name }}</div>
        <div class="app-content">{{ app.description }}</div>
      </div>
    </div>
  `
})

function apps_main() {
  globalStore.mainContent = `
    <div id="app-list">
      <template v-for="app in appList">
        <app-box :app=app></app-box>
      </template>
    </div>
  `

  Vue.nextTick(() => {
    new Vue({
      el: "#app-list",
      data: {
        appList: appList
      }
    });
  })
}

apps_main();