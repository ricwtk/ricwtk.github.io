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
        <div class="app-title" v-html="app.name"></div>
        <div class="app-action fa fa-angle-right"  @click="openurl()"></div>
        <div class="app-content">{{ app.description }}</div>
      </div>
    </div>
  `
});
