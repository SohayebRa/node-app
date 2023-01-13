import { Schema, model } from "mongoose";

const usersSchema = new Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
  },
  name: {
    type: String,
    required: "Ajoutez votre prenom",
  },
  password: {
    type: String,
    required: true,
  },
});

export default model("Users", usersSchema);
