import * as firebase from 'firebase';

class FirebaseApi {
    config = {
        apiKey: "AIzaSyA7L7OaXiFRb13fp9HcyGnG0R2uWeWBsxI",
        authDomain: "cat-workshop-football-manager.firebaseapp.com",
        databaseURL: "https://cat-workshop-football-manager.firebaseio.com",
        storageBucket: "cat-workshop-football-manager.appspot.com",
        messagingSenderId: "949148817393"
    };

    constructor() {
        firebase.initializeApp(this.config);

        this.auth = firebase.auth();
        this.authProvider = new firebase.auth.GoogleAuthProvider();

        const db = firebase.database();
        this.dbRef = db.ref().child('react');
    }

    googleAuthPopup() {
        return firebase.auth().signInWithPopup(this.authProvider);
    }
}

const firebaseApi = new FirebaseApi();
export default firebaseApi;
