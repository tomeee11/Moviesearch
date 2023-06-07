let n = 0;

const gridReview = async () => {
  let element = document.querySelector('.review-list');
  // 현제 페이지에서 카드들 삭제
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }

  const reviewData = getReview(searchUrl) || [];
  console.log(searchUrl);
  reviewData.forEach((data) => {
    let template = `
    <div class='review-card' >
      <div class='card-dedail-wrap'>
        <h3>${data.name}</h3>
        <p>${data.comment}</p>
      </div>
      <div class="button-wrap">
        <button type="" id="search-btn" onclick="onClickDelBtn(${i})">삭제</button>
      </div>
    </div>
    `;
    element.insertAdjacentHTML('afterbegin', template);
  });
};

const reviewInputHandler = (e) => {
  e.preventDefault();
  let input = {
    name: sessionStorage.getItem('id'),
    comment: document.getElementById('review-text').value,
  };

  if (input.comment === '') {
    alert('리뷰를 입력해주세요');
    return;
  }

  localStorage.setItem(localStorage.length, JSON.stringify(input));

  postReview(searchUrl, 0, input.comment, input.name);
  gridReview();
  document.getElementById('review-text').value = '';
};

const onClickDelBtn = async (num) => {
  const input = prompt('비밀번호');
  data = JSON.parse(localStorage.getItem(num));
  if (input === data.password) {
    alert('삭제했습니다.');
    gridReview();
  } else {
    alert('비밀번호가 틀렸습니다.');
  }
};

// const urlParams = new URLSearchParams(window.location.search);
// console.log(urlParams.get('id'));
window.onload = async () => {
  gridReview();
};
