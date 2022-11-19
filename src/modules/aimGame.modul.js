import {Module} from "../core/module";
import * as utils from '../utils.js'

export class AimGameModule extends Module{
  constructor(type,text) {
    super(type,text);
    this.wrapperAimGame = document.createElement('div');
  }
  trigger() {
    this.wrapperAimGame.classList.add('wrapper-aim-game');
    this.wrapperAimGame.innerHTML=`
    <div class="wrapper-game">
      <div class="screen ">
        <div class="flex-container">
          
            <div class="main-page">
              <h1 class="h1">Aim Training</h1>
                <div class="title__wrapper" >
                  <p >Найди и кликни по этому шарику<span class="arrow">==></span></p>
                  <span class="circle-title"></span>
               </div>
              <form class="level-game" >
              <h3 class="title-level-group">||===  Выбирите уровень сложности ===|| </h3>
                  <fieldset class="fieldset">
                    <ul class="level-group">
                      <label > <input type="radio" name="level-group" value="one" checked><span class="span-level-group">один шарик</span> </label>
                      <label > <input type="radio" name="level-group" value="easy"><span class="span-level-group">Легкий </span></label>
                      <label > <input type="radio" name="level-group" value="average" ><span class="span-level-group">Средний</span> </label>
                      <label > <input type="radio" name="level-group" value="difficult" ><span class="span-level-group">Сложный</span></label>
                    </ul>
                  </fieldset>
                  <h3 class="title-chit-group">||===Активировать чит ===||</h3>
                  <fieldset class="fieldset">
                   
                    <ul class="chit-group" >
                      <label class="label-start" >
                        <input class="checkboxClicker" type="checkbox" >  <span class="arrow"> <==== </span>    Активировать АвтоКликер
                      </label>
                      <label class="label-start" >
                        <input class="checkboxBlink" type="checkbox" >  <span class="arrow"> <==== </span>    Активировать Автоподсветку
                      </label>
                    </ul>
                  </fieldset>
              </form>
              <a href="#" class="start-iag a game-start">Начать игру</a>

          </div>
        </div>
      </div>
      <div class="screen ">
        <h1 class="h1">Выберите время</h1class>
        <ul class="time-list" id="time-list">
          <li>
            <button class="time-btn" data-time="10">
              10 сек
            </button>
          </li>
          <li>
            <button data-time='20' class="time-btn">
              20 сек
            </button>
          </li>
          <li>
            <button class="time-btn"  data-time='30'>
              30 сек
            </button>
          </li>
          <li>
            <button class="time-btn"  data-time='4'>
              40 сек
            </button>
          </li>
        </ul>
      </div>

      <div class="screen">
        <h3>Осталось <span  class="time">00:00</span></h3>
        <div class="button-restart">
          <button type="button" class="button__newTame"> New Tame
          </button>
          <button type="button" class="button__newGame"> New Game
          </button>
        </div>
        <div class="board game-board"></div>

      </div>
    </div>
    `;

    document.body.append(this.wrapperAimGame);
  }


  jsAimGame(){
    const startBtn = document.querySelector(".game-start");
    const screens = document.querySelectorAll(".screen");
    const timeList = document.querySelector(".time-list");
    const timeGame = document.querySelector(".time");
    const board = document.querySelector(".game-board");
    const checkboxClicker = document.querySelector('.checkboxClicker');
    const checkboxBlink = document.querySelector('.checkboxBlink')
    const buttonRestart = document.querySelector('.button-restart');
    const levelInput = document.querySelector('.level-group');

    let time;
    let current;
    let score = 0;
    let gameInterval = 0;
    let killerCircle = 0;
    let level = 1;


    startBtn.addEventListener("click", (evt) => {
      evt.preventDefault();
      screens[0].classList.add("up");
    });

    timeList.addEventListener("click", (evt) => {

      if (evt.target.classList.contains("time-btn")) {
       time = parseInt(evt.target.getAttribute("data-time"));
       screens[1].classList.add("up");
       if(checkboxClicker.checked) killerCircle = setInterval(clicker, 42);}

      startGame()
    });

    board.addEventListener("click", (evt) => {
      if (evt.target.classList.contains("circle")) {
        score++;
        evt.target.remove();
        board.innerHTML = ``;
        createRandomCircle();
      }
    });

    buttonRestart.addEventListener('click', (evt)=>{

      const button = evt.target;

      screens.forEach((screen)=>{
        (button.className === 'button__newTame')?screens[1].classList.remove('up'):screen.classList.remove('up')
      })
      timeGame.parentElement.classList.remove( "hide-iag");
      board.innerHTML = '';

      score = 0;
    })

    levelInput.addEventListener('click',(evt)=>{

      if(evt.target.value === 'one') level = 1
      if(evt.target.value === 'easy') level = 10
      if(evt.target.value === 'average') level = 50
      if(evt.target.value === 'difficult') level =70


    })

    function setTime(value) {
      timeGame.innerHTML = `00:${value}`;
    }

    function startGame() {
      buttonRestart.classList.add('visually-hidden');
      gameInterval = setInterval(decreaseTime, 1000);
      createRandomCircle();
    }

    function decreaseTime() {

        if (time < 0) {
          finishGame();
        } else {
          current = time--;
        if (current < 10) {
          current = `0${current}`;
          if(current<4) timeGame.classList.add('over-time')
        }
        setTime(current);
      }
    }

    function finishGame() {
      clearInterval(gameInterval);
      clearInterval(killerCircle);

      timeGame.parentElement.classList.add("hide-iag");
      board.innerHTML = `<h1>Счет:<span class='primary'> ${score} </span></h1>`;
      buttonRestart.classList.remove('visually-hidden');
      timeGame.classList.remove('over-time')
    }


    function createRandomCircle() {
      const arr = new Array (level)
      for (let i = 0; i < arr.length; i++) {
        const circle = document.createElement("div");
        const {width, height} = board.getBoundingClientRect();
        const size = utils.getRandomNumber(15, 50);
        const x = utils.getRandomNumber(0, width - size);
        const y = utils.getRandomNumber(0, height - size);
        const color = utils.getRandomNumber(0, utils.colors.length);
        circle.style.width = `${size}px`;
        circle.style.height = `${size}px`;
        circle.style.top = `${x}px`;
        circle.style.left = `${y}px`;
        circle.style.position = "absolute";
        circle.style.borderRadius = "50%";

        if(i===arr.length-1){
          (checkboxBlink.checked)? circle.classList.add("blink",'circle'):circle.classList.add("circle")
        }else{
          circle.style.background = utils.colors[color]
        }

        board.append(circle);
      }
    }



    function clicker() {
      const circle = document.querySelector(".circle");
      if (circle) {
        circle.click();
      }
    }

  }

  deleteAimGame(){
    this.wrapperAimGame.remove();
  }

}