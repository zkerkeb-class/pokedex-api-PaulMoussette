import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const usersFilePath = path.join(__dirname, "users.json");

// Lire les utilisateurs
export function readUsers() {
    try {
        const data = fs.readFileSync(usersFilePath, "utf8");
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
}

// Écrire les utilisateurs
export function writeUsers(users) {
    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
}
