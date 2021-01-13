import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import config from './firebase-config'

class Firebase {
    constructor() {
        app.initializeApp(config);
        this.auth = app.auth();
        this.db = app.database();
    }
    
    /*** Authentication  ***/
    doCreateUserWithEmailAndPassword = (email, password) => 
        this.auth.createUserWithEmailAndPassword(email, password);

    doSignInWithEmailAndPassword = (email, password) => 
        this.auth.signInWithEmailAndPassword(email, password);

    doSignOut = () => 
        this.auth.signOut();

    doPasswordReset = email => 
        this.auth.sendPasswordResetEmail(email);
    
    /*** Database ***/
    user = uid => this.db.ref(`users/${uid}`);
    users = () => this.db.ref('users');

    addActivity = (uid, activity) => {
        const ref = this.db.ref().child(`users/${uid}/activities`);
        ref.push(activity);
    };

    updateActivity = (uid, activity, activityKey) => {
        const ref = this.db.ref().child(`users/${uid}/activities/${activityKey}`);
        ref.update(activity);
    }

    addRoutine = (uid, routine) => {
      const ref = this.db.ref().child(`users/${uid}/routines`);
      ref.push(routine);
    }

    updateRoutine = (uid, routine, routineKey) => {
      const ref = this.db.ref().child(`users/${uid}/routines/${routineKey}`);
      ref.update(routine);
    }
}

export default Firebase;