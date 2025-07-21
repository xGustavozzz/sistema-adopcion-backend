const imgModel = require('../models/mascotaImagen.model');
const service = require('../services/mascota.service');

exports.createMany = async (req, res) => {
  const id = parseInt(req.params.id,10);
  const files = req.files;
  if (!files?.length) {
    return res.status(400).json({ error: 'Sube al menos una imagen' });
  }
  // 1) Saber desde qué ordenes arrancar
  const maxOrden = await imgModel.getMaxOrden(id);

 // 2) Insertar cada archivo con orden = maxOrden + idx + 1
  const results = await Promise.all(
    files.map((file, idx) =>
      imgModel.insert(id, file.buffer, maxOrden + idx + 1)
    )
  );

  res.status(201).json(results);
};

exports.getAllByMascota = async (req, res) => {
  const id = parseInt(req.params.id,10);
  const imgs = await imgModel.findByMascota(id);
  res.json(imgs);
};

/*exports.removeOne = async (req, res) => {
  const { id, imagenId } = req.params;
  await imgModel.remove(imagenId);  // implementa remove(id_imagen)
  res.status(204).send();
};*/

exports.remove = async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const deleted = await service.deleteMascota(id);
  if (!deleted) {
    return res.status(404).json({ message: "Mascota not found" });
  }
  // Las imágenes asociadas se eliminan automáticamente en la base de datos
  res.status(204).send();
};

exports.removeImage = async (req, res) => {
  try {
    const id_mascota = parseInt(req.params.id, 10);
    const imagenId  = parseInt(req.params.imagenId, 10);

    // 1) Borrar la imagen
    const deleted = await imgModel.removeById(imagenId);
    if (!deleted) {
      return res.status(404).json({ message: 'Imagen no encontrada' });
    }

    // 2) Reordenar las que quedan
    await imgModel.reorder(id_mascota);

    // 3) Responder
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
