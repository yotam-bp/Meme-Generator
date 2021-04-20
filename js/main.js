'use strict'

var gCanvas;
var gCtx;


function onInit() {
    gCanvas = document.getElementById('my-canvas')
    gCtx = gCanvas.getContext('2d')
    renderGallery()
}

function drawImg(imgId){
    const img = new Image()
    img.src = `img/meme-img/${imgId}.jpg`;
    img.onload = () =>  {
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height)
        drawText()
    }
}

function renderCanvas() {
    let currMeme = getMeme()
    drawImg(currMeme.selectedImgId)
}

function onTextEdit(TxtInput) {
     updateText(TxtInput)
     renderCanvas()
}

function onIncreaseTxt(val){
    increaseTxt(val)
    renderCanvas()
}

function onDecreaseTxt(val){
    decreaseTxt(val)
    renderCanvas()
}

function onMoveLineUp(val){
    moveLineUp(val)
    renderCanvas()
}

function onMoveLineDown(val){
    moveLineDown(val)
    renderCanvas()
}

function onAddLine(){
    addLine()
    renderCanvas()
}

function onDeleteLine(){
    deleteLine()
    renderCanvas()
}

function onSwitchLines(){
    switchLines()
    renderCanvas()
}

function onChangeFontColor(val){
changeFontColor(val)
renderCanvas()
}

function onChangeBorderColor(val){
changeBorderColor(val)
renderCanvas()
}

function downloadImg(elLink) {
    var imgContent = gCanvas.toDataURL("image/png")
    elLink.href = imgContent
}

function onSaveMeme(){
    saveMeme(gCanvas)
    OpenModal()
}

function OpenModal() {
    // var elModal = document.querySelector('.modal');
    // elModal.classList.toggle('hidden')
}


function onClickImg(imgId){
    setCurrImgId(imgId)
    const elGallery = document.querySelector('.img-container')
    const elEdit = document.querySelector('.edit-memes-container')
    elGallery.style.display = 'none'
    elEdit.style.display = 'flex'
    renderCanvas()
}

function renderGallery() {
    const elEdit = document.querySelector('.edit-memes-container')
    elEdit.style.display = 'none'
    let images = getImgs(); 
    let strHtml = images.map((img) => {
            return `<img class="img-box" src="${img.url}" onclick="onClickImg(${img.id})">`;
        }).join('');
    document.querySelector('.img-container').innerHTML = strHtml;
}