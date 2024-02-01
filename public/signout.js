import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js';
import { getAnalytics } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-analytics.js';
import { getDatabase, ref, push, onValue, remove } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, setPersistence } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js';

const firebaseConfig = {
    databaseURL: "https://gdsc-solution-pydb-default-rtdb.asia-southeast1.firebasedatabase.app",
    apiKey: "AIzaSyAnYxWWdqD4nPSIGVCmKZv_Y_oKHQK6P7A",
    authDomain: "gdsc-solution-pydb.firebaseapp.com",
    projectId: "gdsc-solution-pydb",
    storageBucket: "gdsc-solution-pydb.appspot.com",
    messagingSenderId: "999689302163",
    appId: "1:999689302163:web:8f9a5328c64a99958c5d66",
    measurementId: "G-CJT6EKCHHH"
};
  
  // Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();
console.log(app)
let flag;

document.getElementById("logout").addEventListener("click", function() {
    signOut(auth).then(() => {
        // Sign-out successful.
        console.log('Sign-out successful.');
        showAlert('Sign-out successful.');
        flag = "success";
        document.getElementById('logout').style.display = 'none';
        window.localStorage.removeItem('userID');
        window.localStorage.removeItem('userName');
        localStorage.clear()
        }).catch((error) => {
            // An error happened.
            console.log('An error occured.');
            showAlert(error.message)
            flag = "error";
        });		  		  
});
//----- End
function showAlert(message) {
    let alertBox = document.createElement('div')
    alertBox.classList.add('alert-box')
    alertBox.id = "alert";
    alertBox.innerHTML = message;
    document.body.appendChild(alertBox)
    alertBox.addEventListener('animationend', function() {
        alertBox.classList.add('disappear')
        if (flag == "success") {
            window.location.href = "index.html";
        }
    })
}