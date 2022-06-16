import { getDoc, doc, updateDoc } from "firebase/firestore/lite";
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
		capacity: j.number().required(),
		note: j.string().optional(),
		available: j.boolean().required(),
	})
	.required();

const querySchema = j.object().keys({
	weekId: j.string().required(),
});

exports.addDay = async (req: any, res: any) => {
	try {
		// validate input
		const { weekId } = validateHelper(querySchema, req.query);
		const { name, capacity, note, available } = validateHelper(
			bodySchema,
			req.body
		);

		const newDay: Day = {
			name,
			capacity,
			note,
			available,
			persons: [],
		};

		const originalVal: Week = await getDoc(doc(db, "weeks/" + weekId)).then(
			(snapshot: any) => snapshot.data()
		);

		if (originalVal && originalVal.days) {
			let idx = originalVal.days.findIndex(
				(day: Day) => day.name === newDay.name
			);
			if (idx !== -1)
				return res.status(400).send("This day already excists for this week");

			originalVal.days.push(newDay);

			await updateDoc(doc(db, "weeks/" + weekId), "days", [
				...originalVal.days,
			]);

			return res.status(200).send(originalVal);
		}
		return res.status(400).send("A week with this ID does not excist yet");
	} catch (e: any) {
		return res.status(400).send(e.message);
	}
};
