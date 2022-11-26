import {Module} from "../core/module";
import {getRandomNumber } from "../utils";


export class ModuleRandomWeather extends Module{
  constructor(type,text) {
    super(type,text);
    this.wrapperRandomWeather = document.createElement('div');
  }

  trigger() {
    this.wrapperRandomWeather.classList.add('wrapper-random-weather')
    this.wrapperRandomWeather.innerHTML=` 
                <div class="city" >
                  <h2 class ='title-name-module'>RandomWeather</h2>
                  <span class ='loader' hidden >Загрузка....</span>
                  <h3 class="city-name "></h3>
                  <h3 class="coord-lat "></h3>
                  <h3 class="coord-lon "></h3>
                  <h3 class="city-temp"></h3>  
                  <h3 class="city-feels_like"></h3>  
                  <h3 class="city-description"></h3>  
                </div>
    `
    document.body.append(this.wrapperRandomWeather)

  function getRandomWeather(){

      const  URL_API_Weather = `https://api.openweathermap.org/data/2.5/weather?lat=${getRandomNumber(-90,90)}.${getRandomNumber(0,9999)}&lon=${getRandomNumber(-110,170)}.${getRandomNumber(0,9999)}&lang=ru&units=metric&appid=e2df2d1b98fc561c2c721d6d2a82353e`
      toggeleLoader()
      fetch(URL_API_Weather)
        .then((response)=>response.json())
        .then((city)=>{
          console.log(city)
          document.querySelector('.city-name').innerHTML = `Город : ${city.name}`;
          document.querySelector('.coord-lat').innerHTML = `Широтa : ${city.coord.lat}`;
          document.querySelector('.coord-lon').innerHTML = `Долготa: ${city.coord.lon}`;
          document.querySelector('.city-description').innerHTML = `  ${city.weather[0].description}`;
          document.querySelector('.city-feels_like').innerHTML =`ощущается как : ${(city.main.feels_like).toFixed()} `;
          document.querySelector('.city-temp').innerHTML =`Температура : ${city.main.temp.toFixed()} `;
        })
        .catch((err)=>{
          console.log(err)
        })
        .finally(()=>toggeleLoader())

        function toggeleLoader(){
          const loaderHTML= document.querySelector('.loader');
          const isHidden = loaderHTML.hasAttribute('hidden');
          if(isHidden){
            loaderHTML.removeAttribute('hidden')
          }else{
            loaderHTML.setAttribute('hidden','')
          }
        }
    }
    getRandomWeather()
  }

  deleteModuleRandomWeather(){
    this.wrapperRandomWeather.remove()
  }
}