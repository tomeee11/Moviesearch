// 좌석 예매 관련 변수
var selectedSeats = [];
var reservedSeats = ["seat_1_2", "seat_3_4", "seat_5_6"];

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
  if (selectedSeats.length === 0) {
    alert("좌석을 선택해주세요.");
  } else {
    var name = prompt("이름을 입력해주세요.");
    var phoneNumber = prompt("전화번호를 입력해주세요.");

    if (name && phoneNumber) {
      alert(name + "님 좌석 예매가 완료되었습니다.");
      alert("선택한 좌석: " + selectedSeats.join(", "));
      
      // 좌석 예매 완료 후 선택된 좌석들을 초기화
      selectedSeats = [];
      var seatElements = document.getElementsByClassName("seat");
      for (var i = 0; i < seatElements.length; i++) {
        seatElements[i].classList.remove("selected");
      }
    } else {
      alert("이름과 전화번호를 모두 입력해주세요.");
    }
  }
}

// 좌석 배치 생성 함수
function createSeatMap() {
  var seatMap = document.getElementById("seatMap");
  for (var i = 1; i <= 8; i++) {
    for (var j = 1; j <= 8; j++) {
      var seat = document.createElement("div");
      seat.id = "seat_" + i + "_" + j;
      seat.classList.add("seat");
      seat.onclick = function() {
        selectSeat(this);
      };
      seatMap.appendChild(seat);
    }
    seatMap.appendChild(document.createElement("br"));
  }
}

// 좌석 배치 생성 함수 호출
createSeatMap();
