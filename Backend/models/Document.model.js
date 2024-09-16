const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const documentSchema = new Schema(
  {
    docName: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },
  },

  {
    timestamps: true,
  }
);

module.exports = Document = mongoose.model("Documents", documentSchema);
