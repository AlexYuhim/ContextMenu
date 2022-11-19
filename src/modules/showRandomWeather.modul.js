import {Module} from "../core/module";
import {getRandomNumber, random} from "../utils";


export class ModuleRandomWeather extends Module{
  constructor(type,text) {
    super(type,text);
    this.wrapperRandomWeather = document.createElement('div');


  }

  trigger() {
    this.wrapperRandomWeather.classList.add('wrapper-random-weather')

    this.wrapperRandomWeather.innerHTML=` 
                <div class="city" >
                  <h2>RandomWeatherCiti</h2>
                  <h3 class="city-name "></h3class>
                  <h3 class="city-temp"></h3>  
                </div>
    `


    function getRandomWeather(){
      const  URL_API_Weather = `http://api.weatherapi.com/v1/current.json?key=b9453e9ca4f14ce1be4123538220911&q=${getRandomNumber(-70,70)}.${getRandomNumber(0,9999)},${getRandomNumber(-110,170)}.${getRandomNumber(0,9999)}&aqi=no`
      fetch(URL_API_Weather)
        .then((response)=>response.json())
        .then((city)=>{
          document.querySelector('.city-name').innerHTML = `Город : ${city.location.name}`;
          document.querySelector('.city-temp').innerHTML =`Температура : ${city.current.temp_c} `;
          console.log('CITY',  city.location.name)
          console.log("temp_c",  city.current.temp_c)

        })
        .catch((err)=>{
          getRandomWeather()

        })

    }
    getRandomWeather()
    document.body.append(this.wrapperRandomWeather)

  }


  deleteModuleRandomWeather(){
    this.wrapperRandomWeather.remove()
  }
}