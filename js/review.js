const firebaseConfig = {
  apiKey: 'AIzaSyCpR_bu8eUhHaT8crSmszFjyORG7lHrjgI',
  authDomain: 'movie-dd01e.firebaseapp.com',
  projectId: 'movie-dd01e',
  storageBucket: 'movie-dd01e.appspot.com',
  messagingSenderId: '377347522460',
  appId: '1:377347522460:web:34c1acfd33399658a6d259',
  measurementId: 'G-E4PCWVB28J',
};

const app = firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

function readReviews(movieId) {
  let element = document.querySelector('.review-list');
  // 현제 페이지에서 카드들 삭제
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
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
                                  onclick="onClickPutBtn('${doc.id}')"
                                >
                                  수정
                                </button>
                                <button
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

function deleteReview(movieId, reviewId) {
  console.log(reviewId);
  firebase
    .firestore()
    .collection('movies')
    .doc(movieId)
    .collection('reviews')
    .doc(reviewId)
    .delete()
    .then(function () {
      console.log('Review deleted successfully.');
    })
    .catch(function (error) {
      console.log('Error deleting review: ', error);
    });
}

const gridReview = async (id) => {};

const reviewInputHandler = async (e) => {
  e.preventDefault();
  let input = {
    name: sessionStorage.getItem('id'),
    comment: document.getElementById('review-text').value,
  };
  if (input.comment === '') {
    alert('리뷰를 입력해주세요');
    return;
  } else if (!input.name) {
    alert('로그인 후 작성이 가능합니다.');
    return;
  }
  await writeReview(searchUrl, input.comment, input.name);

  readReviews(searchUrl);
  document.getElementById('review-text').value = '';
};

const onClickDelBtn = async (num) => {
  await deleteReview(searchUrl, num);
  readReviews(searchUrl);
};

// const urlParams = new URLSearchParams(window.location.search);
// console.log(urlParams.get('id'));
window.onload = async () => {
  readReviews(searchUrl);
};
