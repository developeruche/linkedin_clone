import firebase from "firebase"

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAb1ZrZZ14-P2eGc8U56POjKh3dDe0qI9Y",
    authDomain: "linkedinclone-efe2e.firebaseapp.com",
    projectId: "linkedinclone-efe2e",
    storageBucket: "linkedinclone-efe2e.appspot.com",
    messagingSenderId: "597193645421",
    appId: "1:597193645421:web:e739ae00ae36cce4a9ce64",
    measurementId: "G-01MQ9JD3LY"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  const auth = firebase.auth()
  const provider = new firebase.auth.GoogleAuthProvider();
  const storage = firebase.storage()


  export {
      auth,
      provider,
      storage
  }

  export default db