const fs = require("fs");
const path = require("path");
const postFolder = path.dirname(process.argv[1]);

const template_header = 
`
<head>
  <script async src="https://www.googletagmanager.com/gtag/js?id=UA-38752833-5"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());

    gtag('config', 'UA-38752833-5');
  </script>
  <meta charset="UTF8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta property="og:url" content="https://ricwtk.github.io">
  <meta property="og:title" content="R.ich.ard">
  <meta property="og:description" content="Personal website for Richard Wong">
  <title>R.ich.ard</title>
  <meta name="description" content="Personal website for Richard Wong">
  <meta name="keywords" content="Richard, Wong, Teck, Ken, TeckKen, Teckken, Tekken, Richard Wong">
  <link rel="icon" type="image/png" href="../icons/icon.png?v=1.0">

  <script src="../js/vue.min.js"></script>
  <link rel="stylesheet" type="text/css" href="../font-awesome-4.7.0/css/font-awesome.min.css" />
  <link rel="stylesheet" type="text/css" href="../css/layout.css" />
  <link rel="stylesheet" type="text/css" href="../css/theme.css" />
  <script src="https://cdnjs.cloudflare.com/ajax/libs/showdown/1.7.6/showdown.min.js"></script>
  <style>
    .top-actions {
      margin-top: 2em;
      display: flex;
    }
    .top-actions > * {
      flex-grow: 1;
    }
    .all-post {
      text-align: right;
      cursor: pointer;
    }
    .post-content {
      margin-bottom: 2em;
    }
  </style>
</head>
`

const template_body =
`
<body>
  <header>
    <site-header></site-header>
  </header>

  <div id="content-wrapper">
    <div id="content">
      <div class="top-actions">
        <div class="created-on">{{ createdOn }}</div>
        <div class="all-post" @click="toAllPosts">All posts</div>
      </div>
      <div class="post-content" v-html="compiledContent"></div>
    </div>
  </div>

  <footer>
    <site-foot></site-foot>
  </footer>

  <script>var currentPage = "Posts";</script>
  <script src="../vueComponents/site-header.js"></script>
  <script src="../vueComponents/site-foot.js"></script>
  <script src="../js/initiate-vue.js"></script>
  <script>
    var converter = new showdown.Converter();
    new Vue({
      el: "#content",
      data: {
        content: \`%%%%%content%%%%%\`,
        createdOn: "%%%%%createdOn%%%%%"
      },
      computed: {
        compiledContent: function () {
          return converter.makeHtml(this.content);
        }
      },
      methods: {
        toAllPosts: function () {
          window.open(window.location.origin + "/posts", "_self");
        }
      }
    });
  </script>

</body>
`

fs.readdir(postFolder, (err, files) => {
  if (err) {
    throw err;
  }
  let postSummary = [];
  Promise.all(files.map(file => {
    if (file.endsWith(".md")) {
      let mdfile = path.join(postFolder, file);
      let htmlfile = path.join(postFolder, file.slice(0,-3)+".html");
      return new Promise((resolve, reject) => {
        fs.readFile(mdfile, (err, mddata) => {
          let stats = fs.statSync(mdfile);
          let mdStr = mddata.toString().replace(/`/g, "\\`");
          let lines = mdStr.split("\n");
          let title;
          let createdOn;
          if (lines[0].startsWith("createdOn")) {
            createdOn = new Date(lines[0].split(" ")[1]);
            title = lines[1].replace(/#/g, "").trim();
            mdStr = lines.slice(1).join("\n");
          } else {
            createdOn = stats.birthtime;
            title = lines[0].replace("#", "").trim();
          }
          postSummary.push({
            title: title,
            createdOn: createdOn,
            modifiedOn: stats.mtime,
            name: path.basename(htmlfile)
          });
          let createdOnString = createdOn.getFullYear() + "-"
            + createdOn.getMonth().toString().padStart(2,"0") + "-"
            + createdOn.getDate().toString().padStart(2,"0") + " "
            + createdOn.getHours().toString().padStart(2,"0") + ":"
            + createdOn.getMinutes().toString().padStart(2,"0");
          let data = "<!DOCTYPE html>"
            + "<html>"
            + template_header 
            + template_body.replace("%%%%%content%%%%%", mdStr).replace("%%%%%createdOn%%%%%", createdOnString)
            + "</html>"
          fs.writeFile(htmlfile, data, (err) => {
            if (err) {
              throw err;     
            }
            resolve();
          });
        });
      });
    }
  })).then(() => {
    postSummary.sort((a,b) => a.createdOn < b.createdOn);
    fs.writeFile(path.join(postFolder, "post-summary.js"), 
      "var postSummary = " + JSON.stringify(postSummary, null, 2), 
      (err) => { if (err) throw err; }
    );
  })
}
);