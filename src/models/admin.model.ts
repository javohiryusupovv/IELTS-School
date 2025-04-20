import { Schema, model, models } from "mongoose";

const adminSchema = new Schema({
  login: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const Admin = models.Admin || model("Admin", adminSchema);

export default Admin;
