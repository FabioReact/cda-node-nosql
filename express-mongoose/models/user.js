const mongoose = require("mongoose")
const argon2 = require("argon2")

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	}
})

// Avant la sauvegarde de mon utilisateur, je veux pouvoir executer une fonction
userSchema.pre("save", async function () {
	try {
		const hashedPassword = await argon2.hash(this.password)
		this.password = hashedPassword
	} catch (e) {
		console.log(e)
	}
})

const User = mongoose.model("User", userSchema)

module.exports = User