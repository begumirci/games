import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const url = 'https://atvrxcecfzuczmbjrpyu.supabase.co';
const key =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF0dnJ4Y2VjZnp1Y3ptYmpycHl1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY5NDAxMDk5OSwiZXhwIjoyMDA5NTg2OTk5fQ.RoT4aa8R9yxsee9WrtPxIvjlQOdjIgwx7mD0QDcf2Lk';

const supabase = createClient(url, key);

const animasyonYolu = '../../animation.json';

const btns = document.querySelectorAll('.memorybtns button');
const hamle = document.querySelector('#hamleSayisi');
const aciklama = document.querySelector('.durum');
const silbtn = document.querySelector('.sil');
const best = document.querySelector('.best-number');

const drop = document.querySelector('.drop-filter');
const newRecord = document.querySelector('.record');

for (const btn of btns) {
  btn.addEventListener('click', play);
}
let emojis = ['😂', '🤣', '❤', '😍', '👌', '💋', '😎', '😜'];

let tamamlanmislar = [];
let sayac = 0;
let score = 0;
let sayi = 0;

lottie.loadAnimation({
  container: document.querySelector('.animation'),
  renderer: 'svg',
  loop: true,
  autoplay: true,
  path: animasyonYolu,
});

async function tamamlanmis(btn) {
  tamamlanmislar.push(btn);
  if (tamamlanmislar.length === 2) {
    if (tamamlanmislar[0].innerText === tamamlanmislar[1].innerText) {
      tamamlanmislar[0].classList.add('matched');
      tamamlanmislar[1].classList.add('matched');
      sayi++;
    }

    tamamlanmislar[0].classList.remove('visible');
    tamamlanmislar[1].classList.remove('visible');
    tamamlanmislar = [];

    if (sayi == 8) {
      if (sayac < Number(best.innerText)) {
        newRecord.innerText = sayac;
        best.innerText = sayac;

        drop.classList.remove('hidden');
        setTimeout(function () {
          drop.classList.add('hidden');
          startAgain();
        }, 2000);
      }
      const { data, error } = await supabase
        .from('skor')
        .insert([{ skor: sayac }])
        .select();
    }
  }
}

function play() {
  const btn = this;

  if (btn.classList.contains('matched')) {
    return;
  }
  sayac += 1;
  btn.classList.add('visible');

  setTimeout(function () {
    tamamlanmis(btn);
    hamle.innerText = sayac;
  }, 500);
}

async function init() {
  let emojilist = [...emojis, ...emojis];
  shuffle(emojilist);

  for (let i = 0; i < btns.length; i++) {
    btns[i].innerText = emojilist[i];
  }

  let { data: skor, error } = await supabase.from('skor').select('skor');

  let enKucuk = skor[0].skor;

  for (let i = 0; i < skor.length; i++) {
    if (skor[i].skor < enKucuk) {
      enKucuk = skor[i].skor;
    }
  }
  best.innerText = enKucuk;
}

function shuffle(array) {
  array.sort(() => Math.random() - 0.5);
}
function startAgain() {
  for (const btn of btns) {
    btn.classList.remove('matched');
    btn.classList.remove('visible');
  }
  init();
  sayac = 0;
  hamle.innerText = sayac;
  drop.classList.add('hidden');
}
silbtn.addEventListener('click', startAgain);

init();
