import { doc, getDoc, updateDoc } from "firebase/firestore/lite";
import Day from "../../types/Day";
import Week from "../../types/Week";

const { db } = require("../../util/firebase");

export {};

const validateHelper = require("../../util/validateHelper");
const j = require("joi");

const bodySchema = j
	.object()
	.keys({
		name: j
			.string()
			.required()
			.valid(
				"monday",
				"tuesday",
				"wednesday",
				"thursday",
				"friday",
				"saturday",
				"sunday"
			),
	})
	.required();

const querySchema = j.object().keys({
	weekId: j.string().required(),
});

exports.removeDay = async (req: any, res: any) => {
	try {
		// validate input
		const { weekId } = validateHelper(querySchema, req.query);
		const { name } = validateHelper(bodySchema, req.body);

		const originalVal = await getDoc(doc(db, "weeks/" + weekId)).then(
			(snapshot: any) => snapshot.data()
		);

		if (originalVal && originalVal.days) {
			let idx = originalVal.days.findIndex((day: Day) => day.name === name);
			if (idx === -1)
				return res.status(400).send("This day does not excist in this week");

			originalVal.days.splice(idx, 1);

			await updateDoc(doc(db, "weeks/" + weekId), "days", [
				...originalVal.days,
			]);
			return res.status(400).send(originalVal);
		}
		return res.status(400).send("A week with this ID does not excist yet");
	} catch (e: any) {
		return res.status(400).send(e.message);
	}
};
