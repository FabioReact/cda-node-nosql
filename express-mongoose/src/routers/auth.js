// Import des modules
const express = require("express")
const argon2 = require("argon2")
const User = require("../../models/user")

// Création du router
const router = new express.Router()

// Création des routes
router.post("/login", async (req, res) => {
	try {
		const { username, password } = req.body
		const user = await User.findOne({username})
		if (!user) {
			console.log("Utilisateur inconnu")
			return res.status(401).send("Erreur de mot de passe et/ou d'username")
		}
		const match = await argon2.verify(user.password, password)
		if (!match) {
			console.log("Erreur de mdp")
			return res.status(401).send("Erreur de mot de passe et/ou d'username")
		}
		res.send("Login success")
	} catch (e) {
		console.log(e)
		res.status(500).send("Erreur lors du login")
	}
})

// Export du module
module.exports = router