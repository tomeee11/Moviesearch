const booked = sessionStorage.setItem('booked', 'false');
const id = sessionStorage.getItem('id');
const url = sessionStorage.getItem('url');
const title = sessionStorage.getItem('title');
const screen = document.querySelector('#screen');
let logined = sessionStorage.getItem('logined');
let logInBtn2 = document.querySelector('#loginbar');
const header = document.querySelector('#welcome-txt');

const checkLogin = (logined, id) => {
  if (logined === 'true') {
    logInBtn2.innerText = `로그아웃`;
    const welcome = document.createElement('p');
    welcome.innerHTML = `<span id="loginedId">${id}</span> 님 환영합니다!`;
    welcome.id = 'welcome';
    header.append(welcome);
    logInBtn2.setAttribute('data-bs-toggle', '');
    logInBtn2.onclick = () => {
      sessionStorage.setItem('logined', 'false');
      sessionStorage.removeItem('id');
      window.location.reload();
    };

    screen.innerHTML = `<img id='movie_url' src="${url}">`;
  }
};

checkLogin(logined, id);

//..--------------------------------------로그인 상태확인---------------------------------------------------------------------------------------------

// 좌석 예매 관련 변수
var selectedSeats = [];
var reservedSeats = ['seat_1_2', 'seat_3_4', 'seat_5_6']; // 예매 완료된 좌석 ID 목록

// 좌석 선택 함수
function selectSeat(seat) {
  if (seat.classList.contains('reserved')) {
    alert('이미 예매된 좌석입니다.');
    return;
  }

  if (seat.classList.contains('selected')) {
    seat.classList.remove('selected');
    selectedSeats.splice(selectedSeats.indexOf(seat.id), 1);
  } else {
    if (selectedSeats.length < 4) {
      seat.classList.add('selected');
      selectedSeats.push(seat.innerText);
    } else {
      alert('한 사람당 최대 4좌석까지만 예매할 수 있습니다.');
    }
  }
}

// 좌석 예매 함수
function reserveSeats() {
  if (!logined) {
    alert('로그인이 필요합니다.');
    return;
  }

  if (selectedSeats.length === 0) {
    alert('좌석을 선택해주세요.');
  } else {
    alert('예매가 완료되었습니다.');

    const bookList = document.querySelector('#book_list');
    const bookID = document.createElement('li');
    bookList.replaceChildren();
    const bookTitle = document.createElement('li');
    const bookSeats = document.createElement('li');
    const bookPrice = document.createElement('li');
    bookID.innerHTML = `<span>아이디:</span>\t${id}님`;
    bookTitle.innerHTML = `<span class='booking-li'>예약하신 영화:</span>\t${title}`;
    const selected = selectedSeats.reduce((a, b) => a + ' , ' + b);
    bookSeats.innerHTML = `<span>예약한 좌석:</span>\t${selected}`;
    const price = 10000 * selectedSeats.length;
    bookPrice.innerHTML = `<span>결제하신 금액:</span>\t${price}원`;
    // document.querySelector('#book_modal').style.boxShadow =
    //   '2px 2px 4px rgba(0, 0, 0, 0.5)';
    // document.querySelector('#seatMap').innerHTML = '';
    document.querySelector('#book_btn').disabled = true;
    bookList.append(bookID);
    bookList.append(bookTitle);
    bookList.append(bookSeats);
    bookList.append(bookPrice);

    // 좌석 예매 완료 후 선택된 좌석들을 초기화
    //selectedSeats = [];
    //var seatElements = document.getElementsByClassName('seat');
    // for (var i = 0; i < seatElements.length; i++) {
    //   seatElements[i].classList.remove('selected');
    // }
  }
}

// 좌석 배치 생성 함수
function createSeatMap() {
  var seatMap = document.getElementById('seatMap');
  for (var i = 1; i <= 8; i++) {
    for (var j = 1; j <= 8; j++) {
      var seatId = 'seat_' + i + '_' + j;
      var seat = document.createElement('div');
      seat.id = seatId;
      seat.classList.add('seat');
      switch (i) {
        case 1:
          seat.innerText = `a-${j}`;
          break;
        case 2:
          seat.innerText = `b-${j}`;
          break;
        case 3:
          seat.innerText = `c-${j}`;
          break;
        case 4:
          seat.innerText = `d-${j}`;
          break;
        case 5:
          seat.innerText = `e-${j}`;
          break;
        case 6:
          seat.innerText = `f-${j}`;
          break;
        case 7:
          seat.innerText = `g-${j}`;
          break;
        case 8:
          seat.innerText = `h-${j}`;
          break;
      }
      if (reservedSeats.includes(seatId)) {
        seat.classList.add('reserved');
      } else {
        seat.onclick = function () {
          selectSeat(this);
        };
      }

      seatMap.appendChild(seat);
    }
    seatMap.appendChild(document.createElement('br'));
  }
}

// 좌석 배치 생성 함수 호출
createSeatMap();
