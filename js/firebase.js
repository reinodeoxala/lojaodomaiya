// Firebase CDN (compatível GitHub Pages)
var firebaseConfig = {
  apiKey: "SUA_API_KEY",
  authDomain: "SEU_DOMINIO.firebaseapp.com",
  projectId: "SEU_PROJECT_ID",
};

firebase.initializeApp(firebaseConfig);

var db = firebase.firestore();
