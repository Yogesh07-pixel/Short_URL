const express = require("express");
const urlRoute = require("./routes/url");
const URL = require("./models/Url");
const { ConnectToMongoDB } = require("./connection");
const app = express();
const PORT = 8001;

app.use(express.json());

ConnectToMongoDB("mongodb://127.0.0.1:27017/short-url").then(() => {
  console.log("MongoDB connected Successfully!");
});

app.use("/url", urlRoute);
app.get("/:shortId", async (req, res) => {
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
