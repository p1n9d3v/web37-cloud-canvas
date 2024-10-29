import express from "express";

const app = express();
const PORT = process.env.PORT || 9991;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Home Server");
});

app.get("/api", (req, res) => {
  res.send("Api Server");
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
