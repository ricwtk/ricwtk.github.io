Vue.component("site-head", {
  methods: {
    goHome: () => {
      location = location.origin;
    }
  },
  template: `
    <div id="site-head" @click="goHome()"><img src="icons/icon-white.png">R.ich.ard</div>
  `
})
