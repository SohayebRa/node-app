import Products, {
  find,
  findById,
  findOneAndUpdate,
  findByIdAndDelete,
} from "../models/Products";

import multer, { diskStorage } from "multer";
import { generate } from "shortid";

const configMulter = {
  storage: (fileStorage = diskStorage({
    destination: (req, file, cb) => {
      cb(null, __dirname + "../../uploads/");
    },
    filename: (req, file, cb) => {
      const extension = file.mimetype.split("/")[1];
      cb(null, `${generate()}.${extension}`);
    },
  })),
  fileFilter(req, file, cb) {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
      cb(null, true);
    } else {
      cb(new Error("Format du fichier non valide"));
    }
  },
};

const upload = multer(configMulter).single("image");

// Charger un fichier
export function uploadFile(req, res, next) {
  upload(req, res, function (error) {
    if (error) {
      res.json({ msg: error });
    }
    return next();
  });
}

// Ajouter nouveau produits
export async function newProduct(req, res, next) {
  const product = new Products(req.body);

  try {
    if (req.file.filename) {
      product.image = req.file.filename;
    }
    await product.save();
    res.json({ msg: "Un nouveau produit à été ajouté" });
  } catch (error) {
    console.log(error);
    next();
  }
}

// Voir tous les produits
export async function viewProducts(req, res, next) {
  try {
    const products = await find({});
    res.json(products);
  } catch (error) {
    console.log(error);
    next();
  }
}

// Voir un produit par son ID
export async function viewProduct(req, res, next) {
  const product = await findById(req.params.idProduct);

  if (!product) {
    res.json({ msg: "Ce produit n'existe pas" });
    return next();
  }
  res.json(product);
}

// Mettre à jour un produit via ID
export async function updateProduct(req, res, next) {
  try {
    let newProduct = req.body;

    if (req.file) {
      newProduct.image = req.file.filename;
    } else {
      let productoAnterior = await findById(req.params.idProduct);
      newProduct.image = productoAnterior.image;
    }

    let product = await findOneAndUpdate(
      { _id: req.params.idProduct },
      newProduct,
      {
        new: true,
      }
    );

    res.json(product);
  } catch (error) {
    console.log(error);
    next();
  }
}

// Supprimer produit par son ID
export async function deleteProduct(req, res, next) {
  try {
    await findByIdAndDelete({ _id: req.params.idProduct });
    res.json({ msg: "Un produit à été supprimé" });
  } catch (error) {
    console.log(error);
    next();
  }
}

export async function findProducto(req, res, next) {
  try {
    // Obtenir le query
    const { query } = req.params;
    const product = await find({ name: new RegExp(query, "i") });
    res.json(product);
  } catch (error) {
    console.log(error);
    next();
  }
}
