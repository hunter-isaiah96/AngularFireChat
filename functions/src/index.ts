import * as firebase from 'firebase';
import * as admin from 'firebase-admin';

// firebase.initializeApp({
//   apiKey: 'AIzaSyADXHRQxJqTzIFKIGnGpwpJgcmJQ4qekdk',
//   authDomain: 'chatapp-17c32.firebaseapp.com',
//   databaseURL: 'https://chatapp-17c32.firebaseio.com',
//   projectId: 'chatapp-17c32',
//   storageBucket: 'chatapp-17c32.appspot.com',
//   messagingSenderId: '256939056626',
//   appId: '1:256939056626:web:58106e3f0960e47e719f6b',
// });
// // // Start writing Firebase Functions
// // // https://firebase.google.com/docs/functions/typescript
// //
// var uid = firebase.auth().currentUser;
// var userStatusDatabaseRef = firebase.database().ref('/status/' + uid);

// var isOfflineForDatabase = {
//   state: 'offline',
//   last_changed: firebase.database.ServerValue.TIMESTAMP,
// };

// var isOnlineForDatabase = {
//   state: 'online',
//   last_changed: firebase.database.ServerValue.TIMESTAMP,
// };

// firebase
//   .database()
//   .ref('.info/connected')
//   .on('value', function (snapshot) {
//     // If we're not currently connected, don't do anything.
//     if (snapshot.val() == false) {
//       return;
//     }

//     // If we are currently connected, then use the 'onDisconnect()'
//     // method to add a set which will only trigger once this
//     // client has disconnected by closing the app,
//     // losing internet, or any other means.
//     userStatusDatabaseRef
//       .onDisconnect()
//       .set(isOfflineForDatabase)
//       .then(function () {
//         // The promise returned from .onDisconnect().set() will
//         // resolve as soon as the server acknowledges the onDisconnect()
//         // request, NOT once we've actually disconnected:
//         // https://firebase.google.com/docs/reference/js/firebase.database.OnDisconnect

//         // We can now safely set ourselves as 'online' knowing that the
//         // server will mark us as offline once we lose connection.
//         userStatusDatabaseRef.set(isOnlineForDatabase);
//       });
//   });
