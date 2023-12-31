import express from "express"
import dotenv from "dotenv"
import conectarDB from "./config/db.js"
import cors from "cors";
import veterinarioRoutes from "./routes/veterinarioRoutes.js";
import pacienteRoutes from "./routes/pacienteRoutes.js";


const app = express();
app.use(express.json())

dotenv.config();
conectarDB();

const dominiosPermitidos = [process.env.FRONTEND_URL, 'http://localhost:5173'];

const corsOptions = {
    origin: function (origin, callback) {
        if (dominiosPermitidos.indexOf(origin) !== -1) {
            // El origen del Request está permitido
            callback(null, true);
        } else {
            callback(new Error('No permitido por CORS'));
        }
    }
}
app.use(cors(corsOptions));

app.use("/api/veterinarios", veterinarioRoutes);
app.use("/api/pacientes", pacienteRoutes);

const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
    console.log(`Servidor funcionando en puerto ${PORT}`)
});

// Ejecutar con npm run dev
