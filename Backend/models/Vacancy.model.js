const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const newVacancy = new Schema(
  {
    vacancy: {
      type: String,
      required: true,
    },
    project: {
      type: Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      requied: true,
    },
    skills: {
      type: String,
      requied: true,
    },
  },
  {
    timestamps: true,
  }
);

const Vacancy = mongoose.model("Vacancy", newVacancy);

module.exports = Vacancy;
