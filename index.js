import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import conectarDB from "./src/config/db.js";
import usuarioRoutes from "./src/routes/usuarioRoutes.js";

const app = express();
dotenv.config();
conectarDB();
app.use(express.json());

const whiteList = [process.env.FRONTEND_URL, "http://localhost:3000"];
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whiteList.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Error de Cors"));
    }
  },
};

app.use(cors(corsOptions));

app.use("/api/usuarios", usuarioRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});