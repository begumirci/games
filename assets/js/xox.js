const btns = document.querySelectorAll('.btn button');
const kazanan = document.querySelector('#kazanan');
const reset = document.querySelector('#reset');
const x = document.querySelector('#x');
const o = document.querySelector('#o');
let sayac = 0;
isX = true;
let char = '';
function play(){
    if (this.innerText !== '') {

        return;
    }

    

    if (isX) {
        char = 'X';
        isX = false;
        
    } else{

        char = 'O';
        isX = true;
    }

    this.innerText = char;
    check();
    
    
}



for (const btn of btns) {
    btn.addEventListener('click',play);
}

const list = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,4,8],
    [2,4,6],
    [0,3,6],
    [1,4,7],
    [2,5,8]
]



function control(donus){
    for (const item of donus) {
        if(btns[item].innerText === ''){
            return false;
        };
        
    }

    if(btns[donus[0]].innerText === btns[donus[1]].innerText && btns[donus[1]].innerText === btns[donus[2]].innerText){
       return true;
    }
    return false;

}
let xSayac = 0;
let oSayac = 0;
x.innerText = '0';
o.innerText = '0';
function check(){
    /*
    if(btns[0].innerText === btns[1].innerText && btns[1].innerText === btns[2].innerText){
        console.log('Kazandınız!')
    }*/
    
    let winner = '';
    for (const donus of list) {
        if(control(donus)){
            winner = btns[donus[0]].innerText;
        };
         
    }
    if(winner === 'X'){
        xSayac = +1;
        x.innerText = xSayac;
        
    }
    if(winner === 'O') {
        oSayac = +1;
        o.innerText = oSayac;
    }
    if(xSayac > oSayac){

        kazanan.innerText = 'X';

    } else if (oSayac > xSayac) {

        kazanan.innerText = 'O';
    } else if (xSayac === oSayac && (xSayac !== 0 || oSayac !==0)){
        kazanan.innerText = 'Berabere !';
    }
        

    
    
   
}
function clearAll(){
    check();
    const resetsbtn = document.querySelectorAll('.btncls');
    for (const silinecek of resetsbtn) {

        silinecek.textContent = ''; 
    }
    kazanan.innerText = '';
    oSayac = 0;
    xSayac = 0;
    x.innerText = '';
    o.innerText = '';
}
reset.addEventListener('click',clearAll);