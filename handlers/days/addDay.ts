import Day from "../../types/Day";
import Week from "../../types/Week";

const { db } = require('../../util/admin')

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
				"saturday"
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

    const weeksRef = db.doc('weeks/' + weekId);

		const orginalVal : Week = await weeksRef.get().then((snapshot: any) => snapshot.data());

    if(orginalVal && orginalVal.days){
      let idx = orginalVal.days.findIndex((day : Day) => day.name === newDay.name)
      if(idx !== -1) return res.status(400).send("This day already excists for this week")

      orginalVal.days.push(newDay)

      await weeksRef.set(orginalVal)

      return res.status(400).send(orginalVal)
    }
    return res.status(400).send("A week with this ID does not excist yet")
	} catch (e: any) {
		return res.status(400).send(e.message);
	}
};
