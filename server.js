const express = require("express");
const connectDB = require("./db");
const authenticate = require("./middleware/authenticate");
const routes = require("./routes");

const app = express();
app.use(express.json());
app.use(routes);

app.get("/", (req, res) => {
  const obj = {
    name: "Ayman",
    email: "ayman@example.com",
  };
  res.json(obj);
});

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({ message: "Server error occured" });
});

app.get("/private", authenticate, async (req, res) => {
  return res.status(200).json({ message: "i am a Private Route" });
});
app.get("/public", (req, res) => {
  return res.status(200).json({ message: "I am a public route" });
});

connectDB(
  "mongodb+srv://attendance-app:Sk5PkYLj541twUqs@cluster0.48q4yql.mongodb.net/?retryWrites=true&w=majority"
)
  .then(() => {
    console.log("Database connected successfully");
    app.listen(4000, () => {
      console.log("I'm listening on port 4000");
    });
  })
  .catch((e) => {
    console.log(e);
  });
