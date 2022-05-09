const { db } = require("../../util/firebase");

const validateHelper = require("../../util/validateHelper");
const j = require("joi");

export {}

const querySchema = j.object().keys({
	weekId: j.string().required(),
});

// BE CAUTIOUS, THIS REMOVES A WEEK AND ALL OF ITS CONTENTS

exports.removeWeek = async (req: any, res: any) => {
	try {
    const { weekId } = validateHelper(querySchema, req.query);
		const weeksRef = db.collection("weeks");

		weeksRef.doc(weekId).delete()

		return res.status(200).send(weekId + " was removed");
	} catch (e: any) {
		return res.status(400).send(e.message);
	}
};