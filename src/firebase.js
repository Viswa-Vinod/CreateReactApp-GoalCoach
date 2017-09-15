import * as firebase from 'firebase';

const config =  {
    apiKey: "AIzaSyCfqjl-d629JbHYTK3qaYo-OW9Y60NQxwk",
    authDomain: "goalcoach-7fbcb.firebaseapp.com",
    databaseURL: "https://goalcoach-7fbcb.firebaseio.com",
    projectId: "goalcoach-7fbcb",
    storageBucket: "goalcoach-7fbcb.appspot.com",
    messagingSenderId: "11317423156"
  };

  export const firebaseApp = firebase.initializeApp(config);
  export const goalRef = firebase.database().ref('goals'); //defines a new reference in firebase with key 'goals'
  export const completeGoalRef = firebase.database().ref('completeGoals');
  export const userRef = firebase.database().ref('users');
 