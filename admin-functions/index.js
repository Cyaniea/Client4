// const {onRequest} = require("firebase-functions/v2/https");
// const logger = require("firebase-functions/logger");
const {onCall} = require("firebase-functions/v2/https");
const admin = require("firebase-admin");

admin.initializeApp();

exports.addAdminRole = onCall({maxInstances: 1}, (request) => {
  const {email} = request.data;
  const isAdmin = request.auth && request.auth.token ?
    request.auth.token.admin :
    false;

  // Check if the request is made by an admin
  if (!isAdmin) {
    throw new Error("Only admins can add other admins.");
  }

  // Get user and add custom claim (admin)
  return admin.auth().getUserByEmail(email)
      .then((user) => {
        return admin.auth().setCustomUserClaims(user.uid, {admin: true});
      })
      .then(() => {
        return {message: `Success! ${email} has been made an admin.`};
      })
      .catch((err) => {
        throw new Error("Error adding admin role: " + err.message);
      });
});
