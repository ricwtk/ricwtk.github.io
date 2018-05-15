Vue.component("app-box", {
  props: ['app'],
  data: function () {
    return {
      showDetails: false
    }
  },
  computed: {
    toggleIcon: function () {
      if (this.showDetails) return "fa-angle-up";
      else return "fa-angle-down";
    }
  },
  methods: {
    openurl: function() {
      if (this.app.url !== null)
        window.open(this.app.url, "_blank");
    },
    toggleDetails: function () {
      this.showDetails = !this.showDetails;
    },
  },
  template: `
    <div class="app-wrapper">
      <div class="app-head" @click="toggleDetails">
        <img v-if="app.icon" :src="app.icon" class="app-icon">
        <div class="app-title">{{ app.name }}</div>
        <div class="app-actions">
          <div class="app-action fa fa-external-link" @click.stop="openurl"></div>
          <div :class="['app-action', 'fa', toggleIcon]" @click="toggleDetails"></div>
        </div>
      </div>
      <div class="app-details" v-if="showDetails">
        {{ app.description }}
      </div>
    </div>
  `
});

{/* <div class="app-wrapper">
  <div class="app">
    <div class="app-title" v-html="app.name"></div>
    <div class="app-action fa fa-angle-right"  @click="openurl()"></div>
    <div class="app-content">{{ app.description }}</div>
    <div class="app-tags" v-if="app.tags">
      tags:
      <span class="app-tag" v-for="tag in app.tags" v-html="tag"></span>
    </div>
  </div>
</div> */}