// Import the functions you need from the SDKs you need

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCpR_bu8eUhHaT8crSmszFjyORG7lHrjgI',
  authDomain: 'movie-dd01e.firebaseapp.com',
  projectId: 'movie-dd01e',
  storageBucket: 'movie-dd01e.appspot.com',
  messagingSenderId: '377347522460',
  appId: '1:377347522460:web:34c1acfd33399658a6d259',
  measurementId: 'G-E4PCWVB28J',
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

const getReview = (id) => {
  db.collection('comment')
    .doc(id)
    .get()
    .then((result) => {
      return result.data();
    });
};

const postReview = (movieId, commentId, comment, userName) => {
  console.log(movieId, commentId, comment, userName);
  db.collection('comment', movieId).add({
    commentId,
    comment,
    userName,
  });
};

const deleteReview = (movieId, commentId) => {
  db.collection('comment').doc(movieId).collection(commentId).remove();
};
