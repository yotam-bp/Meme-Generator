'use strict'

const MEMES_KEY = 'saved memes';
var gSavedMemes = [];

var gImgs = [
    { id: 1, url: 'img/meme-img/1.jpg', keywords: ['politics'] },
    { id: 2, url: 'img/meme-img/2.jpg', keywords: ['animals'] },
    { id: 3, url: 'img/meme-img/3.jpg', keywords: [] },
    { id: 4, url: 'img/meme-img/4.jpg', keywords: [] },
    { id: 5, url: 'img/meme-img/5.jpg', keywords: [] },
    { id: 6, url: 'img/meme-img/6.jpg', keywords: [] },
    { id: 7, url: 'img/meme-img/7.jpg', keywords: [] },
    { id: 8, url: 'img/meme-img/8.jpg', keywords: [] },
    { id: 9, url: 'img/meme-img/9.jpg', keywords: [] },
    { id: 10, url: 'img/meme-img/10.jpg', keywords: [] },
    { id: 11, url: 'img/meme-img/11.jpg', keywords: [] },
    { id: 12, url: 'img/meme-img/12.jpg', keywords: [] },
    { id: 13, url: 'img/meme-img/13.jpg', keywords: [] },
    { id: 14, url: 'img/meme-img/14.jpg', keywords: [] },
    { id: 15, url: 'img/meme-img/15.jpg', keywords: [] },
    { id: 16, url: 'img/meme-img/16.jpg', keywords: [] },
    { id: 17, url: 'img/meme-img/17.jpg', keywords: [] },
    { id: 18, url: 'img/meme-img/18.jpg', keywords: [] },

];

var gKeywords = { 'happy': 12, 'funny puk': 1 }
 var gMeme  = {
    selectedImgId: 5,
    selectedLineIdx: 0,
    lines: [{
        txt: 'I never eat Falafel',
        size: 40,
        borderColor: '#000000',
        fontFamily: 'impact',
        fontColor: '#ffffff',
        x: 120,
        y: 100
    }]
}

function drawText() {
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

function getLinesCount() {
    return gMeme.lines.length;
}

function getImgs() {
    return gImgs;
}

function getMeme() {
    return gMeme;
}

function getImgByIdx() {
    return gImgs.findIndex((img) => gMeme.selectedImgId === img.id);
}

function setCurrImgId(imgId) {
    gMeme.selectedImgId = imgId
}

function getImgUrl() {
    const imgIdx = getImgByIdx();
    return gImgs[imgIdx].url;
}

function updateText(TxtInput) {
    gMeme.lines[gMeme.selectedLineIdx].txt = TxtInput
}

function getMemeTxt() {
    return gMeme.lines[gMeme.selectedLineIdx].txt
}

function increaseTxt(val) {
    gMeme.lines[gMeme.selectedLineIdx].size += val
}

function decreaseTxt(val) {
    gMeme.lines[gMeme.selectedLineIdx].size -= val
}

function moveLineUp(val) {
 gMeme.lines[gMeme.selectedLineIdx].y -= val
}

function moveLineDown(val) {
    gMeme.lines[gMeme.selectedLineIdx].y += val
}

function clearCanvas() {
    gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height)
}


function addLine() {
    gMeme.selectedLineIdx++
    let line = {
        txt: 'add text',
        size: 40,
        borderColor: 'black',
        fontFamily: 'impact',
        fontColor: 'white',
        x :150,
        y: 150
    };
    gMeme.lines.push(line)
}

function deleteLine(){
    if (gMeme.lines.length===0) return
    gMeme.lines.splice([gMeme.selectedLineIdx], 1)
    gMeme.selectedLineIdx--
}

function changeFontColor(color) {
    gMeme.lines[gMeme.selectedLineIdx].fontColor = color
}

function changeBorderColor(color) {
    gMeme.lines[gMeme.selectedLineIdx].borderColor = color
}

function switchLines() {
    if (gMeme.lines.length===0) return
    if (gMeme.selectedLineIdx > gMeme.lines.length - 1) {
        gMeme.selectedLineIdx = 0
        return
    }
    gMeme.selectedLineIdx--
}

// upload to facebook
function uploadImg(elForm, ev) {
    ev.preventDefault();
    document.getElementById('imgData').value = gCanvas.toDataURL("image/jpeg");

    function onSuccess(uploadedImgUrl) {
        uploadedImgUrl = encodeURIComponent(uploadedImgUrl)
        document.querySelector('.btn-share').innerHTML = `
        <a class="btn" href="https://www.facebook.com/sharer/sharer.php?u=${uploadedImgUrl}&t=${uploadedImgUrl}" title="Share on Facebook" target="_blank" onclick="window.open('https://www.facebook.com/sharer/sharer.php?u=${uploadedImgUrl}&t=${uploadedImgUrl}'); return false;">
           Share   
        </a>`
    }
    let inputVal = elForm.querySelector('input').value
    doUploadImg(elForm, onSuccess, inputVal);
}

function doUploadImg(elForm, onSuccess) {
    var formData = new FormData(elForm);
    console.log('doUploadImg -> formData', formData)
    fetch('//ca-upload.com/here/upload.php', {
        method: 'POST',
        body: formData
    })
        .then(function (res) {
            return res.text()
        })
        .then(onSuccess)
        .catch(function (err) {
            console.error(err)
        })
}

function saveMeme(canvas) {
    let currMeme = {
        id: makeId(),
        meme: gMeme,
        canvasData: canvas.toDataURL('image/jpeg')
    }
    gSavedMemes.push(currMeme);
    saveToStorage(MEMES_KEY, gSavedMemes)
}


