'use strict'

var gImgs = [
    { id: 1, url: 'img/meme-img/1.jpg', keywords: ['politics'] },
    { id: 2, url: 'img/meme-img/2.jpg', keywords: ['animals'] },
    // { id: 3, url: 'img/3.jpg', keywords:  },
    // { id: 4, url: 'img/4.jpg', keywords:  },
    // { id: 5, url: 'img/5.jpg', keywords:  },
    // { id: 6, url: 'img/6.jpg', keywords:  },
    // { id: 7, url: 'img/7.jpg', keywords:  },
    // { id: 8, url: 'img/8.jpg', keywords:  },
    // { id: 9, url: 'img/9.jpg', keywords:  },
    // { id: 10, url: 'img/10.jpg', keywords: },
    // { id: 11, url: 'img/11.jpg', keywords: },
    // { id: 12, url: 'img/12.jpg', keywords: },
    // { id: 13, url: 'img/13.jpg', keywords: },
    // { id: 14, url: 'img/14.jpg', keywords: },
    // { id: 15, url: 'img/15.jpg', keywords: },
    // { id: 16, url: 'img/16.jpg', keywords: },
    // { id: 17, url: 'img/17.jpg', keywords: },
    // { id: 18, url: 'img/18.jpg', keywords: },
    
];

var gKeywords = { 'happy': 12, 'funny puk': 1 }
// var gImgs = [{ id: 1, url: 'img/meme-img/1.jpg', keywords: ['happy'] }];
var gMeme = {
    selectedImgId: 1,
    selectedLineIdx: 0,
    lines: [{ txt: 'I never eat Falafel', size: 20, align: 'left', color: 'red' }]
}

function getImgs(){
    return gImgs;
}

function getMemes(){
    return gMeme;
}

function getImgByIdx() {
    return gImgs.findIndex((img) => gMeme.selectedImgId === img.id);
}

function getImgUrl() {
    const imgIdx = getImgByIdx();
    return gImgs[imgIdx].url;
}

function getMemeTxt(){
    return gMeme.lines[0].txt
}

function increaseTxt(){
    gMeme.lines[0].size += 2;
    console.log(gMeme.lines[0].size)
    drawText()
}

function decreaseTxt(){
    gMeme.lines[0].size -= 2;
    console.log(gMeme.lines[0].size)
    renderCanvas()
}

function clearCanvas() {
    gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height)
}


console.log('getImgURL()', getImgUrl())