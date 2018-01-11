Vue.component("site-header", {
  data: function () {
    return {
      style: {
        wrapper: {
          "display": "flex",
          "flex-direction": "row",
          "justify-content": "space-between",
          "flex-grow": "1"
        },
        title: {
          "cursor": "pointer",
          "display": "flex",
          "align-items": "center"
        },
        img: {
          "height": "1em",
          "margin-right": "3px"
        },
        menu: {
          "display": "flex",
          "flex-direction": "row",
          "flex-grow": "1",
          "justify-content": "flex-end"
        },
        menuItem: {
          "text-align": "center",
          "cursor": "pointer",
          "padding": "5px"
        }
      },
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
    goHome: () => {
      window.open("/", "_self");
    },
    itemClass: function (item) {
      let cp = false; // current page
      if (currentPage == item.title) cp = true;
      return {
        "menu-item": true,
        "current": cp
      }
    },
    goto: function (page) {
      window.open(page, "_self");
    }
  },
  template: `
  <div :style="style.wrapper">
    <div id="site-head" :style="style.title" @click="goHome()"><img src="icons/icon-white.png" :style="style.img">R.ich.ard</div>
    <div id="site-menu" :style="style.menu">
      <template v-for="(section, index) in sections">
        <div :class="itemClass(section)" @click="goto(section.page)" :style="style.menuItem">{{ section.title }}</div>
        <div class="menu-sep" v-if="index != sections.length-1" :style="style.menuItem">|</div>
      </template>
    </div>
  </div>
  `
})
