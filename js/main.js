var globalStore = new Vue({
  data: {
    currentPage: "home",
    pages: [{
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
    mainContent: ""
  }
});

var headerVue = new Vue({
  el: "header"
});

var contentVue = new Vue({
  el: "#content-wrapper",
  computed: {
    mainContent: () => globalStore.mainContent
  }
})

var footerVue = new Vue({
  el: "footer",
  data: {
    content: ""
  }
})

function getContent(filename) {
  let req = new Request("./contents/" + filename);
  return fetch(req).then(res => {
    if (res.ok) {
      let contentType = res.headers.get("Content-Type");
      if (contentType.includes("json")) {
        return res.json();
      } else {
        return res.text();
      }
    } else {
      throw new Error(res.text());
    }
  });
}

// showdown.extension('externalLink', function () {
//   return {
//     type: 'lang',
//     regex: '/(<a.[^(><.)]+\/\/.[^(><.)]+>)/g',
//     replace: '$1'
//   }
// });

function getMdConverter() {
  return new showdown.Converter({
    tables: true
  });
}

var queryParameters = new URLSearchParams(window.location.search);
globalStore.currentPage = queryParameters.get("page") ? queryParameters.get("page") : globalStore.currentPage;
cpData = globalStore.pages.find(el => {
  return el.page == globalStore.currentPage;
});

["footer.js", cpData.path].forEach((item, idx, arr) => {
  var el = document.createElement("script");
  el.src = "contents/" + item;
  document.body.appendChild(el);
});