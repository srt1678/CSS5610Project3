const express = require("express");
const router = express.Router();
const UrlPasswordModel = require("./db/urlPassword.model.cjs");

//http://localhost:8000/api/urlPassword
router.post("/", async function (req, res) {
	const requestBody = req.body;

	if (!requestBody.username || !requestBody.url || !requestBody.urlPassword) {
		res.status(400);
		return res.send("Information is missing");
	}

	const newUrlPasswordPair = {
		username: requestBody.username,
		url: requestBody.url,
        urlPassword: requestBody.urlPassword
	};

	try {
		const response = await UrlPasswordModel.insertUrlPassword(
			newUrlPasswordPair
		);
		//res.cookie('pokemonOwner', 'yuchen');
		//res.cookie('favoriteColor', 'yellow');
		return res.send(response);
	} catch (error) {
		res.status(400);
		return res.send(error);
	}
});

//http://localhost:8000/api/urlPassword/temp
router.get("/:username", async function (req, res) {
	const username = req.params.username;
	try {
		const getUserResponse = await UrlPasswordModel.getUrlPasswordByUsername(
			username
		);
		return res.send(getUserResponse);
	} catch (error) {
		res.status(400);
		return res.send(error);
	}
});

router.put("/:id", async function (req, res) {
	const id = req.params.id;
	const urlUpdate = req.body;
	try {
		const updateResponse = await UrlPasswordModel.updateUserUrlPassword(
			id,
			urlUpdate
		);
		return res.send(updateResponse);
	} catch (error) {
		res.status(400);
		return res.send(error);
	}
});

router.delete('/:id', async function(req, res){
	const id = req.params.id;
	try{
		const deleteResponse = await UrlPasswordModel.deleteUrlPassword(id);
		return res.send(deleteResponse);
	}catch(error){
		res.status(400);
		return res.send(error);
	}
})

module.exports = router;
