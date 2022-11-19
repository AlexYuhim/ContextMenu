import {Module} from "../core/module";

export class CardsModule extends Module{
  constructor(type,text) {
      super(type,text);
      this.wrapperForCards = document.createElement('div');
  }

    trigger() {

      this.wrapperForCards.classList.add('wrapper-cards');
      this.wrapperForCards.innerHTML=`
          <div class="container-cards">
                <div
                    class="card"
                    style="background-image: url('https://images.unsplash.com/photo-1618503551238-7df2c50d2236?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=423&q=80');"
                >
                  <h3>Sevilla</h3>
                </div>
                <div
                    class="card"
                    style="
                        background-image: url('https://images.unsplash.com/photo-1531846802986-4942a5c3dd08?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1587&q=80');
                      "
                >
                  <h3> New York</h3>
                </div>
                <div
                    class="card  active"
                    style="
                        background-image: url('https://images.unsplash.com/photo-1572988606746-3532100ee15d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80');
                      "
                >
                  <h3>Toronto</h3>
                </div>
                <div
                    class="card"
                    style="
                        background-image: url('https://images.unsplash.com/photo-1633297587920-abb3ec718610?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=852&q=80');
                      "
                >
                  <h3>Manhattan </h3>
                </div>
                <div
                    class="card"
                    style="
                        background-image: url('https://images.unsplash.com/photo-1625567681279-af87f8e1b1c9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=928&q=80');
                      "
                >
                  <h3>London</h3>
                </div>
          </div>
      `;
      document.body.append(this.wrapperForCards)

      const slides = document.querySelectorAll(".card");

      for (const slide of slides) {
        slide.addEventListener("click", () => {
          slideRemoveClass();
          slide.classList.remove("active");
          slide.classList.add("active");
        });
      }
      function slideRemoveClass() {
        slides.forEach((slide) => {
          slide.classList.remove("active");
        });
      }

    }

    deleteModuleSlider(){
       this.wrapperForCards.remove();
    }

}