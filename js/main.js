let id = sessionStorage.getItem('id');
let logined = sessionStorage.getItem('logined');
let logInBtn2 = document.querySelector('#loginbar');
let signBtn = document.querySelector('#signbar');
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

//......................................................여기 까지 로그인 여부 확인기능....................................................

const API_KEY = 'api_key=d1f32f92c639fd0ff4f4bcc363027a26';
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL =
  BASE_URL +
  '/discover/movie?movie/popular?language=ko-kr&page=1&sort_by=popularity.desc&' +
  API_KEY;
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const searchURL = BASE_URL + '/search/movie?' + API_KEY;
// ------------------------------------------- url 정리

// 영화 찾는 저널을 한 객체로 묶음
const genres = [
  {
    id: 28,
    name: 'Action',
  },
  {
    id: 16,
    name: 'Animation',
  },
  {
    id: 35,
    name: 'Comedy',
  },
  {
    id: 18,
    name: 'Drama',
  },
  {
    id: 10751,
    name: 'Family',
  },
  {
    id: 27,
    name: 'Horror',
  },
  {
    id: 10402,
    name: 'Music',
  },
  {
    id: 9648,
    name: 'Mystery',
  },
];
// // --------------------------------
const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');
const tagsEl = document.getElementById('tags');

let selectedGenre = [];
setGenre();
function setGenre() {
  tagsEl.innerHTML = '';
  genres.forEach((genre) => {
    const t = document.createElement('div');
    t.classList.add('tag');
    t.id = genre.id;
    t.innerText = genre.name;
    t.addEventListener('click', () => {
      if (selectedGenre.length == 0) {
        selectedGenre.push(genre.id);
      } else {
        if (selectedGenre.includes(genre.id)) {
          selectedGenre.forEach((id, index) => {
            if (id == genre.id) {
              selectedGenre.splice(index, 1);
            }
          });
        } else {
          selectedGenre.push(genre.id);
        }
      }
      console.log(selectedGenre);
      getMovies(API_URL + '&with_genres=' + encodeURI(selectedGenre.join(',')));
      highlightselction();
    });
    tagsEl.append(t);
  });
}
// function으로 객체화한 영화 장르를 forEach로 html에 표현

function highlightselction() {
  const tags = document.querySelectorAll('.tag');
  tags.forEach((tag) => {
    tag.classList.remove('highlight');
  });
  if (selectedGenre.length !== 0) {
    selectedGenre.forEach((id) => {
      const highlightdTag = document.getElementById(id);
      highlightdTag.classList.add('highlight');
    });
  }
}

getMovies(API_URL);

function getMovies(url) {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      console.log(data.results);
      showMovies(data.results);
    });
}
let a = document.getElementById('maintitle3');
function showMovies(data) {
  main.innerHTML = '';
  data.forEach((movie) => {
    const { title, poster_path, vote_average, overview, id } = movie;
    const movieE1 = document.createElement('div');
    movieE1.classList.add('movie');
    movieE1.innerHTML = `
    <img src="${IMG_URL + poster_path}" alt="${title}"/>

    <div class="movie-info">
      <h3>${title}</h3>
      <span class="${getColor(vote_average)}">${Math.floor(vote_average)}</span>
      </div>
      <div class="overview">
      <h3>Overview</h3>
      ${overview}
    </div>
    </div>`;
    movieE1.onclick = () => {
      sessionStorage.setItem('title', title);
      sessionStorage.setItem('url', `${IMG_URL + poster_path}`);
      location.href = `subindex.html?id=${id}`;
      sessionStorage.setItem('movieId', id);
    };
    main.appendChild(movieE1);
  });
}

function getColor(vote) {
  if (vote >= 8) {
    return 'green';
  } else if (vote >= 5) {
    return 'orange';
  } else {
    return 'red';
  }
}

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const searchTerm = search.value;

  if (searchTerm) {
    getMovies(searchURL + '&query=' + searchTerm);
  } else {
    getMovies(API_URL);
  }
});

//--------

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
