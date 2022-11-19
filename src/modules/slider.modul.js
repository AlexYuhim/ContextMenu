import {Module} from "../core/module";

export class  SliderModule extends Module{
  constructor(type,text) {
    super(type,text);
    this.wrapperSlider = document.createElement('div');
  }

  trigger() {
    this.wrapperSlider.classList.add('wrapper-sliders');
    this.wrapperSlider.innerHTML=`
             <div class="container-sliders">
            <div class="sidebar">
              <div style="background: linear-gradient(229.99deg, #11DEE9 -26%, #017E8B 145%);">
                <h1>Snow in the desert</h1>
                <p>Love, death & robots</p>
              </div>
              <div style="background: linear-gradient(215.32deg, #F90306 -1%, #9E0706 124%);">
                <h1>Life Hutch</h1>
                <p>Love, death & robots</p>
              </div>
              <div style="background: linear-gradient(221.87deg, #8308EA 1%, #5305AF 128%);">
                <h1>Zima Blue</h1>
                <p>Love, death & robots</p>
              </div>
              <div style="background: linear-gradient(220.16deg, #FFE101 -8%, #F39102 138%);">
                <h1>Automated Customer Service</h1>
                <p>Love, death & robots</p>
              </div>
              <div style="background: linear-gradient(220.16deg,#FED17C  -8%, #2C2C2E 138%);">
                <h1>Automated Customer Service</h1>
                <p>Love, death & robots</p>
              </div>
              <div style="background: linear-gradient(220.16deg, #E5DBC0 -8%, #CF2729 138%);">
                <h1></h1>
                <p>Without wings I can feel free</p>
              </div>
              <div style="background: linear-gradient(220.16deg, #001E59 -8%, #E77328 138%);">
                <h1></h1>
                <p>SANDBRIDGE, VIRGINIA a perfect sunrise this day and most every other day</p>
              </div>
            </div>
            <div class="main-slide">
              <div
                style="
                  background-image: url('https://images.unsplash.com/photo-1536782376847-5c9d14d97cc0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=876&q=80');
                "
              ></div>
              <div
                style="
                  background-image: url('https://images.unsplash.com/photo-1490730141103-6cac27aaab94?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80');
                "
              ></div>
              <div
                style="
                  background-image: url('https://images.unsplash.com/photo-1512438248247-f0f2a5a8b7f0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80');
                "
              ></div>
              <div
                style="
                  background-image: url('https://images.unsplash.com/photo-1601574968106-b312ac309953?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1996&q=80');
                "
              ></div>
              <div
                style="
                  background-image: url('https://images.unsplash.com/photo-1511447333015-45b65e60f6d5?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2023&q=80');
                "
              ></div>
              <div
                style="
                  background-image: url('https://images.unsplash.com/photo-1501529301789-b48c1975542a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80');
                "
              ></div>
              <div
                style="
                  background-image: url('https://images.unsplash.com/photo-1520263115673-610416f52ab6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1950&q=80');
                "
              ></div>
            </div>
            <div class="controls">
              <button class="button down-button">
                <i class="fas fa-arrow-down"></i>
              </button>
              <button class="button up-button">
                <i class="fas fa-arrow-up"></i>
              </button>
            </div>
          </div>
          `;
    document.body.append(this.wrapperSlider)
  }

  jsSlider(){

    const upButton = document.querySelector(".up-button");
    const downButton = document.querySelector(".down-button");
    const sidebar = document.querySelector(".sidebar");
    const container = document.querySelector(".container-sliders");
    const mainSlide = document.querySelector(".main-slide");
    const slideCount = mainSlide.querySelectorAll("div").length;

    let activeSlideIndex = 0;

    sidebar.style.top = `${-(slideCount - 1) * 100}vh`;

    upButton.addEventListener("click", () => {
      changeSlide("up");
    });
    document.addEventListener("keydown", (evt) => {
      changeSlide(evt.key);
    });

    window.addEventListener('wheel',(evt)=>{
      changeSlide(evt.deltaY)
    })

    downButton.addEventListener("click", () => {
      changeSlide("down");
    });

    function changeSlide(direction) {
      if (direction === "up" || direction === "ArrowUp"|| direction < 0) {
        activeSlideIndex++;
        if (activeSlideIndex === slideCount) {
          activeSlideIndex = 0;
        }
      } else if (direction === "down" || direction === "ArrowDown" || direction > 0 ) {
        activeSlideIndex--;
        if (activeSlideIndex < 0) {
          activeSlideIndex = slideCount - 1;
        }
      }

      const height = container.clientHeight;

      mainSlide.style.transform = `translateY(-${activeSlideIndex * height}px)`;
      sidebar.style.transform = `translateY(${activeSlideIndex * height}px)`;
    }

  }
  deleteSlider(){
    this.wrapperSlider.remove()
  }
}