import mongoose from "mongoose";

const contractSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (v: any): boolean {
        return /^[a-zA-Z0-9]+$/.test(v);
      },
      message: "Name must be a string",
    },
    created_at: {
      type: Date,
      required: true,
    },
    expires_at: {
      type: Date,
      required: true,
    },
  },
});

const contract = mongoose.model("Contract", contractSchema);

export { contract as Contract };
