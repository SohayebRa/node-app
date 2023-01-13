import Orders, {
  find,
  findById,
  findOneAndUpdate,
  findOneAndDelete,
} from "../models/Orders";

// Ajouter une nouvelle demande
export async function newOrder(req, res, next) {
  const order = new Orders(req.body);
  try {
    await order.save();
    res.json({ msg: "Une nouvelle demande à été enregistré" });
  } catch (error) {
    console.log(error);
    next();
  }
}

// Voir toutes les demandes
export async function viewOrders(req, res, next) {
  try {
    const orders = await find({}).populate("client").populate({
      path: "order.product",
      model: "Products",
    });

    res.json(orders);
  } catch (error) {
    console.log(error);
    next();
  }
}

// Voir une demande par son ID
export async function viewOrder(req, res, next) {
  const order = await findById(req.params.idOrder).populate("client").populate({
    path: "order.product",
    model: "Products",
  });

  if (!order) {
    res.json({ msg: "Cette demande n'existe pas" });
    return next();
  }
  res.json(order);
}

// Mettre à jour la demande via ID
export async function updateOrder(req, res, next) {
  try {
    let order = await findOneAndUpdate({ _id: req.params.idOrder }, req.body, {
      new: true,
    })
      .populate("client")
      .populate({
        path: "order.product",
        model: "Products",
      });

    res.json(order);
  } catch (error) {
    console.log(error);
    next();
  }
}

// Effacer une demande par son ID
export async function deleteOrder(req, res, next) {
  try {
    await findOneAndDelete({ _id: req.params.idOrder });
    res.json({ msg: "La demande à été supprimer" });
  } catch (error) {
    console.log(error);
    next();
  }
}
