import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
}, { timestamps: true });

userSchema.methods.matchPassword = async function (enteredPassword) {
  // Plain text comparison (for development only)
  return enteredPassword === this.password;
};

const User = mongoose.model("User", userSchema);
export default User;
