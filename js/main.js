'use strict'

var gCanvas;
var gCtx;
var gCurrImg;

function onInit() {
    gCanvas = document.getElementById('my-canvas')
    gCtx = gCanvas.getContext('2d')
    renderCanvas()
    renderGallery()
}

drawText(getMemeTxt(), 225, 225)

function renderCanvas(){
     getCurrImg()
     const meme = getMemes()
    const img = new Image()
    img.src = gCurrImg;
    img.onload = () =>  {
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height)
    }
}


function getCurrImg(){
    gCurrImg = getImgUrl();
}

function onTextEdit(TxtInput) {
    const txt = TxtInput.value;
    drawText(txt, 250, 100);
     renderCanvas();
}

function onIncreaseTxt(){
    increaseTxt()
    renderCanvas()
}

function onDecreaseTxt(){
    decreaseTxt()
}

function drawText(text,x, y) {
// const memes = getMemes()
// console.log('memes', memes.lines)
    // gCtx.lineWidth = 2
    // gCtx.strokeStyle = 'black'; 
    // gCtx.fillStyle = 'white';
    // gCtx.font = `${line.size}px`;
    // gCtx.fillText(line.text, line.x, line.y);
    // gCtx.strokeText(line.text, line.x, line.y);
// memes.lines.forEach(line => {
    // })
     setTimeout (() =>{
    gCtx.strokeStyle = 'black'
    gCtx.fillStyle = 'white'
    gCtx.font = `40px impact`
    gCtx.textAlign = 'center'
    gCtx.fillText(text, x, y)
    gCtx.strokeText(text, x, y)
},1000);
}

function renderGallery() {
    let images = getImgs();
    let strHtml;
    strHtml += images.map((img) => {
            return `<img class="img-box" src="${img.url}" onclick="onClickImg(${img.id})">`;
        }).join('');
    document.querySelector('.gallery-container').innerHTML = strHtml;
}