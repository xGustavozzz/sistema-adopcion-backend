const router = require("express").Router();
const multer = require("multer");
const auth = require("../middleware/auth");
const authorize = require("../middleware/authorize");
const controller = require("../controllers/mascotaImagen.controller");

const upload = multer({ storage: multer.memoryStorage() });
router.post("/:id/imagenes", auth, authorize("admin"), upload.array("imagenes", 10), controller.createMany);
router.get("/:id/imagenes", controller.getAllByMascota);
router.delete("/:id/imagenes/:imagenId", auth, authorize("admin"), controller.remove);

module.exports = router;
