
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
const videoBg = document.querySelector('.video-bg');
const bgAnim = document.getElementById('bgAnim') ;
function playAnimation() {
    animate();
    setTimeout(()=>{
        bgAnim.classList.remove('hidden');
        setTimeout(()=> {canvas.classList.add('anim')},1000)
        setTimeout(()=> {
            canvas.classList.add('hidden');
            bgAnim.classList.add('anim');
            videoBg.classList.add('anim')
            setTimeout(() => {
                videoBg.play()
            }, 1000);
        },2000)
    }, 4000)
    
}



const canvas = document.getElementById('snow');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

let isMoving = true;


class Snowflake {
    constructor() {
        this.reset();
        this.z = 0;
        this.maxZ = 500;
        this.zSpeed = Math.random() * 2 + 1;
        this.finalX = 0;
        this.finalY = 0;
        this.finalSize = 0;
        this.finalAngle = 0;
        this.stopped = false;
    }

    reset() {
        this.x = canvas.width / 2;
        this.y = canvas.height / 2;
        this.z = 0;
        this.spiralRadius = 0;
        this.angle = Math.random() * Math.PI * 2;
        this.size = 0;
        this.maxSize = Math.random() * 2 + 1;
        this.spiralGrowth = Math.random() * 0.3 + 0.05;
        this.rotationSpeed = Math.random() * 0.01 + 0.01;
        this.growthRate = 0.3;
    }

    update() {
        if (!isMoving && !this.stopped) {
            this.finalX = this.x;
            this.finalY = this.y;
            this.finalSize = this.size;
            this.finalAngle = this.angle;
            this.stopped = true;
            return;
        }

        if (this.stopped) return;

        this.z += this.zSpeed;
        const scale = 1 + (this.z / this.maxZ) * 2;
        
        if (this.size < this.maxSize * scale) {
            this.size += this.growthRate * scale;
        }

        this.spiralRadius += this.spiralGrowth * scale;
        this.angle += this.rotationSpeed;
        
        this.x = canvas.width/2 + Math.cos(this.angle) * this.spiralRadius * scale;
        this.y = canvas.height/2 + Math.sin(this.angle) * this.spiralRadius * scale;

        if (this.z > this.maxZ || this.spiralRadius * scale > Math.max(canvas.width, canvas.height)) {
            this.reset();
        }
    }

    draw() {
        const x = this.stopped ? this.finalX : this.x;
        const y = this.stopped ? this.finalY : this.y;
        const size = this.stopped ? this.finalSize : this.size;
        const angle = this.stopped ? this.finalAngle : this.angle;
        
        const opacity = this.stopped ? 0.8 : 1 - (this.z / this.maxZ);
        
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(angle);
        
        ctx.beginPath();
        for (let i = 0; i < 6; i++) {
            ctx.moveTo(0, 0);
            ctx.lineTo(0, size * 2);
            ctx.moveTo(0, size * 0.8);
            ctx.lineTo(size * 0.5, size * 1.2);
            ctx.moveTo(0, size * 0.8);
            ctx.lineTo(-size * 0.5, size * 1.2);
            ctx.rotate(Math.PI / 3);
        }
        ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
        ctx.restore();
    }
}

const snowflakes = [];
for (let i = 0; i < 3000; i++) {
    snowflakes.push(new Snowflake());
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (isMoving) {
        snowflakes.sort((a, b) => a.z - b.z);
    }

    snowflakes.forEach(snowflake => {
        snowflake.update();
        snowflake.draw();
    });

    requestAnimationFrame(animate);
    setTimeout(() => {
        isMoving = false;
    }, 6000);
}
