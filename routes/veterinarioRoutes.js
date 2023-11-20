import express from "express";
import {
    registrar, perfil,
    confirmar, autenticar, olvidePassword, comprobarToken,
    nuevoPassword
} from "../controllers/veterinarioControllers.js"
import checkAuth from "../middleware/authMiddleware.js";

const router = express.Router();

// Rutas públicas
router.post("/", registrar);
router.get("/confirmar/:token", confirmar);
router.post("/login", autenticar);
router.post("/olvide-password", olvidePassword);
// router.get("/olvide-password/:token", comprobarToken);
// router.post("/olvide-password/:token", nuevoPassword);
// Simplificando las líneas de arriba
router.route("/olvide-password/:token").get(comprobarToken).post(nuevoPassword);

// Rutas protegidas
router.get("/perfil", checkAuth, perfil);

export default router;
