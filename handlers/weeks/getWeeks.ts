import Week from "../../types/Week";
export {};

const { db } = require("../../util/admin");

exports.getWeeks = async (req: any, res: any) => {
	const weeksRef = db.collection("weeks");
	try {
		weeksRef.get().then((snapshot: any) => {
			const weeks: Week[] = snapshot.docs.map((doc: any) => ({
				id: doc.id,
				...doc.data(),
			}));
			console.log(weeks);
			return res.status(201).json(weeks);
		});
	} catch (error) {
		return res
			.status(500)
			.json({ general: "Something went wrong, please try again" });
	}
};
