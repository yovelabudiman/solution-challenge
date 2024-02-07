// Import the functions you need from the SDKs you need
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js';
import { getAnalytics } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-analytics.js';
import { getDatabase, ref, push, onValue, remove } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, setPersistence, updateProfile } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
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
const auth = getAuth()
const analytics = getAnalytics(app);
console.log(app)

let flag;

//----- New Registration code start	  
document.getElementById("register").addEventListener("click", function() {
    var email =  document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var name = document.getElementById("name").value;
    window.localStorage.setItem('userName', name);
    window.localStorage.setItem('emailForSignIn', email);
    window.localStorage.setItem('userPass', password);
    //For new registration

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            window.localStorage.setItem('userID',user.uid);
            console.log(user);
            flag = "success"
            showAlert('Registered Successfully!')
            const user_name = window.localStorage.getItem('userName')
            const first_name = window.localStorage.getItem('userName').split(" ")[0];
            const full_name = first_name.charAt(0).toUpperCase()+first_name.slice(1);
            updateProfile(auth.currentUser, {
                displayName: `${user_name}`
            })
            
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // ..
            console.log(errorMessage);
            showAlert(errorMessage)
            flag = "error"
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
            window.location.href = "main.html"
        }
    })
}