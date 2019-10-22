import * as firebase from 'firebase'

const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID
  };
  
firebase.initializeApp(firebaseConfig);

const database = firebase.database()


const testUser = database.ref("ladder/users")

testUser.equalTo("TSLYusr8xmd8gUUfDNO0260qqT43").once("value").then((snapshot) => {
  const users = []
  snapshot.forEach((childSnapshot) => {
    users.push({
      id:childSnapshot.key,
      ...childSnapshot.val()
    })
  })
  console.log(users)
});


export {firebase, database as default}