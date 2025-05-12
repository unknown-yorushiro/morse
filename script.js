/*sleep処理用定義*/
const sleep = (time) => new Promise((resolve) => setTimeout(resolve, time));


/* アルファベットのモールス信号辞書
 * 0: 短点
 * 1: 長点
 */
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
}

function morseCheck(inputMorse){
    let repMorse = [];
    let joinMorse = [];
    inputMorse = inputMorse.toLowerCase();
    let splitStr = inputMorse.split('');

    for(let i=0; i<splitStr.length; i++){
        repMorse[i] = alphabetMorseDict[splitStr[i]];
    }
    
    for(let i=0; i<repMorse.length; i++){
        let tempList = [];
        if(repMorse[i] !== undefined){
            tempList = repMorse[i].split('');
        }else if(repMorse[i] === undefined){
            tempList.push('');
        }
        tempList.push('');
        joinMorse = joinMorse.concat(tempList);
    }
    joinMorse.pop();

    exeMorse(joinMorse);

}

async function exeMorse(morseStr){
    alert(morseStr);
    for(let i=0; i<morseStr.length; i++){
        if(!morseStr[i]){
            await sleep(200);
        }else if(morseStr[i] == 1){
            document.body.style.background = "red";
            await sleep(400);
        }else if(morseStr[i] == 0){
            document.body.style.background = "red";
            await sleep(200);
        }

        document.body.style.background = "white";
        await sleep(100);
    }
}
