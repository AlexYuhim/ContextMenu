import {Module} from "../core/module";
import * as utils from '../utils'

export class BoardModule extends Module{

  constructor(type,text) {
    super(type,text);
    this.wrapperBord = document.createElement('div');
  }

  trigger() {
    this.wrapperBord.classList.add('wrapper-board');

    this.wrapperBord.innerHTML=`
    <div class="container-board board"></div>
    `;
  document.body.append(this.wrapperBord)
  }

  jsBord(){
    this.board = document.querySelector(".board");

    const  SQUARES_NUMBER = 500;

    for (let i = 0; i < SQUARES_NUMBER; i++) {
     const square = document.createElement("div");
      square.classList.add("square");

      square.addEventListener("mouseover", () => utils.setColor(square));
      square.addEventListener("mouseleave", () => utils.removeColor(square));

      this.board.append(square);
    }


  }
  deleteBoard(){
    this.wrapperBord.remove();
  }
}

