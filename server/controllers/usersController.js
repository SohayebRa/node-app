import Users from "../models/Users";
import { sign } from "jsonwebtoken";
import { hash, compareSync } from "bcrypt";

export async function registerUser(req, res) {
  const user = new Users(req.body);
  user.password = await hash(req.body.password, 12);
  try {
    await user.save();
    res.json({ msg: "Utilisateur crée avec succés" });
  } catch (error) {
    console.log(error);
    res.json({ msg: "Une erreur est survenu" });
  }
}

export async function authenticatUser(req, res, next) {
  // Trouver l'utilisateur
  const { email, password } = req.body;
  const user = await Users.findOne({ email });

  if (!user) {
    await res.status(401).json({ msg: "Cette utilisateur n'existe pas" });
    next();
  } else {
    if (!compareSync(password, user.password)) {
      await res.status(401).json({ msg: "Password Incorrect" });
      next();
    } else {
      const token = sign(
        {
          email: user.email,
          nombre: user.nombre,
          id: user._id,
        },
        "MOTSECRET",
        {
          expiresIn: "1h",
        }
      );
      res.json({ token });
    }
  }
}
