const mongoose = require("mongoose");

const careersSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    message: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Career = mongoose.model("Career", careersSchema);

module.exports = Career;
