const { Router } = require("express");

const router = Router();

router.post("/load", (req, res) => {
  console.log(req.body);
  res
    .status(200)
    .send({ result: "Файл успешно загружен", file: req.body.json });
});

module.exports = router;
