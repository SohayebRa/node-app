import { Router } from "express";
const router = Router();

import clientController from "../controllers/clientController";
import {
  uploadFile,
  newProduct,
  viewProducts,
  viewProduct,
  updateProduct,
  deleteProduct,
  findProducto,
} from "../controllers/productsController";

import {
  newOrder,
  viewOrders,
  viewOrder,
  updateOrder,
  deleteOrder,
} from "../controllers/ordersController";

import {
  registrarUsuario,
  autenticarUsuario,
} from "../controllers/usersController";

// Middleware pour proteger les routes
import auth from "../middleware/auth";

export default function () {
  // Ajouter des nouveaux clients via POST
  router.post("/clients", clientController.newClient);

  // Voir tous les clients
  router.get("/clients", clientController.viewClients);

  // Voir un client par son (ID)
  router.get("/clients/:idClient", clientController.viewClient);

  // Mettre à jour un client
  router.put("/clients/:idClient", clientController.updateClient);

  // Effacer un client
  router.delete("/clients/:idClient", clientController.deleteClient);

  /** PRODUCTOS */
  // nuevos productos
  router.post("/productos", uploadFile, newProduct);

  // Muestra todos los productos
  router.get("/productos", viewProducts);

  // muestra un producto en especifico por su ID
  router.get("/productos/:idProducto", viewProduct);

  // Actualizar Productos
  router.put("/productos/:idProducto", uploadFile, updateProduct);

  // Eliminar Productos
  router.delete("/productos/:idProducto", deleteProduct);

  // Busqueda de Productos
  router.post("/productos/busqueda/:query", findProducto);

  /*** ORDERS */
  // Ajouter une nouvelle demande
  router.post("/orders/new/:idUsuario", newOrder);

  // Voir toutes les demandes
  router.get("/orders", viewOrders);

  // Voir une demande par son ID
  router.get("/orders/:idOrder", viewOrder);

  // Mettre à jour la demande via ID
  router.put("/orders/:idOrder", updateOrder);

  // Effacer une demande par son ID
  router.delete("/orders/:idOrder", deleteOrder);

  // Utilisateur
  router.post("/signup", auth, registerUser);

  router.post("/login", authenticatUser);

  return router;
}
