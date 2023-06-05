console.log('aaaa');

const gridReview = (data) => {
  let element = document.querySelector('.review-list');
  let template = `
    <div class='review-card' onclick="onClickMovieCard()">
      <div class='card-dedail-wrap'>
        <h3>${data}</h3>
        <span class='scroll>aaa</span>
        <p>Rating</p>
      </div>
      <button type="" id="search-btn">등록</button>

    </div>
    `;
  element.insertAdjacentHTML('beforeend', template);
};

const reviewInputHandler = (e) => {
  event.preventDefault();
  let input = document.getElementById('review-text').value;
  if (input === '') {
    alert('리뷰를 입력해주세요');
    return;
  }
  gridReview(input);
  document.getElementById('review-text').value = '';
};
