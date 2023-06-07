let btnSign = document.querySelector('#signin');
let btnHome = document.querySelector('#home');
btnSign.onclick = (e) => {
  e.preventDefault();
  let id = document.querySelector('#id').value;
  let password = document.querySelector('#password').value;
  let passwordCh = document.querySelector('#password_2');
  let storageId = localStorage.getItem(id);
  if (id && password && passwordCh) {
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
  } else {
    if (!id) {
      alert('id를 입력해 주세요');
    }
    if (!password) {
      alert('비밀번호를 입력해 주세요');
    }
    if (!passwordCh) {
      alert('비밀번호 재확인을 해주세요');
    }
  }
};

btnHome.onclick = (e) => {
  e.preventDefault();
  window.location.href = 'index.html';
};
