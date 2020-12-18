const mongoose = require("mongoose")

// Création du Schema - ce à quoi un document "movie" doit resembler/ avoir comme champs
// Par défaut, un ObjectID est injecté dans devoir le préciser
// Documentation: https://mongoosejs.com/docs/schematypes.html
const movieSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	synopsis: {
		type: String,
		required: true,
	},
	genre: {
		type: Array,
		required: true,
	},
	released: {
		required: true,
		type: Date,
	},
	restriction: {
		default: 0,
		type: Number,
	},
})

// Le modèle est une classe qui aura les propriétés déclarés dans le schema ainsi que des méthodes pour faire les requêtes à la base de données
const Movie = mongoose.model("Movie", movieSchema)

module.exports = Movie