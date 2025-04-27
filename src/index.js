import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import pokemonRoutes from "./routes/pokemon.js";  // Ajout de l'import pour pokemon.js
import path from 'path';  // Ajout de path pour gérer les chemins

dotenv.config();

const app = express();
const PORT = 3000;

// Utilisation de import.meta.url pour définir __dirname dans un module ES
const __dirname = path.dirname(new URL(import.meta.url).pathname);

// Configuration CORS
app.use(cors({
  origin: "http://localhost:5173",
}));

app.use(express.json());

// Routes d'authentification
app.use("/api/auth", authRoutes);

// Routes Pokémon (ajoutée)
app.use("/api/pokemons", pokemonRoutes);

// Route principale
app.get("/", (req, res) => {
  res.send("Bienvenue sur l'API Pokémon");
});

// Servir les images statiques depuis un dossier accessible
// Si tes images sont dans un dossier "assets/pokemons" dans ton répertoire racine du projet
app.use("/assets", express.static(path.join(__dirname, "../assets")));  // Assure-toi que ce chemin est correct

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
