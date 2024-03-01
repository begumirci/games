const btns = document.querySelectorAll('.buttons button');
const kazanan = document.querySelector('#kazanan');

const x = document.querySelector('#x');
const o = document.querySelector('#o');

const tekrar = document.querySelector('.return');
const yeniden = document.querySelector('.reset');
const tekrar2 = document.querySelector('.return-img');
const tekrar3 = document.querySelector('#cancel');

const imgElement = document.querySelector('.turn');
const ties = document.querySelector('#tie');
const drop = document.querySelector('.drop-filter');
const winnerElement = document.querySelector('.winner');
const changeColor = document.querySelector('.show-winner');

const drop2 = document.querySelector('.drop-filter-2');
const question = document.querySelector('.quit');
let sayac = 0;
isX = true;
let char = '';

question.addEventListener('click', function () {
  drop2.classList.remove('hidden');
  reset.addEventListener('click', clearAll);
});

function play() {
  if (this.innerText !== '') {
    return;
  }

  if (isX) {
    char = 'X';
    isX = false;
    this.classList.add('x-class');
    this.classList.remove('o-class');
    imgElement.src = 'assets/img/oturn.svg';
  } else {
    char = 'O';
    isX = true;
    this.classList.add('o-class');
    this.classList.remove('x-class');
    imgElement.src = 'assets/img/xturn.svg';
  }

  this.innerText = char;
  check();
}

for (const btn of btns) {
  btn.addEventListener('mouseenter', function () {
    if (!this.classList.contains('x-class')) {
      if (isX) {
        this.classList.add('x-hover');
      } else {
        this.classList.add('o-hover');
      }
    }
  });
  btn.addEventListener('mouseleave', function () {
    this.classList.remove('x-hover');
    this.classList.remove('o-hover');
  });
  btn.addEventListener('click', play);
}

const list = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 4, 8],
  [2, 4, 6],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
];

function control(donus) {
  for (const item of donus) {
    if (btns[item].innerText === '') {
      return false;
    }
  }
  if (
    btns[donus[0]].innerText === btns[donus[1]].innerText &&
    btns[donus[1]].innerText === btns[donus[2]].innerText
  ) {
    drop.classList.remove('hidden');
    return true;
  }
  return false;
}
let xSayac = 0;
let oSayac = 0;

function check() {
  let winner = '';
  for (const donus of list) {
    if (control(donus)) {
      winner = btns[donus[0]].innerText;
    }
  }
  if (winner === 'X') {
    xSayac++;
    x.innerText = xSayac;
    winnerElement.src = 'assets/img/x.svg';
    changeColor.style.color = '#31C3BD';
  }
  if (winner === 'O') {
    oSayac++;
    o.innerText = oSayac;
    winnerElement.src = 'assets/img/o.svg';
    changeColor.style.color = '#F2B137';
  }
}
tekrar.addEventListener('click', again);
yeniden.addEventListener('click', clearAll);
tekrar2.addEventListener('click', again);
tekrar3.addEventListener('click', again);

function again() {
  console.log('hi');
  sayac++;
  ties.innerText = sayac.toString();
  drop.classList.add('hidden');
  drop2.classList.add('hidden');

  isX = true;
  for (const silinecek of btns) {
    silinecek.innerText = '';
    silinecek.classList.remove('o-class');
    silinecek.classList.remove('x-class');
  }
}

function clearAll() {
  check();
  oSayac = 0;
  xSayac = 0;
  sayac = 0;
  drop2.classList.add('hidden');
  drop.classList.add('hidden');

  for (const silinecek of btns) {
    silinecek.innerText = '';
    silinecek.classList.remove('o-class');
    silinecek.classList.remove('x-class');
  }

  x.innerText = oSayac;
  o.innerText = xSayac;
  ties.innerText = sayac;
}
