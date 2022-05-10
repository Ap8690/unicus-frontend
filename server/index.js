const express = require("express");
const axios = require("axios");
const fs = require("fs");
const app = express();
const path = require("path");
const xss = require("xss-clean");
const helmet = require("helmet");

const PORT = process.env.PORT || 3000;
const indexPath = path.resolve(__dirname, "..", "build", "index.html");

const BASE_URL =
  process.env.REACT_APP_ENV === "local"
    ? "http://localhost:4000"
    : process.env.REACT_APP_ENV === "development"
    ? "https://unicus-storefront-backend-test.herokuapp.com"
    : process.env.REACT_APP_ENV === "staging"
    ? "https://backend.qa.unicus.one"
    : process.env.REACT_APP_ENV === "demo"
    ? "https://unicus-storefront-backend-demo.herokuapp.com"
    : "https://unicus-storefront-backend.herokuapp.com";
// static resources should just be served as they are

app.use(
  express.static(path.resolve(__dirname, "..", "build"), { maxAge: "30d" })
);
app.listen(PORT, (error) => {
  if (error) {
    return console.log("Error during app startup", error);
  }
  console.log("listening on " + PORT + "...");
});

if (process.env.NODE_ENV === "prod" || process.env.NODE_ENV === "staging") {
  app.use((req, res, next) => {
    if (req.header("x-forwarded-proto") !== "https")
      res.redirect(`https://${req.header("host")}${req.url}`);
    else next();
  });
}

// here we serve the index.html page
app.get("/*", (req, res, next) => {
  try {
    const location = req.originalUrl;
    console.log("query", "loc=", location, req.hostname, req.path);
    // TODO get post info
    if (
      location.split("/").length > 2 &&
      (location.split("/")[1] === "nft" ||
        location.split("/")[1] === "sale" ||
        location.split("/")[1]=== "auction")
    ) {
      fs.readFile(indexPath, "utf8", async (err, htmlData) => {
        if (err) {
          console.error("Error during file readings", err);
          return res.status(404).end();
        }

        let post = await fetchItem(location, req.hostname);
        console.log("post", post);
        if (!post) return res.status(404).send("Post not found");

        // inject meta tags
        htmlData = htmlData
          .replaceAll("__META_OG_TITLE__", post.name)
          .replaceAll("__META_OG_URL__", `${req.hostname}${location}`)
          .replaceAll("__META_OG_DESCRIPTION__", post.description)
          .replaceAll("__META_DESCRIPTION__", post.description)
          .replaceAll(
            "__META_OG_IMAGE__",
            post.cloudinaryUrl.replace("http://", "https://")
          );

        return res.send(htmlData);
      });
    } else res.sendFile(indexPath);
  } catch (err) {
    console.log("err", err.response);
  }
});

const fetchItem = async (location, hostname) => {
  try {
    axios.defaults.headers.common["Origin"] = hostname;
    if (location.split("/")[1] === "sale") {
      const auc = await axios.get(
        `${BASE_URL}/auction/getAuctionById/${location.split("/").pop()}/${
          location.split("/")[2]
        }`
      );
      const res = await axios.get(
        `${BASE_URL}/nft/getNftById/${auc.data[0].tokenId}/${"none"}/${
          location.split("/")[2]
        }`
      );
      console.log("res1", res.data.nft);
      return res.data.nft;
    } else if (location.split("/")[1] === "nft") {
      const res = await axios.get(
        `${BASE_URL}/nft/getNftById/${location.split("/").pop()}/${"none"}/${
          location.split("/")[2]
        }`
      );

      console.log("res2", res.data.nft);
      return res.data.nft;
    } else {
      const auc = await axios.get(
        `${BASE_URL}/auction/getAuctionById/${location.split("/").pop()}/${
          location.split("/")[2]
        }`
      );
      const res = await axios.get(
        `${BASE_URL}/nft/getNftById/${auc.data[0].tokenId}/${"none"}/${
          location.split("/")[2]
        }`
      );
      console.log("res1", res.data.nft);
      return res.data.nft;
    }
  } catch (err) {
    console.log(err.response);
  }
};
