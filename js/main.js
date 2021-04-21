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
            gCanvas.width = 300;
            gCanvas.height = 300;
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
   
}

// function onEditImg(memeId) {
//     showEditor()
//     renderCanvas()
// }

function onClickImg(imgId) {
    showEditor()
    _createMeme(imgId)
    renderCanvas()
}

function renderGallery() {
    showGallery()
    let elheader = `<h2>Choose your favorite Meme</h2>`
    let images = getImgs();
    let strHtml = images.map((img) => {
        return `<img class="img-box" src="${img.url}" onclick="onClickImg(${img.id})">`;
    }).join('');
    document.querySelector('.grid-head').innerHTML = elheader;
    document.querySelector('.img-container').innerHTML = strHtml;
}

function showGallery() {
    document.querySelector('.edit-memes-container').style.display = 'none'
    document.querySelector('.img-container').style.display = 'grid'
    document.querySelector('.save-memes-container').style.display = 'none'
    document.querySelector('.grid-head').innerHTML = `<h2>Choose your favorite Meme</h2>`
}
function showEditor() {
    document.querySelector('.img-container').style.display = 'none'
    document.querySelector('.edit-memes-container').style.display = 'flex'
    document.querySelector('.grid-head').innerHTML = `<h2>Edit your Meme</h2>`
}

function showSavedMemes() {
    document.querySelector('.grid-head').innerHTML = `<h2>Your saved Memes</h2>`
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

function toggleMenu() {
    document.body.classList.toggle('menu-open')
    document.querySelector('.main-nav').classList.toggle('active')
}



// -----To Finish--------
// function onSearchImg(text) {
//     if (text.value === '') {
//         let gallery = getImgs();
//         renderGallery(gallery)
//         return
//     }
//     let images = getSearchImage(text);
//     renderGallery(images);
// }