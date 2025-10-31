var express = require("express");
const imageModel = require("../database/images_model");
var router = express.Router();

function convertCode(input) {
  let [prefix, suffix] = input.split(".");
  if (!suffix) return input.toLowerCase();
  let first = suffix[0];
  let lastTwo = suffix.slice(-2);
  let middle = suffix.length > 3 ? "x" : "";
  return prefix.toLowerCase() + "." + first + middle + lastTwo;
}

router.get("/image/:id", async function (req, res) {
  const id = req.params.id;
  try {
    const [imagesData] = await imageModel.find({ _id: id });
    const ma_can_ho = convertCode(imagesData.ma_can_ho);
    const listImages = Array.from(
      { length: imagesData.hinh_anh },
      (_, i) => `https://my-app-chi-smoky.vercel.app/images/${id}/${i + 1}.jpg`
    );

    return res.render("index", {
      du_an: imagesData.du_an,
      ma_can_ho: ma_can_ho,
      hinh_anh: listImages,
    });
  } catch (error) {
    console.error(error);
    return res.render("error", error);
  }
});

module.exports = router;
