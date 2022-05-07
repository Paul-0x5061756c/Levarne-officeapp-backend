var admin = require("firebase-admin");

var serviceAccount = require("../levarne-office-backend-firebase-adminsdk-qb5c4-a242aedb33.json");

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();
module.exports = { admin, db };