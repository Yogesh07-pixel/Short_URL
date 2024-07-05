const express = require("express");
const urlRoute = require("./routes/url");
const path = require("path");
const URL = require("./models/Url");
const staticRoute = require("./routes/staticRouter");
const { ConnectToMongoDB } = require("./connection");
const app = express();
const PORT = 8001;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

ConnectToMongoDB("mongodb://127.0.0.1:27017/short-url").then(() => {
  console.log("MongoDB connected Successfully!");
});

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use("/url", urlRoute);

app.use("/", staticRoute);

app.get("/url/:shortId", async (req, res) => {
  shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visitHistory: { timestamp: Date.now() },
      },
    }
  );
  return res.redirect(entry.redirectURL);
});

app.listen(PORT, () => {
  console.log(`Server Started on PORT: ${PORT}`);
});
