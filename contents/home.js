function home_main() {
  let md = getMdConverter();
  getContent("home.md").then(res => {
    globalStore.mainContent = md.makeHtml(res);
  }, err => {
    getContent("nopage.md").then(res => {
      globalStore.mainContent = md.makeHtml(res);
    })
  });
}

home_main();