'use strict'

const MEMES_KEY = 'saved memes';
var gSavedMemes = [];
var gMeme
var gKeywords = { 'happy': 12, 'funny puk': 1 }

var gImgs = [
    { id: 1, url: 'img/meme-img/1.jpg', keywords: ['politics'] },
    { id: 2, url: 'img/meme-img/2.jpg', keywords: ['animals', 'cute'] },
    { id: 3, url: 'img/meme-img/3.jpg', keywords: ['animals', 'cute', 'baby'] },
    { id: 4, url: 'img/meme-img/4.jpg', keywords: ['animals', 'cute'] },
    { id: 5, url: 'img/meme-img/5.jpg', keywords: ['baby', 'cute'] },
    { id: 6, url: 'img/meme-img/6.jpg', keywords: ['tv', 'funny'] },
    { id: 7, url: 'img/meme-img/7.jpg', keywords: ['cute', 'baby', 'funny'] },
    { id: 8, url: 'img/meme-img/8.jpg', keywords: ['tv', 'funny'] },
    { id: 9, url: 'img/meme-img/9.jpg', keywords: ['cute', 'baby', 'funny'] },
    { id: 10, url: 'img/meme-img/10.jpg', keywords: ['politics', 'funny'] },
    { id: 11, url: 'img/meme-img/11.jpg', keywords: ['sports','funny'] },
    { id: 12, url: 'img/meme-img/12.jpg', keywords: ['tv'] },
    { id: 13, url: 'img/meme-img/13.jpg', keywords: ['movies'] },
    { id: 14, url: 'img/meme-img/14.jpg', keywords: ['movies'] },
    { id: 15, url: 'img/meme-img/15.jpg', keywords: ['movies'] },
    { id: 16, url: 'img/meme-img/16.jpg', keywords: ['tv', 'funny'] },
    { id: 17, url: 'img/meme-img/17.jpg', keywords: ['politics'] },
    { id: 18, url: 'img/meme-img/18.jpg', keywords: ['tv','kids'] },

];


function _createMeme(imgId) {
    gMeme = {
        id: makeId(),
        selectedImgId: imgId,
        selectedLineIdx: 0,
        lines:
            [{
                txt: 'Add text',
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

function getLinesCount() {
    return gMeme.lines.length;
}

function getImgs() {
    return gImgs;
}

function getMeme() {
    return gMeme;
}

function getImgById(imgId) {
    var img = gImgs.find(img => {
        return imgId === img.id;
    })
    return img;
}

function clearCanvas() {
    gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height)
}

// function getSavedMemeByIdx() {
// return gSavedMemes.findIndex(meme => gSavedMemes.id === meme.id)
// }

function getImgByIdx() {
    return gImgs.findIndex(img => gMeme.selectedImgId === img.id);
}

function getSavedMemeById(memeId) {
    let memes = loadMemes()
    let meme = memes.find(meme => {
        return memeId === meme.id;
    })
     return meme;
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

function saveMeme() {
    let currMeme = {
        id: makeId(),
        data: gMeme,
        url: gCanvas.toDataURL('image/jpeg')
    }
    gSavedMemes.push(currMeme);
    saveToStorage(MEMES_KEY, gSavedMemes)

}

function loadMemes() {
    gSavedMemes = loadFromStorage(MEMES_KEY)
    if (!gSavedMemes || gSavedMemes.length === 0) return;
    return gSavedMemes;
}

function getSearchImage(text) {
    return gImgs.filter(img => {
        return img.keywords.filter(keyword => {
            return keyword.includes(text)
        }).length
    })
}




