let started = false;
let score = 0;
let time = 15;
let startBtn = document.querySelector('#start');
let level = 'lvltwo';
let targetColorValue = '#000';
let highScore1 = 0;
let highScore2 = 0;
let highScore3 = 0;

let levelBtns = document.querySelectorAll('.game-level button');

for(levelBtn of levelBtns){
    levelBtn.addEventListener('click', function() {
        document.querySelector('.score span').innerHTML = 0;
        level = this.getAttribute('id');
        if(level == 'lvlone'){
            time = 30;
            document.querySelector('.timer span').innerHTML = time;
            document.querySelector('#level-display').innerHTML = 'Easy';
            document.querySelector('#level-display').style.color = "rgb(65, 227, 65)";
            document.querySelector('.max span').innerHTML = highScore1;
        }else if(level == 'lvltwo'){
            time = 15;
            document.querySelector('.timer span').innerHTML = time;
            document.querySelector('#level-display').innerHTML = 'Medium';
            document.querySelector('#level-display').style.color = "rgb(255, 224, 71)";
            document.querySelector('.max span').innerHTML = highScore2;
        }else if(level == 'lvlthree'){
            time = 10;
            document.querySelector('.timer span').innerHTML = time;
            document.querySelector('#level-display').innerHTML = 'Hard';
            document.querySelector('#level-display').style.color = "rgb(227, 65, 65)";
            document.querySelector('.max span').innerHTML = highScore3;
        }
    })
}

startBtn.addEventListener('click', function() {
    document.querySelector('.score span').innerHTML = 0;
    runTimer();
    runningGame();
});

function runningGame() {
    if(started == false){
        started = true;
    }
    startBtn.style.display = "none";
    let target = showTarget();
    target.addEventListener('click',function(event) {
        event.stopPropagation();
        score++;
        document.querySelector('.score span').innerHTML = score;
        target.remove();
        runningGame();
    })
}

function runTimer() {
    let timer = setInterval(() => {
        if(time <= 3){
            document.querySelector('.timer span').style.color = "red";
        }
        if(time == 0){
            reset();
            clearInterval(timer);
        }
        document.querySelector('.timer span').innerHTML = time;
        time--;
    }, 1000);
}

function showTarget() {
    let target = document.createElement('div');
    target.classList.add('target');
    target.style.backgroundColor = targetColorValue;
    let randX = Math.ceil(Math.random() * 800) + "px";
    let randY = Math.ceil(Math.random() * 420) + "px";
    target.style.left = randX;
    target.style.top = randY;
    document.querySelector('.play-area').appendChild(target);
    return target;
}

function reset() {
    started = false;
    document.querySelector('.timer span').style.color = "black";
    let currScore = score;
    score = 0;
    time = 15;
    document.querySelector('.target').remove();
    startBtn.style.display = "block";
    if(level == 'lvlone'){
        highScore1 = Math.max(highScore1, currScore);
        document.querySelector('.max span').innerHTML = highScore1;
    }else if(level == 'lvltwo'){
        highScore2 = Math.max(highScore2, currScore);
        document.querySelector('.max span').innerHTML = highScore2;
    }else if(level == 'lvlthree'){
        highScore3 = Math.max(highScore3, currScore);
        document.querySelector('.max span').innerHTML = highScore3;
    }
    
}

let bgColor = document.querySelector('#bgColor');
bgColor.addEventListener('input' ,function() {
    colorValue = this.value;
    document.querySelector('.play-area').style.backgroundColor = colorValue;
})

let targetColor = document.querySelector('#targetColor');
targetColor.addEventListener('change', function() {
    targetColorValue = this.value;
})

document.querySelector('.play-area').addEventListener('click', function(){
    if(started == true){
        document.querySelector('.play-area').classList.add('flash');
        setTimeout(() => {
            document.querySelector('.play-area').classList.remove('flash');
        }, 150);
    }
})

document.querySelector('#start').addEventListener('click', function(event) {
    event.stopPropagation();
})