const { MongoClient, ObjectID } = require("mongodb")

// Connection URI
const connectionURI = "mongodb://localhost:27017"

// Nom de la bdd à laquelle on va se connecter
const dbName = "hello-mongo"

// Options MongoClient
const options = {
	useUnifiedTopology: true,
}

MongoClient.connect(connectionURI, options, async function (err, client) {
	if (err) {
		// Si jamais je n'ai pas réussi à me connecter à mongo, ce bloc sera exécuté
		return console.log("Erreur survenue lors de la connexion à mongodb")
	}

	// Je me connecte à la base de donnée stockée dans la variable dbName
	const dbHero = client.db(dbName)
	console.log(`Connecté avec succès à ${dbName}`)

	// Stocker une référence à notre collection
	const heroesCollection = dbHero.collection("heroes")

	const blackPanther = {
		heroName: "Black Panther",
		fullname: "Prince T'Challa",
		univers: "Marvel",
	}

	const hulk = {
		heroName: "Hulk",
		fullname: "Bruce Banner",
		job: "Chercheur",
	}

	const wonderWoman = {
		heroName: "Wonder Woman",
		fullname: "Princesse Diana",
		biography: {
			gender: "female",
			age: 30,
			hobbies: ["attraper les vilains", "utiliser son lasso", "Lire"],
			evil: false,
		},
	}

	// ObjectID -> Id composé de 12-byte qui se décompose comme ceci:
	// Timestamp 4-byte + Nombre aléatoire 5-byte + Compteur à commence à un nombre aléatoire sur 3-byte

	// CREATE - Insert One
	const insertHero = () => {
		return heroesCollection
			.insertOne(wonderWoman)
			.then(res => {
				console.log(res)
			})
			.catch(err => {
				console.log(err)
				console.log("L'insertion a échouée")
			})
			.finally(() => {
				// Cette ligne sera exécutée que l'opération ai réussi (.then) ou échoué (.catch)
			})
	}
	// await insertHero()

	// CREATE - Insert Many
	const insertManyHeroes = () => {
		return heroesCollection
			.insertMany([blackPanther, hulk])
			.then(res => console.log(res))
			.catch(err => console.log("Erreur lors de insertMany"))
	}
	// await insertManyHeroes()

	// READ - Find One
	const findOneHero = () => {
		return heroesCollection
			.findOne({heroName: "Hulk"})
			.then(res => console.log(res))
			.catch(err => console.log("Erreur survenue lors de findOne"))
	}
	// await findOneHero()

	// READ - Find Many
	const findManyHeroes = () => {
		return heroesCollection
			.find({univers: "Marvel"})
			.toArray()
			.then(result => console.log(result))
			.catch(error => console.log("Erreur survenue lors de find"))
	}
	// await findManyHeroes()

	// UPDATE - Update One
	// Documentation: https://docs.mongodb.com/manual/reference/operator/update/
	const updateOneHero = () => {
		return heroesCollection
			.updateOne({heroName: "Hulk"}, {
				$set: {
					job: "Scientifique",
					"biography.gender": "male",
				}
			})
			.then(res => console.log(res))
			.catch(err => console.log(err))
	}
	// await updateOneHero()

	// UPDATE - Update Many
	const updateManyHeroes = () => {
		return heroesCollection
			.updateMany({univers: "Marvel"}, {
				$set: {
					company: "Disney"
				}
			})
			.then(res => console.log(res))
			.catch(err => console.log(err))
	}
	await updateManyHeroes()

	// DELETE - Delete One
	// 5fdb3098d12a6c57d45137a3
	const deleteHero = () => {
		return heroesCollection
			.deleteOne({ _id: new ObjectID("5fdb3563830dfc2ae44853b8") })
			.then(res => {
				console.log(res)
			})
			.catch(err => {
				console.log(err)
			})
	}
	// await deleteHero()

	// Je me déconnecte de la base de donnée
	client.close()
})
