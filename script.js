//================================
// モールス信号辞書
// 0: 短点
// 1: 長点
// 2: 文字区切り(辞書外)
// 3: 単語区切り(ユーザ指定の空白)
//================================
/* アルファベットモールス辞書 */
let alphabetMorseDict = {
    "a": "01",
    "b": "1000",
    "c": "1010",
    "d": "100",
    "e": "0",
    "f": "0010",
    "g": "110",
    "h": "0000",
    "i": "00",
    "j": "0111",
    "k": "101",
    "l": "0100",
    "m": "11",
    "n": "10",
    "o": "111",
    "p": "0110",
    "q": "1101",
    "r": "010",
    "s": "000",
    "t": "1",
    "u": "001",
    "v": "0001",
    "w": "011",
    "x": "1001",
    "y": "1011",
    "z": "1100",
    "0": "11111",
    "1": "01111",
    "2": "00111",
    "3": "00011",
    "4": "00001",
    "5": "00000",
    "6": "10000",
    "7": "11000",
    "8": "11100",
    "9": "11110",
    ".": "010101",
    ",": "110011",
    ":": "111000",
    "_": "001101",
    "+": "01010",
    "-": "100001",
    "×": "1001",
    "^": "000000",
    "(": "10110",
    ")": "101101",
    "/": "10010",
    "[": "000110",
    "]": "000111",
    "?": "001100",
    ";": "000001",
    "@": "011010",
    "'": "011110",
    "\"": "010010",
    " ": "3"  //空白判定用
}
/* 日本語モールス辞書 */


//================================
// グローバル変数定義・初期値設定
//================================
/* 短点・長点時間設定(ミリ秒) */
let shortPoint = 100;
let longPoint = shortPoint * 3;

/*各種Element取得*/
const morseText = document.getElementById('morseString');
const morseButton = document.getElementById('morseButton');
const debugModeElement = document.getElementById('debugMode');
const wordTypeElement = document.getElementsByName('wordType');
const morseSound = document.getElementById('morse');

/* 入力初期値設定 */
morseText.value = 'SOS';
wordTypeElement[0].checked = true;

/* 処理実行中フラグ */
let isMorseExe = false;
/* デバッグモード実行フラグ */
let isDebugMode = false;

//================================
// sleep処理用定義
//================================
const sleep = (time) => new Promise((resolve) => setTimeout(resolve, time));


//================================
// main関数のようなもの
//================================
function startMorse(){
    let exeMorseWord = [];
    let inputWord = morseText.value;
    isDebugMode = debugModeElement.checked;

    if (!isMorseExe){
        isMorseExe = true;
        if(wordTypeElement[0].checked){
            exeMorseWord = convertAlphabetToMorse(inputWord);
        }else if(wordTypeElement[1].checked){
            alert("Not implemented.");
        }

        try{
            if(!Array.isArray(exeMorseWord)){
                throw new Error(exeMorseWord);
            }

            exeMorse(exeMorseWord);
        }catch (e) {
            alert(e.message);
        }

        isMorseExe = false;
    }
}
    

//================================
// アルファベット→モールス変換
//================================
function convertAlphabetToMorse(subjectWord){
    let repMorse = [];
    let joinMorse = [];

    /* 大文字を小文字に変換する */
    subjectWord = subjectWord.toLowerCase();
    /* 入力された単語を1文字毎に区切る */
    let splitWord = subjectWord.split('');

    /* 辞書から対応するモールス信号を取得する */
    for(let i=0; i<splitWord.length; i++){
        repMorse[i] = alphabetMorseDict[splitWord[i]];
        if(repMorse[i] === undefined){
            return 'ERROR: Input Correct Word';
        }
    }

    /* 全てのモールス信号を結合する */
    for(let i=0; i<repMorse.length; i++){
        let tempList = [];

        /* 空文字ではない場合 */
        if(repMorse[i] != 3){
            tempList = repMorse[i].split('');
            /* 次の文字が空白ではない、かつ終端ではない場合*/
            if(!(i+1 == repMorse.length) && (repMorse[i+1] != 3)){
                tempList.push('2');
            }

        /* 空文字の場合 */
        }else if(repMorse[i] == 3){
            tempList.push('3');
        }

        joinMorse = joinMorse.concat(tempList);
    }

    return joinMorse;
}


//================================
// モールス信号実行
//================================
async function exeMorse(exeMorseCode){
    if(isDebugMode) alert(exeMorseCode);

    morseSound.muted = false;

    for(let i=0; i<exeMorseCode.length; i++){
        if(exeMorseCode[i] == 0){
            document.body.style.background = "red";
            morseSound.play();
            await sleep(shortPoint);
            morseSound.pause();
            
            //playMorseSound(shortPoint);
            document.body.style.background = "white";
            await sleep(shortPoint);
        }else if(exeMorseCode[i] == 1){
            document.body.style.background = "red";
            morseSound.play();
            await sleep(longPoint);
            morseSound.pause();

            //playMorseSound(longPoint);
            document.body.style.background = "white";
            await sleep(shortPoint);
        }else if(exeMorseCode[i] == 2){
            await sleep(longPoint);
        }else if(exeMorseCode[i] == 3){
            await sleep(longPoint * 2);
        }

        morseSound.currentTime = 0;
    }

    morseSound.muted = true;
}


//================================
// モールス音声再生処理
// ※点滅処理が正しく動作しないため未実装
//================================
async function playMorseSound(playTime){
    alert(playTime);
    morseSound.play();
    await sleep(playTime);
    morseSound.pause();
}
