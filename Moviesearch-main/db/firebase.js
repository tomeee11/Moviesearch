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

function readReviews(movieId) {
  reviews = {};
  firebase
    .firestore()
    .collection('movies')
    .doc(movieId)
    .collection('reviews')
    .orderBy('timestamp')
    .get()
    .then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        console.log(doc.id, ' => ', doc.data());
        let element = document.querySelector('.review-list');

        data = doc.data();
        let template = `
                        <div class='review-card' >
                          <div class='card-dedail-wrap'>
                            <h3>${data.userName}</h3>
                            <p>${data.content}</p>
                          </div>
                          <div class="button-wrap">
                            ${
                              data.userName === sessionStorage.getItem('id')
                                ? `<button
                                  type=""
                                  id="search-btn"
                                  onclick="onClickDelBtn('${doc.id}')"
                                >
                                  삭제
                                </button>`
                                : ``
                            }
                          </div>
                        </div>
                        `;
        element.insertAdjacentHTML('afterbegin', template);
      });
    })
    .catch(function (error) {
      console.log('Error getting reviews: ', error);
    });
}

function writeReview(movieId, review, userName) {
  firebase
    .firestore()
    .collection('movies')
    .doc(movieId)
    .collection('reviews')
    .add({
      content: review,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      userName: userName,
    })
    .then(function (docRef) {
      console.log('Review written with ID: ', docRef.id);
    })
    .catch(function (error) {
      console.error('Error adding review: ', error);
    });
}

const deleteReview = (movieId, commentId) => {
  db.collection('comment').doc(movieId).collection(commentId).remove();
};

function deleteReview(movieId, reviewId) {
  firebase
    .firestore()
    .collection('movies')
    .doc(movieId)
    .collection('reviews')
    .delete(reviewId)
    .then(function () {
      console.log('Review deleted successfully.');
    })
    .catch(function (error) {
      console.log('Error deleting review: ', error);
    });
}
