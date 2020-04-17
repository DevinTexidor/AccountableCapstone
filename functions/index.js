const functions = require("firebase-functions");
const admin = require("firebase-admin");
const { Expo } = require("expo-server-sdk");

// init app
admin.initializeApp();
const expo = new Expo();

exports.onMessageSend = functions.firestore
  .document("/chats/{chatId}")
  .onUpdate(async (change) => {
    try {
      const data = change.after.data();
      const message = data.messages[data.messages.length - 1];
      const { uid } = message;

      const db = admin.firestore();
      const snap = await db.collection("users").doc(uid).get();
      const user = snap.data();
      const { firstName, pushToken } = user;

      // Check that all your push tokens appear to be valid Expo push tokens
      if (!Expo.isExpoPushToken(pushToken)) {
        throw "Not a valid ExpoPushToken";
      }

      const body = `${firstName} sent you a message`;

      // construct message object, must be array
      const msg = [
        {
          to: pushToken,
          sound: "default",
          body,
          data: { uid },
        },
      ];

      // attempt to send notification
      await expo.sendPushNotificationsAsync(msg);
    } catch (err) {
      console.log(err);
    }
  });
