import * as firebase from 'firebase';
import moment from 'moment';

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

    availability(moduleId) {
        return this.dbRef.child(moduleId)
    }

    participate(moduleId, date, time) {
        let updates = {};
        updates[`/${moment(date).format('DD_MM_YYYY')}/${moment(time).format('HH:mm')}/${this.auth.currentUser.uid}`] = {
            photo: this.auth.currentUser.photoURL,
            name: this.auth.currentUser.displayName
        };

        return this.availability(moduleId).update(updates);
    }

    unparticipate(moduleId, id, date, time) {
        if (this.auth.currentUser.uid === id) {
            return this.getAvailability(moduleId, date).child(time).child(id).remove();
        }
    }

    getAvailability(moduleId, date) {
        return this.availability(moduleId).child(moment(date).format('DD_MM_YYYY'));
    }
}

const firebaseApi = new FirebaseApi();
export default firebaseApi;
