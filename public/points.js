// import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js';
// import { getAnalytics } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-analytics.js';
// import { getDatabase, ref, push, onValue, remove } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js';
// import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, setPersistence, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js';

// var user_name = window.localStorage.getItem('userName')
// console.log(user_name)

// const firebaseConfig = {
//     databaseURL: "https://gdsc-solution-pydb-default-rtdb.asia-southeast1.firebasedatabase.app",
//     apiKey: "AIzaSyAnYxWWdqD4nPSIGVCmKZv_Y_oKHQK6P7A",
//     authDomain: "gdsc-solution-pydb.firebaseapp.com",
//     projectId: "gdsc-solution-pydb",
//     storageBucket: "gdsc-solution-pydb.appspot.com",
//     messagingSenderId: "999689302163",
//     appId: "1:999689302163:web:8f9a5328c64a99958c5d66",
//     measurementId: "G-CJT6EKCHHH"
// };
  
//   // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const database = getDatabase(app);
// const analytics = getAnalytics(app);
// const auth = getAuth();

const userDic = {
    'key1': 42.73,
    'key2': 37.15,
    'key3': 45.99,
    'key4': 38.51,
    'key5': 37.88,
    'key6': 42.23,
    'key7': 40.79,
    'key8': 34.46,
    'key9': 31.32,
    'key10': 30.65,
    'key11': 31.12,
    'key12': 37.89,
    'key13': 30.57,
    'key14': 35.43,
    'key15': 40.77,
    'key16': 30.10,
    'key17': 38.54,
    'key18': 47.88,
    'key19': 39.21,
    'key20': 35.65,
    'key21': 30.99,
    'key22': 45.35,
    'key23': 37.68,
    'key24': 46.90,
    'key25': 40.23,
    'key26': 32.57,
    'key27': 38.88,
    'key28': 31.12,
    'key29': 34.46,
    'key30': 37.79,
    'key31': 30.10,
    'key32': 38.54,
    'key33': 46.88,
    'key34': 39.21,
    'key35': 35.65,
    'key36': 30.99,
    'key37': 45.35,
    'key38': 37.68,
    'key39': 46.90,
    'key40': 40.23,
    'key41': 32.57,
    'key42': 38.88,
    'key43': 31.12,
    'key44': 34.46,
    'key45': 37.79,
    'key46': 30.10,
    'key47': 38.54,
    'key48': 46.88,
    'key49': 39.21,
    'key50': 35.65,
  };
  
  const sortedUserDic = Object.entries(userDic).sort((a, b) => a[1] - b[1] || a[0].localeCompare(b[0]));
  const userDicObj = Object.fromEntries(sortedUserDic);
  
  const l = Object.values(userDicObj);
  const top5 = l.slice(0, Math.floor(l.length * 0.5)).sort();
  
  let count = 3;
  const pointDic = {};
  
  for (const key in userDicObj) {
    const i = userDicObj[key];
    const virtualLimit = 10000;
    const points = ((virtualLimit - i * 50) / (i * 0.8)).toFixed(1);
  
    if (count > 0) {
      pointDic[key] = Math.floor(points * 10) + count * 1000;
      count -= 1;
    } else if (top5.includes(i)) {
      pointDic[key] = Math.floor(points * 10) + 500;
    } else {
      pointDic[key] = Math.floor(points * 10);
    }
  }
  
console.log(pointDic);