const express = require("express");
const router = express.Router();
const ShareModel = require("./db/share.model.cjs");

router.post("/", async function (req, res) {
	const requestBody = req.body;

	if (!requestBody.username1 || !requestBody.username2) {
		res.status(400);
		return res.send("Information is missing");
	}

	const newShare = {
		username1: requestBody.username1,
		username2: requestBody.username2,
		status: false,
	};

	try {
		const response = await ShareModel.shareRequest(newShare);
		return res.send(response);
	} catch (error) {
		res.status(400);
		return res.send(error);
	}
});

router.get("/", async function (req, res) {
	const username = req.cookies.username;
	try {
		const gerResponse = await ShareModel.getConnectorUrlList(
			username,
			true
		);
		return res.send(gerResponse);
	} catch (error) {
		res.status(400);
		return res.send(error);
	}
});

router.get("/request", async function (req, res) {
	const username = req.cookies.username;
	try {
		const gerResponse = await ShareModel.getShareRequest(username);
		return res.send(gerResponse);
	} catch (error) {
		res.status(400);
		return res.send(error);
	}
});

router.put("/:id", async function (req, res) {
	const id = req.params.id;
	const requestUpdate = req.body;
	try {
		const updateResponse = await ShareModel.updateRequestStatus(
			id,
			requestUpdate
		);
		return res.send(updateResponse);
	} catch (error) {
		res.status(400);
		return res.send(error);
	}
});

router.delete("/:id", async function (req, res) {
	const id = req.params.id;
	try {
		const deleteResponse = await ShareModel.deleteShareRequest(id);
		return res.send(deleteResponse);
	} catch (error) {
		res.status(400);
		return res.send(error);
	}
});

module.exports = router;
