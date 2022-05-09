const { db } = require("../../util/firebase");
import { collection, getDocs } from "firebase/firestore/lite";

export {};

exports.addWeek = async (req: any, res: any) => {
	try {
		const weeksRef = collection(db, "weeks");

		const weekIds: string[] = await getDocs(weeksRef).then((snapshot: any) =>
			snapshot.docs.map((doc: any) => doc.id)
		);

		let lastId: string | undefined = weekIds[weekIds.length - 1]
			.split("-")
			.pop();

		const newId = lastId ? `week-${parseInt(lastId) + 1}` : 1;

		db.collection("weeks").doc(newId).set({ days: [] });

		return res.status(200).send(newId + " was added");
	} catch (e: any) {
		return res.status(400).send(e.message);
	}
};
