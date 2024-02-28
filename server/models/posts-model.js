const { Schema, model } = require("mongoose");

const PostSchema = new Schema({
  title: {
    en: { type: String },
    kz: { type: String },
  },
  content: {
    en: { type: String },
    kz: { type: String },
  },
  images: { type: String, required: true },
  registrationDate: { type: String, required: true },
});

module.exports = model("PostSchema", PostSchema);
