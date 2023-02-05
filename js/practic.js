'use strict'
// начальная длина змейки
let snakeLength = 5;
// массив со змейкой
let snake = [];
// кол-во камней
let stone = 7;
//кол-во еды
let eat = 3;
// поле
let div = document.querySelector('.field');
div.addEventListener('mouseover', game);
// стартовые очки
let startPoints = 0;
// победа
let winPoints = 100;
// вывод очков 
text();

//начало игры
function game (event){
    //столкновение с камнем
    if(event.target.classList.contains('stone')){
        snake[0].classList.remove('snake');
        snake.shift();
        snakeLength - 1;
        startPoints - 20;
        text();
    }
    // поедание хвоста
    if(event.target.classList.contains('snake')){
        let indexToDel = snake.indexOf(event.target, 0);
        let teiltoDel = snake.splice(0, indexToDel+1);
        teiltoDel.forEach(item => item.classList.remove('snake'));
        snakeLength -= indexToDel+1;
        startPoints -= 20*(indexToDel+1);
        text();
    }
    // движение змейки
    let el = event.target;
    el.classList.add('snake');
    snake.push(el);
    if(snake.length > snakeLength){
        snake[0].classList.remove('snake');
        snake.shift();
    }
    // поедание еды
    if(event.target.classList.contains('eat')){
        toEat(event.target);
    }
    
};
// генерация еды
for (let i = 0; i < eat; i++) {
    toAddEat();
}
//генерация камней
for (let i = 0; i < stone; i++) {
    toAddStone();
}
//создание камня
function toAddStone (){
    let cell = document.querySelectorAll('.cell:not(.snake, .eat, .stone)');
    let stone = getRandomInt(0, cell.length);
    cell[stone].classList.add('stone');
}
//создание еды
function toAddEat (){
    let cell = document.querySelectorAll('.cell:not(.snake, .eat, .stone)')
    let eat = getRandomInt(0, cell.length);
    cell[eat].classList.add('eat');
}
// поедание
function toEat(eat){
    snakeLength++;
    eat.classList.add('snake');
    toAddEat()
    eat.classList.remove('eat');
    startPoints +=10;
    text();
    
}
//очки
function text (){
    let scoreText = document.querySelector('.points');
    if(startPoints >= winPoints){
        win();
    }else if(startPoints < 0){
        loose();
    }else{
        scoreText.innerHTML = startPoints;
    }
}   
// окно победы
function win(){
    div.insertAdjacentHTML('afterbegin', ` <div class="modal" tabindex="-1">
    <div class="modal-dialog">
        <div class="modal-content">
        <div class="modal-header">
            <h5 class="modal-title">Поздравляем!</h5>
        </div>
        <div class="modal-body">
            <p>Ты победил и набрал <span class="total_score">${startPoints}</span> очков</p> 
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Заново</button>
            <button type="button" class="btn btn-primary">Продолжить</button>
        </div>
        </div>
    </div>
    </div> `);
    div.removeEventListener('mouseover', game);
    button();
}
// окно проигрыша 
function loose (){
    div.insertAdjacentHTML('afterbegin', ` <div class="modal" tabindex="-1">
    <div class="modal-dialog">
    <div class="modal-content">
        <div class="modal-header">
        <h5 class="modal-title">Упс</h5>
    </div>
        <div class="modal-body">
            <p>Ты проиграл и набрал <span class="total_score">${startPoints}</span> очков</p> 
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Заново</button>
            <button type="button" class="btn btn-primary">Продолжить</button>
        </div>
        </div>
    </div>
    </div> `);
div.removeEventListener('mouseover', game);
    button();
}
//кнопки
function button (){
    let butReset = document.querySelector('.btn btn-secondary');
    butReset.addEventListener('click', reset);
    function reset(){
        location.reload();
    }
    reset();
    let butProceed = document.querySelector('.btn btn-primary');
    butProceed.addEventListener('click', proceed);
    function proceed(){
        let modal = document.querySelector('.modal');
        modal.remove();
    }
    proceed();
}
// let but = document.querySelector('.btn btn-primary');
// but.addEventListener('click', user);
// function user (){
//     let name = document.querySelector('.form-control');
//     name.insertAdjacentHTML('beforeend', `<p>Игрок: ${name.value}`);
//     name.value = '';
// }
//рандом
function getRandomInt(min, max){
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //Максимум не включается, минимум включается
}