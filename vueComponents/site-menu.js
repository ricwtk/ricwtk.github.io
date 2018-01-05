Vue.component("site-menu", {
  data: function () {
    return {
      sections: [{
        title: "Home",
        page: "home",
        path: "home.js"
        // }, {
        //   title: "Posts",
        //   page: "posts",
        //   path: "posts.js"
      }, {
        title: "Apps",
        page: "apps",
        path: "apps.js"
      }],
    };
  },
  methods: {
    itemClass: function (item) {
      let cp = false; // current page
      if (globalStore.currentPage == item.page) cp = true;
      return {
        "menu-item": true,
        "current": cp
      }
    },
    goto: function (page) {
      let queryParameters = new URLSearchParams();
      queryParameters.append("page", page);
      location.search = queryParameters.toString();
    }
  },
  template: `
    <div id="site-menu">
      <template v-for="(section, index) in sections">
        <div :class="itemClass(section)" @click="goto(section.page)">{{ section.title }}</div>
        <div class="menu-sep" v-if="index != sections.length-1"></div>
      </template>
    </div>
  `
});
