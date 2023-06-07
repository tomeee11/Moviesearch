window.onload = () => {
  sessionStorage.setItem('logined', 'false');
};

let inputs = document.querySelectorAll('input');
let logInBtn = document.querySelector('#log-in');

logInBtn.onclick = (e) => {
  e.preventDefault();
  let id = inputs[0].value;
  let password = inputs[1].value;

  if (id && password) {
    if (password === localStorage.getItem(id)) {
      sessionStorage.setItem('id', id);
      alert('로그인되었습니다.');
      window.location.href = '/';
    }
    if (localStorage.getItem(id) === null) {
      console.log(localStorage.getItem(id));
      inputs[0].nextElementSibling.textContent = 'Username NOT match';
      setTimeout(() => {
        inputs[0].nextElementSibling.textContent = '';
      }, 2000);
    }
    if (password !== localStorage.getItem(id)) {
      inputs[1].nextElementSibling.textContent = 'Passwod NOT match';
      setTimeout(() => {
        inputs[1].nextElementSibling.textContent = '';
      }, 2000);
    }
  } else {
    if (id === '') {
      inputs[0].nextElementSibling.textContent = 'Username is empty';
      setTimeout(() => {
        inputs[0].nextElementSibling.textContent = '';
      }, 2000);
    }
    if (password === '') {
      inputs[1].nextElementSibling.textContent = 'Password is empty';
      setTimeout(() => {
        inputs[1].nextElementSibling.textContent = '';
      }, 2000);
    }
  }
};
