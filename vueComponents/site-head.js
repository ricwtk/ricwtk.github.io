Vue.component("site-head", {
  methods: {
    goHome: () => {
      location = location.origin;
    }
  },
  template: `
    <div id="site-head" @click="goHome()">R.ich.ard</div>
  `
})