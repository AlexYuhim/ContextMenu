import './styles.css';
import {ContextMenu} from "./contextMenu";

import {CardsModule} from "./modules/cards.modul";
import {DragDropModule} from "./modules/drag&drop.module";
import {SliderModule} from "./modules/slider.modul";
import {BoardModule} from "./modules/board.modul";
import {AimGameModule} from "./modules/aimGame.modul";
import {ModuleRandomWeather} from "./modules/showRandomWeather.modul";


const menu = new ContextMenu('.menu');
const cards = new CardsModule('cards-module','Проект №1 Карточки');
const dragDrop = new DragDropModule('dragDrop-module', 'Проект №2 Drag&drop');
const slider = new SliderModule('slider-module', 'Проект №3 Слайдер');
const board = new BoardModule('board-module', 'Проект №4 Доска');
const aimGame = new AimGameModule('aimGame-module', 'Проект №5 Aim Game' );
const randomWeather = new ModuleRandomWeather('randomWeather-module', 'Вывести погоду в рандомном месте земли')


menu.add([cards.toHTML(),dragDrop.toHTML(),slider.toHTML(),board.toHTML(),aimGame.toHTML(),randomWeather.toHTML()]);

document.body.addEventListener('contextmenu',evt=>{
  evt.preventDefault();
  document.querySelector('.main-title').classList.add('hide')
  menu.open();
  /**забираем местоположения клика*/
  const positionX = evt.pageX;
  const positionY = evt.pageY;
  /**получаем высату и ширину всего документа*/
  const documentWidth = document.documentElement.clientWidth;
  const documentHeight = document.documentElement.clientHeight;
  /**получаем высату и ширину контекстного меню*/
  const menuWidth = menu.el.offsetWidth;
  const menuHeight = menu.el.offsetHeight;

   /**логика*/
  (documentHeight - positionY < menuHeight)
    ? menu.el.style.top=`${positionY - menuHeight}px`
    :menu.el.style.top=`${positionY}px`;

  (documentWidth - positionX < menuWidth)
    ? menu.el.style.left=`${positionX - menuWidth}px`
    :menu.el.style.left=`${positionX}px`;
});


document.querySelector('.menu').addEventListener('click',(evt)=>{

  if(evt){
    cards.deleteModuleSlider()
    dragDrop.deleteModuleForDragDrop()
    slider.deleteSlider()
    board.deleteBoard()
    aimGame.deleteAimGame()
    randomWeather.deleteModuleRandomWeather()
  }

  if(evt.target.getAttribute('data-type') === 'cards-module'){
    cards.trigger();
    menu.close();
  }


  if (evt.target.getAttribute('data-type') === 'dragDrop-module'){
    dragDrop.trigger();
    dragDrop.jsDragDrop();
    menu.close();
  }

  if (evt.target.getAttribute('data-type') === 'slider-module'){
    slider.trigger();
    slider.jsSlider();
    menu.close();
  }

  if (evt.target.getAttribute('data-type') === 'board-module'){
    board.trigger();
    board.jsBord();
    menu.close();
  }

  if (evt.target.getAttribute('data-type') === 'aimGame-module'){
    aimGame.trigger();
    aimGame.jsAimGame();
    menu.close();
  }

  if (evt.target.getAttribute('data-type') === 'randomWeather-module'){
    randomWeather.trigger();
    menu.close();
  }

});