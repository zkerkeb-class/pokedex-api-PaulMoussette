import express from "express";
import pokemonsList from "../data/pokemonsList.js";
import { authenticateToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// Route protégée pour récupérer les pokémons
router.get("/", authenticateToken, (req, res) => {
    const pokemonsWithImage = pokemonsList.map(pokemon => ({
        ...pokemon,
        name: pokemon.name.english.toLowerCase(),  // Utilise .english ou une autre langue selon ton choix
        image: `${process.env.API_URL}/assets/pokemons/${pokemon.id}.png`  // Utilise l'ID du Pokémon pour l'image
    }));
    res.status(200).send({
        pokemons: pokemonsWithImage
    });
});

export default router;
