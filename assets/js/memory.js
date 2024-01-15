const btns = document.querySelectorAll('.memorybtns button');
const hamle = document.querySelector('#hamleSayisi');
const aciklama = document.querySelector('.durum');
const silbtn = document.querySelector('.sil');

for (const btn of btns) {
    btn.addEventListener('click',play);
    
}
let emojis = ['😂','🤣','❤','😍','👌','💋','😎','😜'];

let tamamlanmislar = [];
let sayac = 0;

function tamamlanmis(btn){
    tamamlanmislar.push(btn);
    if(tamamlanmislar.length === 2){
        if(tamamlanmislar[0].innerText === tamamlanmislar[1].innerText){
              tamamlanmislar[0].classList.add('matched');
              tamamlanmislar[1].classList.add('matched');
        }

        tamamlanmislar[0].classList.remove('visible');
        tamamlanmislar[1].classList.remove('visible');
        tamamlanmislar = [];
    }
}
function kacHamle(){
    if(document.querySelectorAll('.matched').length === 16){
        //alert('0-20 -> Çok iyi \n20-40 -> Normal\n40-100 -> Çok kötü');
        hamle.innerText = sayac;
        if(sayac <= 20){
            aciklama.innerText = 'Harika!';
        } else if(sayac > 20 && sayac <= 40){
            aciklama.innerText = 'Hafızanı zorlayabilirsin!';
        }else if(sayac > 40 ){
            aciklama.innerText = 'Çok kötü!'
        }

    }
}
//alert('0-20 -> Çok iyi \n20-40 -> Normal \n40 ve üstü -> Çok kötü');
function play(){
    const btn = this;
    
    if(btn.classList.contains('matched')){
        return;
    }
    sayac +=1;
    btn.classList.add('visible');
    
    setTimeout(function(){tamamlanmis(btn);
        hamle.innerText = sayac;
        kacHamle();
    },500);
    
}
    
function init(){
    let emojilist = [...emojis, ...emojis];
    shuffle(emojilist);

    for (let i = 0; i < btns.length; i++) {
        btns[i].innerText = emojilist[i];
    }
}


function shuffle(array) {
  array.sort(() => Math.random() - 0.5);
}
function startAgain(){
    for (const btn of btns) {
        btn.classList.remove('matched');
        btn.classList.remove('visible');
    }
    
    init();
    sayac = 0;
    hamle.innerText = sayac;
    
}
silbtn.addEventListener('click',startAgain);
init();