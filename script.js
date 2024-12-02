
document.addEventListener("DOMContentLoaded", () => {
    startLoad()
  });


///game
const scrGame = document.querySelector('.screen-game');
function showGame() {
    scrGame.classList.remove('hidden');
    scrGame.setAttribute('style', 'background: #000000a9;');
}
function hideGame() {
    scrGame.classList.add('hidden');
}

//screen-preloader
const preloader = document.querySelector('.screen-preloader');
function showPreloader() {
    preloader.classList.remove('hidden');
}
function hidePreloader() {
    preloader.classList.add('hidden');
    
}

///progress bar 
const loaderPrecent = document.getElementById('loader-precent');
const loaderBar = document.querySelector('.loader-bar-progress');

function setProgress(progress) {
    loaderPrecent.textContent = progress;
    loaderBar.style.width = `${progress}%`;
}

function startLoad() {
    let count = 10;
    setInterval(()=> {
        if(count < 100) {
            setProgress(count);
        count = count + 7;
        } else {
            setProgress(100);
            preloader.classList.add('start-menu')
        }
        
    },100)
}

//game screen with box 
const gameBox = document.querySelector('.game-box');
function showGameBox() {
    gameBox.classList.remove('hidden');
    
}
function hideGameBox() {
    gameBox.classList.add('hidden');
    scrGame.setAttribute('style', '');
}
//game screen with box 
const gameShot = document.querySelector('.camera-shot');
function showGameShot() {
    gameShot.classList.remove('hidden')
}
function hideGameShot() {
    gameShot.classList.add('hidden');
}

///screenshot-container
const screenShotScreen = document.querySelector('.screenshot-container');
function showScreenShot() {
    screenShotScreen.classList.remove('hidden');
    showShotBlock();
    
}
function hideScreenShot() {
    screenShotScreen.classList.add('hidden');
}

const screenshotBlock = document.querySelector('.screenshot-block');
function showShotBlock() {
    screenshotBlock.classList.remove('hidden')
}
function hideShotBlock() {
    screenshotBlock.classList.add('hidden')
}

///box
const boxImg = document.querySelector('.box-image')
function setBoxImg(id) {
    boxImg.setAttribute('data-img', id)
}


///link 
function openLinkGoldApple() {
    window.open('https://goldapple.ru/lp/advent2024');
}

///animation
const vidComp = document.getElementById('video-comp');
const bgAnim = document.getElementById('bgAnim') ;
function playAnimation() {
    vidComp.play();
    setTimeout(()=>{
        bgAnim.classList.remove('hidden');
        setTimeout(()=>vidAnim.play(),1000)
    }, 4000)
    setTimeout(()=>vidComp.classList.add('hidden'), 5000)
}