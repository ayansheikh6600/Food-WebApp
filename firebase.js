import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-analytics.js";
  import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";
  import { getFirestore, collection, addDoc, getDocs, doc, updateDoc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyBtgZtpOcfNCA3lZ0iRU69PinrZmBFOtb0",
    authDomain: "food-webapp-92997.firebaseapp.com",
    projectId: "food-webapp-92997",
    storageBucket: "food-webapp-92997.appspot.com",
    messagingSenderId: "290090975155",
    appId: "1:290090975155:web:b07646caa6dc72340c15c6",
    measurementId: "G-7RDW3EY30X"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  const auth = getAuth();
  const db = getFirestore(app);


  export{
    db,
    analytics,
    auth,
    app
  }

