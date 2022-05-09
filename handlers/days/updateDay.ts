import { getDoc, doc, updateDoc } from "firebase/firestore/lite";
import Day from "../../types/Day";

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
		capacity: j.number().optional(),
		note: j.string().optional(),
		available: j.boolean().optional(),
		persons: j.array().items(j.object({ name: j.string().required() })),
	})
	.required();

const querySchema = j.object().keys({
	weekId: j.string().required(),
});

exports.updateDay = async (req: any, res: any) => {
	try {
		// validate input
		const { weekId } = validateHelper(querySchema, req.query);
		const { name, capacity, note, available, persons } = validateHelper(
			bodySchema,
			req.body
		);

		const newDay: Day = {
			name,
			capacity,
			note,
			available,
			persons,
		};

		const originalVal: any = await getDoc(doc(db, "weeks/" + weekId)).then(
			(snapshot: any) => snapshot.data()
		);

		if (originalVal && originalVal.days) {
			let idx = originalVal.days.findIndex(
				(day: Day) => day.name === newDay.name
			);
			if (idx === -1)
				return res.status(400).send("This day does not excist in this week");

			// only replace given keys
			Object.keys(newDay)
				.filter((key: any) => newDay[key as keyof Day] !== undefined)
				.forEach(
					(validKey: any) =>
						(originalVal.days[idx][validKey as keyof Day] =
							newDay[validKey as keyof Day])
				);

			await updateDoc(doc(db, "weeks/" + weekId), "days", [
				...originalVal.days,
			]);
			return res.status(400).send(originalVal.days[idx]);
		}
		return res.status(400).send("A week with this ID does not excist yet");
	} catch (e: any) {
		return res.status(400).send(e.message);
	}
};
