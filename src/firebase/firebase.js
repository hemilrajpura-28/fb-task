import { initializeApp } from "firebase/app";

// import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD6XtBcLqAv9aMET3aKbpP9GWDmyF6pNhE",
  authDomain: "hemilrajpura-webserver.firebaseapp.com",
  projectId: "hemilrajpura-webserver",
  storageBucket: "hemilrajpura-webserver.appspot.com",
  messagingSenderId: "337992380168",
  appId: "1:337992380168:web:3a4bb74a29bff6082b46bd",
  measurementId: "G-1MX4QP9ET5",
};

const app = initializeApp(firebaseConfig);

export default app;
