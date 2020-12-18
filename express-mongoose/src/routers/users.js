// Import des modules
const express = require("express")
const User = require("../../models/user")

// Création du router
const router = new express.Router()

// Création des routes
router.post("/users", async (req, res) => {
	try {
		const newUser = new User(req.body)
		const document = await newUser.save()
		res.status(201).json(document)
	} catch {
		res.status(500).send("Erreur lors de l'ajout de l'utilisateur")
	}
})

// Export du module
module.exports = router