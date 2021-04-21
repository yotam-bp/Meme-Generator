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
var gMeme

function _createMeme(imgId) {
    gMeme = {
        id: makeId(),
        selectedImgId: imgId,
        selectedLineIdx: 0,
        lines:
            [{
                txt: 'text here',
                size: 40,
                borderColor: '#000000',
                fontFamily: 'impact',
                fontColor: '#ffffff',
                align: 'center',
                x: 250,
                y: 50
            }]
    }
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

function getImgUrl() {
    const imgIdx = getImgByIdx();
    return gImgs[imgIdx].url;
}

function updateText(TxtInput) {
    gMeme.lines[gMeme.selectedLineIdx].txt = TxtInput
}

function changeTxtsize(val) {
    gMeme.lines[gMeme.selectedLineIdx].size += val
}

function moveLine(val) {
    gMeme.lines[gMeme.selectedLineIdx].y += val
}

function ChangeAlign(val) {
    gMeme.lines[gMeme.selectedLineIdx].align = val
}

function addLine() {
    if (gMeme.lines.length ===0) {
        var x = 250
        var y = 50
    }
    else if (gMeme.lines.length === 1) {
        var x = 250
        var y = 450
    }
    else {
        var x = 250
        var y = 250
    }
    gMeme.selectedLineIdx++
    let line = {
        txt: 'add text',
        size: 40,
        borderColor: 'black',
        fontFamily: 'impact',
        fontColor: 'white',
        align: 'center',
        x,
        y
    };
    gMeme.lines.push(line)
}

function deleteLine() {
    if (gMeme.lines.length === 0) return
    gMeme.lines.splice([gMeme.selectedLineIdx], 1)
    gMeme.selectedLineIdx--
}

function changeFontColor(color) {
    gMeme.lines[gMeme.selectedLineIdx].fontColor = color
}

function changeBorderColor(color) {
    gMeme.lines[gMeme.selectedLineIdx].borderColor = color
}

function changeFont(font) {
    gMeme.lines[gMeme.selectedLineIdx].fontFamily = font
}

function switchLines() {
    if (gMeme.lines.length === 0) return;
    if (gMeme.selectedLineIdx + 1 === gMeme.lines.length) gMeme.selectedLineIdx = 0;
    else gMeme.selectedLineIdx++;
    gMeme.lines[gMeme.selectedLineIdx].borderColor = 'red'

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
    console.log(gSavedMemes)
}

function loadMemes() {
    gSavedMemes = loadFromStorage(MEMES_KEY)
    if (!gSavedMemes || gSavedMemes.length === 0) return;
    return gSavedMemes;
}

// function getSearchImage(text) {
//     var images = []
//     gImgs.map(img => {
//         img.keywords.map(keyword => {
//             if (keyword.toLowerCase().includes(text)) {
//                 images.push(img);
//             }
//         })
//     })
//     return images;
// }

