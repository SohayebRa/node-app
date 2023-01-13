import Clients, {
  find,
  findById,
  findOneAndUpdate,
  findOneAndDelete,
} from "../models/Clients";

// Ajouter un nouveau client
export async function newClient(req, res, next) {
  const client = new Clients(req.body);

  try {
    await client.save();
    res.json({ msg: "Nouveau client ajouté" });
  } catch (error) {
    res.send(error);
    next();
  }
}

// Voir tous les clients
export async function viewClients(req, res, next) {
  try {
    const clients = await find({});
    res.json(clients);
  } catch (error) {
    console.log(error);
    next();
  }
}

// Voir un client par son ID
export async function viewClient(req, res, next) {
  const client = await findById(req.params.idClient);

  if (!client) {
    res.json({ msg: "Ce client n'existe pas" });
    next();
  }
  res.json(client);
}

// Mettre à jour un client par son ID
export async function updateClient(req, res, next) {
  try {
    const client = await findOneAndUpdate(
      { _id: req.params.idClient },
      req.body,
      {
        new: true,
      }
    );
    res.json(client);
  } catch (error) {
    res.send(error);
    next();
  }
}

// Effacer un client par son ID
export async function deleteClient(req, res, next) {
  try {
    await findOneAndDelete({ _id: req.params.idClient });
    res.json({ msg: "El client se ha eliminado" });
  } catch (error) {
    console.log(error);
    next();
  }
}
