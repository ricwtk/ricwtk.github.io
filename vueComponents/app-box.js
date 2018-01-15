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
        <div class="app-title" @click="openurl()" v-html="app.name"></div>
        <div class="app-content">{{ app.description }}</div>
      </div>
    </div>
  `
});
