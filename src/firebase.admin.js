var admin = require("firebase-admin");

var serviceAccount = require("./serviceAccountKey.json");

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL: "https://wad2project-7fc17.firebaseio.com"
// });

var refreshToken; // Get refresh token from OAuth2 flow

admin.initializeApp({
  credential: admin.credential.refreshToken(refreshToken),
});

export default admin;