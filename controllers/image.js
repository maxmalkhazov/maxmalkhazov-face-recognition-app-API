const Clarifai = require("clarifai");

const app = new Clarifai.App({
   apiKey: 'dce0bf2f5b9340108e9750f7b2829da1'
});

const handleApiCall = (req, res) => {
	app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
	.then(data => {
		res.json(data)
	})
	.catch(err=> res.status(400).json("unable to load API"))
}

const handleImage =  (req, res, db) => {
	const { id } = req.body;
	db("users").where('id', '=', id)
	.increment("entries", 1)
	.returning("entries")
	.then(entries => {
		res.json(entries[0])
	})
	.catch(err => res.status(400).json("unable to get entries"))
}

module.exports = {
	handleImage: handleImage,
	handleApiCall: handleApiCall
}