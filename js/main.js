'use strict'

var gCanvas;
var gCtx;


function onInit() {
    gCanvas = document.getElementById('my-canvas')
    gCtx = gCanvas.getContext('2d')
    renderGallery(getImgs())
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
    clearCanvas()

}

function onEditImg(meme) {
    console.log('meme', meme)
    let currMeme = getSavedMemeById(meme)
    drawImg(currMeme.data.selectedImgId)
    drawText(currMeme.data.lines)
    showEditor()
    renderCanvas()
    } 

    function renderCanvas() {
        let currMeme = getMeme()
        drawImg(currMeme.selectedImgId)
    }
    
    function onClickImg(imgId) {
    showEditor()
    _createMeme(imgId)
    renderCanvas()
}

function drawText() {
    const gMeme = getMeme()
    gMeme.lines.forEach(line => {
        gCtx.strokeStyle = line.borderColor
        gCtx.fillStyle = line.fontColor
        gCtx.direction = line.align
        gCtx.font = line.size + 'px ' + line.fontFamily
        gCtx.textAlign = line.align
        gCtx.fillText(line.txt, line.x, line.y)
        gCtx.strokeText(line.txt, line.x, line.y)
        document.querySelector('.meme-txt').placeholder = `${gMeme.lines[gMeme.selectedLineIdx].txt}`
    })
}

function renderGallery(images) {
    showGallery()
    let elheader = `<h2>Choose your favorite Meme</h2>`
    let strHtml = images.map((img) => {
        return `<img class="img-box" src="${img.url}" onclick="onClickImg(${img.id})">`;
    }).join('');
    document.querySelector('.grid-head').innerHTML = elheader;
    document.querySelector('.img-container').innerHTML = strHtml;
}


function renderSavedMemes() {
    const memes = loadMemes()
    console.log('memes', memes)
    if(!memes)  document.querySelector('.grid-head').innerHTML = '<h2>Make Your First Meme</h2>' 
    else {  let strHtml = memes.map((meme) => {
        return `<img class="meme-box" src="${meme.url}" onclick="onEditImg('${meme.id}')">`;
    }).join('');
    document.querySelector('.save-memes-container').innerHTML = strHtml
 }
}

// function toggleMenu() {
//     document.body.classList.toggle('menu-open')
//     document.querySelector('.main-nav').classList.toggle('active')
// }

function onSearchImg(text) {
    if (text.value === '') {
        let gallery = getImgs();
        renderGallery(gallery)
        return
    }
    let img = getSearchImage(text);
    renderGallery(img)
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
    document.querySelector('.save-memes-container').style.display = 'none'
    document.querySelector('.grid-head').innerHTML = `<h2>Edit your Meme</h2>`
}

function showSavedMemes() {
    document.querySelector('.grid-head').innerHTML = `<h2>Your saved Memes</h2>`
    document.querySelector('.edit-memes-container').style.display = 'none'
    document.querySelector('.img-container').style.display = 'none'
    document.querySelector('.save-memes-container').style.display = 'grid'
    renderSavedMemes()
}