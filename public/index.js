// Import the functions you need from the SDKs you need
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js';
import { getAnalytics } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-analytics.js';
import { getDatabase, ref, push, onValue, remove } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, setPersistence, onAuthStateChanged, GoogleAuthProvider, signInWithPopup } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js';
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

const google = new GoogleAuthProvider();
google.addScope('email','openid','profile')

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();
auth.useDeviceLanguage();
console.log(app)

let flag;
//----- Login code start	
document.getElementById("login").addEventListener("click", function() {
    var email =  document.getElementById("login_email").value;
    var password = document.getElementById("login_password").value;

    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log(user);
        window.localStorage.setItem('userID', user.uid);
        window.localStorage.setItem('userName',auth.currentUser.displayName)
        showAlert(`&#10004; &nbsp;`+ user.email + "&nbsp; Login successful!");
        flag = "success"
        
        // document.getElementById('logout').style.display = 'block';
        // ...
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
        showAlert(errorMessage)
        flag = "error"
    });		  		  
});

document.getElementById('google-button').addEventListener('click',GoogleSignIn)

function GoogleSignIn() {
    signInWithPopup(auth, google)
    .then((result) => {
        flag = 'success';
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        console.log(user)
        window.localStorage.setItem('userID', user.uid);
        window.localStorage.setItem('userName',auth.currentUser.displayName)
        showAlert(`&#10004; &nbsp;`+ user.email + "&nbsp; Login successful!");
        // IdP data available using getAdditionalUserInfo(result)
        // ...
    }).catch((error) => {
        flag = 'error';
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        showAlert(errorMessage)
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
    });
}

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
            window.location.href = "main.html";
        } else {
            location.reload();
        }
    })
}

