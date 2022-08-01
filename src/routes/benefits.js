const router = require("express").Router();
const seekCustomerBenefits = require("./../services/seekCustomerBenefits");

router.get("/v1/benefits", async (req, res) => {
  try {
    const query = req.query;

    if (!query.cpf || !query.user || !query.password) {
      return res.status(422).send("Server on");
    }

    const giftNumber = await seekCustomerBenefits({
      cpf: query.cpf,
      user: query.user,
      password: query.password,
    });

    return res.status(200).send({ giftNumber });
  } catch (error) {
    console.log(">>> error", error);
    return res
      .status(error.statusCode || 400)
      .send(error.showMessage || "There was a problem on the server");
  }
});

module.exports = (app) => app.use("/", router);
