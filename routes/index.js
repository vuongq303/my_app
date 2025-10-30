var express = require("express");
const imageModel = require("../database/images_model");
var router = express.Router();

router.get("/image/:id", async function (req, res) {
  const id = req.params.id;
  try {
    const [imagesData] = await imageModel.find({ _id: id });
    const ma_can_ho = imagesData.ma_can_ho.replace(
      /^(\w\.\d)\d(\d{2})$/,
      "$1x$2"
    );
    const image = imagesData.hinh_anh.split(",");
    const listImages = image.map(
      (img) => `https://my-app-chi-smoky.vercel.app/images/${id}/${img}`
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
