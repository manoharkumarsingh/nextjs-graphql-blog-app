import mongoose from "mongoose";

const quoteSchema = new mongoose.Schema({
  name: {
    type: "String",
    required: true,
  },
  by: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
});

const Quote = mongoose.models.Quote || mongoose.model("Quote", quoteSchema);
export default Quote;
