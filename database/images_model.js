const { Schema, model } = require("mongoose");

const imageSchema = new Schema({
  ma_can_ho: String,
  du_an: String,
  hinh_anh: String,
});

const imageModel = model("images", imageSchema);
module.exports = imageModel;
