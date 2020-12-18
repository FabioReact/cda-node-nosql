// Importation des modules
const express = require("express")
const mongoose = require("mongoose")
const Movie = require("../models/movie")
require("dotenv").config()
// const dotenv = require('dotenv')
// dotenv.config()

// Connexion à la bdd Atlas:
const optionsMongoose = { useNewUrlParser: true, useUnifiedTopology: true }
mongoose
	.connect(process.env.CONNECTION_URI, optionsMongoose)
	.then(() => {
		console.log("Connexion à Atlas réussie")
	})
	.catch(() => {
		console.log("Connexion à Atlas échoué")
	})

// Inititalisation des variables
const port = process.env.PORT || 3000

// Création du serveur
const app = express()

// Définission des Middleware
app.use(express.json()) // Nécessaire pour avoir accès à req.body

// Création des routes
app.get("/movies", (req, res) => {
	Movie.find()
		.exec()
		.then(doc => {
			res.send(doc)
		})
		.catch(err => {
			res.status(500).send()
		})
})

/*
app.get("/movies/:id", (req, res) => {
	Movie.findById(req.params.id)
		.exec()
		.then(doc => {
			res.send(doc)
		})
		.catch(err => {
			res.status(500).send("Erreur/Pas de résultat")
		})
})
*/

app.get("/movies/:id", async (req, res) => {
	try {
		const doc = await Movie.findById(req.params.id).exec()
		res.send(doc)
	} catch (e) {
		res.status(500).send("Erreur/Pas de résultat")
	}
})

app.patch("/movies/:id", async (req, res) => {
	try {
		const { id } = req.params
		const acceptedField = ["restriction", "synopsis", "released"]
		console.log("Champs obtenus par l'utilisateur:", req.body)
		console.log("Champs autorisés par l'utilisateur:", acceptedField)
		const keys = Object.keys(req.body).filter(key => acceptedField.includes(key))
		console.log("Keys:", keys)
		const fieldsToUpdate = {}
		keys.map(key => fieldsToUpdate[key] = req.body[key])
		console.log(fieldsToUpdate)
		const doc = await Movie.findByIdAndUpdate(id, fieldsToUpdate, {new: true})
		res.json(doc)
	} catch {
		res.status(500).send("Erreur lors de la mise à jour")
	}
})

app.post("/movies", async (req, res) => {
	const newMovie = new Movie(req.body)
	const document = await newMovie.save()
	res.status(201).json(document)
})

// Lancement du serveur
app.listen(port, () => {
	console.log(`Serveur lancé: http://localhost:${port}`)
})
