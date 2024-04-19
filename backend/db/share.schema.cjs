const Schema = require("mongoose").Schema;

module.exports = new Schema(
	{
		username1: {
			type: String,
			required: true,
		},
		username2: {
			type: String,
			required: true,
		},
        status: {
            type: Boolean,
            required: true
        },
	},
	{ collection: "share" }
);
