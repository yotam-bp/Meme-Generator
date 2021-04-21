'use strict'

var gCanvas;
var gCtx;


function onInit() {
    gCanvas = document.getElementById('my-canvas')
    gCtx = gCanvas.getContext('2d')
    renderGallery()
}

function drawImg(imgId) {
    const img = new Image()
    img.src = `img/meme-img/${imgId}.jpg`;
    img.onload = () => {
        if (window.innerWidth <= 500) {
            gCanvas.width = 380;
            gCanvas.height = 380;
        }
        else{
            gCanvas.width = 500;
            gCanvas.height = 500;
        }
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

function onChangeTxtsize(val) {
    changeTxtsize(val)
    renderCanvas()
}

function onMoveLine(val) {
    moveLine(val)
    renderCanvas()
}

function onAddLine() {
    addLine()
    renderCanvas()
}

function onDeleteLine() {
    deleteLine()
    renderCanvas()
}

function onSwitchLines() {
    switchLines()
    renderCanvas()
}

function onChangeAlign(val) {
    ChangeAlign(val)
    renderCanvas()
}

function onChangeFont(val) {
    changeFont(val)
    renderCanvas()
}

function onChangeFontColor(val) {
    changeFontColor(val)
    renderCanvas()
}

function onChangeBorderColor(val) {
    changeBorderColor(val)
    renderCanvas()
}

function downloadImg(elLink) {
    var imgContent = gCanvas.toDataURL("image/png")
    elLink.href = imgContent
}

function onSaveMeme() {
    saveMeme(gCanvas)
    showSavedMemes()
    OpenModal()
}

function OpenModal() {
    // var elModal = document.querySelector('.modal');
    // elModal.classList.toggle('hidden')
}

function onEditImg(imgId) {
    setCurrImgId(imgId)
    showEditor()
    renderCanvas()
}

function onClickImg(imgId) {
    setCurrImgId(imgId)
    showEditor()
    renderCanvas()
}

function renderGallery() {
    // document.querySelector('.edit-memes-container').style.display = 'none'
    // document.querySelector('.save-memes-container').style.display = 'none'
    showGallery()
    let header = `<h2>Choose your favorite Meme</h2>`
    let images = getImgs();
    let strHtml = images.map((img) => {
        return `<img class="img-box" src="${img.url}" onclick="onClickImg(${img.id})">`;
    }).join('');
    document.querySelector('.grid-header').innerHTML = header;
    document.querySelector('.img-container').innerHTML = strHtml;
}

function showGallery() {
    document.querySelector('.edit-memes-container').style.display = 'none'
    document.querySelector('.img-container').style.display = 'grid'
    document.querySelector('.save-memes-container').style.display = 'none'
}
function showEditor() {
    document.querySelector('.img-container').style.display = 'none'
    document.querySelector('.edit-memes-container').style.display = 'flex'
    document.querySelector('.grid-header').innerHTML = `<h2>Edit your Meme</h2>`
}

function showSavedMemes() {
    document.querySelector('.grid-header').innerHTML = `<h2>Your saved Memes</h2>`
    document.querySelector('.edit-memes-container').style.display = 'none'
    document.querySelector('.img-container').style.display = 'none'
    document.querySelector('.save-memes-container').style.display = 'grid'
    renderSavedMemes()
}

function renderSavedMemes() {
    const memes = loadMemes()
    let strHtml = memes.map((meme) => {
        return `<img class="meme-box" src="${meme.canvasData}" onclick="onEditImg(${meme.id})">`;
    }).join('');
    document.querySelector('.save-memes-container').innerHTML = strHtml
}