import firebase from 'firebase/app'
import "firebase/firestore"
import "firebase/storage"
import "firebase/auth"
const config = {
    apiKey: "AIzaSyBx_RDerZN8eYFSsENRULKW9Q4TczOvPNk",
    authDomain: "rama-pitching-2021.firebaseapp.com",
    projectId: "rama-pitching-2021",
    storageBucket: "rama-pitching-2021.appspot.com",
    messagingSenderId: "636453257191",
    appId: "1:636453257191:web:d5e3389875d0f12d7d0742"
}
if (!firebase.apps.length) {
    try {
        firebase.initializeApp(config)
    }
    catch (err) {
        console.log(err)
    }
}
export default firebase