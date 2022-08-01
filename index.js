require("dotenv").config();

const app = require("express")();

const port = process.env.PORT;

require("./src/routes/benefits")(app);

app.get("/ping", (req, res) => {
  res.send("Server on");
});

app.listen(port, () => {
  console.log(`Serve ON, PORT: ${process.env.PORT}`);
});
