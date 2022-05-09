import Week from "../../types/Week";
import { collection, getDocs } from "firebase/firestore/lite";
export {};

const { db } = require("../../util/firebase");

exports.getWeeks = async (req: any, res: any) => {
	const weeksRef = collection(db, "weeks");
	try {
		await getDocs(weeksRef).then((snapshot: any) => {
			const weeks: Week[] = snapshot.docs.map((doc: any) => ({
				id: doc.id,
				...doc.data(),
			}));
			return res.status(201).json(weeks);
		});
	} catch (error) {
		return res
			.status(500)
			.json({ general: "Something went wrong, please try again" });
	}
};
