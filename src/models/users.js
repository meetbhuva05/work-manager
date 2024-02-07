import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String
  },
  email: {
    type: String,
    unique: true,
    required: [true, "Email Required!"],
  },
  password: {
    type: String,
    required: [true, "Password Required!"]
  },
  about: {
    type: String
  },
  progileUrl: {
    type: String
  }
}, {
  toJSON: {
    transform(_, ret) {
      delete ret.password;
      delete ret.__v;
    }
  }
})

export const User = mongoose.models.users || mongoose.model("users", userSchema)