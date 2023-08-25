const axios = require("axios");
const express = require("express");
const app = express();
const path = require("path");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

app.get("/", function (req, res) {
  res.render("index", req.query);
});

app.get("/about-us", function (req, res) {
  res.render("about_us", req.query);
});

app.get("/village", function (req, res) {
  // let city = req.params.city;
  let city = req.query.city;

  axios
    .get(
      `https://www.google.com/search?sxsrf=AB5stBg3QWELLCgkw9U3CIsHx9eMOXWIvQ:1688968466328&q=город+${city}&tbm=isch&sa=X&ved=2ahUKEwiLqePruYOAAxXmFhAIHQ1zB3oQ0pQJegQICBAB&biw=3440&bih=1329&dpr=1\\n`,
      {
        params: {
          city: city,
        },
      }
    )
    .then((response) => {
      console.log(response.data);
      res.json(response.data);
    });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log("Listening on " + port));
