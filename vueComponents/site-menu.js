Vue.component("site-menu", {
  data: function () {
    return {
      sections: [{
        title: "Home",
        page: "/"
        // }, {
        //   title: "Posts",
        //   page: "posts",
        //   path: "posts.js"
      }, {
        title: "Apps",
        page: "/apps"
      }],
    };
  },
  computed: {
    currentPage: function () {
      let matchedPage = this.sections.filter(s => location.pathname.includes(s.page));
      return matchedPage[matchedPage.length-1];
    }
  },
  methods: {
    itemClass: function (item) {
      let cp = false; // current page
      if (this.currentPage.title == item.title) cp = true;
      return {
        "menu-item": true,
        "current": cp
      }
    },
    goto: function (page) {
      location.replace(page);
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
