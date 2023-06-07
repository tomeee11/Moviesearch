// 영화 ID 출력 함수
function displayMovieID() {
  var movieID = sessionStorage.getItem("movieID");
  if (movieID) {
    var movieIDElement = document.getElementById("movieID");
    movieIDElement.innerText = "영화 ID: " + movieID;
  }
}

// 사용자 로그인 여부 확인
let asv = sessionStorage.getItem('id')
  if (asv) {}

// 좌석 예매 관련 변수
var selectedSeats = [];
var reservedSeats = ["seat_1_2", "seat_3_4", "seat_5_6"]; // 예매 완료된 좌석 ID 목록

// 좌석 선택 함수
function selectSeat(seat) {
  if (seat.classList.contains("reserved")) {
    alert("이미 예매된 좌석입니다.");
    return;
  }

  if (seat.classList.contains("selected")) {
    seat.classList.remove("selected");
    selectedSeats.splice(selectedSeats.indexOf(seat.id), 1);
  } else {
    if (selectedSeats.length < 4) {
      seat.classList.add("selected");
      selectedSeats.push(seat.id);
    } else {
      alert("한 사람당 최대 4좌석까지만 예매할 수 있습니다.");
    }
  }
}

// 좌석 예매 함수
function reserveSeats() {
  if (asv) {
    alert("로그인이 필요합니다.");
    return;
  }

  if (selectedSeats.length === 0) {
    alert("좌석을 선택해주세요.");
  } else {
    alert("예매가 완료되었습니다.");
    alert("선택한 좌석: " + selectedSeats.join(", "));

    // 좌석 예매 완료 후 선택된 좌석들을 초기화
    selectedSeats = [];
    var seatElements = document.getElementsByClassName("seat");
    for (var i = 0; i < seatElements.length; i++) {
      seatElements[i].classList.remove("selected");
    }
  }
}

// 좌석 배치 생성 함수
function createSeatMap() {
  var seatMap = document.getElementById("seatMap");
  for (var i = 1; i <= 8; i++) {
    for (var j = 1; j <= 8; j++) {
      var seatId = "seat_" + i + "_" + j;
      var seat = document.createElement("div");
      seat.id = seatId;
      seat.classList.add("seat");

      if (reservedSeats.includes(seatId)) {
        seat.classList.add("reserved");
      } else {
        seat.onclick = function () {
          selectSeat(this);
        };
      }

      seatMap.appendChild(seat);
    }
    seatMap.appendChild(document.createElement("br"));
  }
}

// 사용자 로그인 상태 확인 함수
function checkLoginStatus() {
  isLoggedIn = true; // 예시로 로그인 상태를 true로 설정
}

// 페이지 로드 시 로그인 상태 확인
checkLoginStatus();

// 좌석 배치 생성 함수 호출
createSeatMap();

// 페이지 로드 시 영화 ID 출력
displayMovieID();