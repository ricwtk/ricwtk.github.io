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
        <div class="app-tags" v-if="app.tags">
          tags:
          <span class="app-tag" v-for="tag in app.tags" v-html="tag"></span>
        </div>
      </div>
    </div>
  `
});
