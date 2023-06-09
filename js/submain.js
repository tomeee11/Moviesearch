const submain = document.getElementById('submain');
const titleP = document.getElementById('titleP');
const urlParams = new URLSearchParams(window.location.search);
const baseUrl = 'https://api.themoviedb.org/3/movie/';
const searchUrl = urlParams.get('id');
const apiKey = '?api_key=ad896f181b664e3c71e0096a111a52f2';
const searchKey = baseUrl + searchUrl + apiKey;
const imgUrl = 'https://image.tmdb.org/t/p/w500';

let id = sessionStorage.getItem('id');
let logined = sessionStorage.getItem('logined');
let signBtn = document.querySelector('#signbar');
let logInBtn2 = document.querySelector('#loginbar');
const header = document.querySelector('#welcome-txt');

const checkLogin = (logined, id) => {
  if (logined === 'true') {
    logInBtn2.innerText = `로그아웃`;
    const welcome = document.createElement('p');
    welcome.innerHTML = `<span id="loginedId">${id}</span> 님 환영합니다!`;
    header.append(welcome);
    logInBtn2.setAttribute('data-bs-toggle', '');
    signBtn.style.display = 'none';
    logInBtn2.onclick = () => {
      sessionStorage.setItem('logined', 'false');
      sessionStorage.removeItem('id');
      window.location.reload();
    };
  }
};
checkLogin(logined, id);

function getColor(vote) {
  if (vote >= 8) {
    return 'green';
  } else if (vote >= 5) {
    return 'orange';
  } else {
    return 'red';
  }
}

console.log(searchKey);
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwMTY4YWE2MWUyODZiMWIwY2FkODYxMTE4NjM0ZjNhYiIsInN1YiI6IjY0NzQ0YjExZGQ3MzFiMmQ3NzlhYTZhOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.mlZJKOID6Eo7TgzA_jXlHoF65M2HRJ74FiOq4AxlVB8',
  },
};

function getMovies() {
  fetch(searchKey, options)
    .then((response) => response.json())
    .then((response) => {
      console.log(response);
      let title = response.title;
      let poster_path = response.poster_path;
      let vote_average = response.vote_average;
      let id = response.id;
      let overview = response.overview;
      let tagline = response.tagline;
      let release_date = response.release_date;

      console.log(title, id, vote_average, poster_path, overview);

      const movieE1 = document.createElement('div');
      movieE1.classList.add('movie');
      movieE1.innerHTML = `
                              <div class="container py-4 mw-100 ">
                                <div class="p-5 mb-4  rounded-3" id='card_main' >
                                  <div class="col-md-3">
                                    <img src="${
                                      imgUrl + poster_path
                                    }" class="mw-100 rounded-3 " alt="${title}}">
                                    
                                  </div>
                                  <div class="col-md-7">
                                    <h1 class="h1title">${title}</h1>
                                    <button id="btn" type="button" class="btn btn-danger btn-lg"
                                    onclick="onClickBookBtn()">예매하기</button>
                                    <p class="fs-2">${tagline} </p>
                                    <p class="fs-2"> release_date : ${release_date} </p>
                                    <p class="poverview">${overview}</p>
                                  </div>
                                </div>
                              </div>`;
      submain.appendChild(movieE1);
    })
    .catch((err) => console.error(err));
}

function onClickBookBtn() {
  console.log(sessionStorage.logined);
  if (sessionStorage.id) {
    location.href = '/booking.html';
  } else {
    alert('예매를 위해 로그인 해주세요 ');
  }
}

getMovies();

//-------
let inputs = document.querySelectorAll('input');
let logInBtn = document.querySelector('#log-in');
let checkID = sessionStorage.getItem('id');
let checkBtn = document.querySelector('#log-in');

logInBtn.onclick = (e) => {
  e.preventDefault();
  let id = inputs[0].value;
  let password = inputs[1].value;

  if (id && password) {
    if (password === localStorage.getItem(id)) {
      sessionStorage.setItem('id', id);
      sessionStorage.setItem('logined', 'true');
      alert('로그인되었습니다.');
      window.location.href = '/';
    }
    if (localStorage.getItem(id) === null) {
      console.log(localStorage.getItem(id));
      inputs[0].nextElementSibling.textContent = 'ID가 일치하지 않습니다.';
      setTimeout(() => {
        inputs[0].nextElementSibling.textContent = '';
      }, 2000);
    }
    if (password !== localStorage.getItem(id)) {
      inputs[1].nextElementSibling.textContent =
        '비밀번호가 일치하지 않습니다.';
      setTimeout(() => {
        inputs[1].nextElementSibling.textContent = '';
      }, 2000);
    }
  } else {
    if (id === '') {
      inputs[0].nextElementSibling.textContent = 'ID를 입력해주세요.';
      setTimeout(() => {
        inputs[0].nextElementSibling.textContent = '';
      }, 2000);
    }
    if (password === '') {
      inputs[1].nextElementSibling.textContent = '비밀번호를 입력해주세요.';
      setTimeout(() => {
        inputs[1].nextElementSibling.textContent = '';
      }, 2000);
    }
  }
};
