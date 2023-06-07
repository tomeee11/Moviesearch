let btnReg = document.querySelector('#regist');
let btnCancel = document.querySelector('#cancel');
btnReg.onclick = (e) => {
  e.preventDefault();
  let id = document.querySelector('#id').value;
  let password = document.querySelector('#password').value;
  let passwordCh = document.querySelector('#password_2');
  let storageId = localStorage.getItem(id);

  if (password === passwordCh.value) {
    if (storageId === null) {
      localStorage.setItem(id, password);
      alert('등록되었습니다.');
      window.location.href = 'login.html';
    } else {
      document.querySelector('#id').focus();
      alert('사용중인 ID입니다.');
    }
  } else {
    passwordCh.focus();
    alert('비밀번호가 다릅니다.');
  }
};

btnCancel.onclick = (e) => {
  e.preventDefault();
  window.location.href = 'index.html';
};

const imagePaths = [
  './assets/slide1.jpg',
  './assets/slide2.jpg',
  './assets/slide3.jpg',
];

const backgroundBody = document.body;

function changeBackgroundImage() {
  const randomImagePath =
    imagePaths[Math.floor(Math.random() * imagePaths.length)];

  backgroundBody.style.backgroundImage = `url('${randomImagePath}')`;
}

setInterval(changeBackgroundImage, 3000);
