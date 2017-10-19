let appList = [{
  name: "Sync Saved Windows",
  description: "A Mozilla Firefox add-on inspired by TabCloud to save opened windows and restore the windows. The feature to synchronise saved windows list across devices is yet to be implemented.",
  url: "//addons.mozilla.org/en-GB/firefox/addon/sync-saved-windows/"
}, {
  name: "Prayer Partners",
  description: "A web app to allow users to create personal prayer items and share prayer items with others using Gmail and Google Drive App Folder. Work is in progress to use Amazon Web Services DynamoDB to remove the requirement of the permission to read emails in Gmail inbox.",
  url: "/prayerpartners"
}, {
  name: "Bible Verse LaTex Formatter",
  description: "[Not implemented ... yet] A web app to format Bible Verse to be included as part of a LaTex document.",
  url: null
}];

Vue.component("app-box", {
  props: ['app'],
  methods: {
    openurl: function () {
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