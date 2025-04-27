import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { readUsers, writeUsers } from "../data/users.js";

const router = express.Router();

// Inscription
router.post("/register", async (req, res) => {
    const { email, password } = req.body;
    const users = readUsers();

    const userExists = users.find((u) => u.email === email);
    if (userExists) {
        return res.status(400).json({ message: "Utilisateur déjà existant" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = { id: Date.now(), email, password: hashedPassword };
    users.push(newUser);
    writeUsers(users);

    res.status(201).json({ message: "Utilisateur créé avec succès" });
});

// Connexion
router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const users = readUsers();

    const user = users.find((u) => u.email === email);
    if (!user) {
        return res.status(400).json({ message: "Email ou mot de passe incorrect" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(400).json({ message: "Email ou mot de passe incorrect" });
    }

    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
        expiresIn: "1h",
    });

    res.status(200).json({ token });
});

export default router;
