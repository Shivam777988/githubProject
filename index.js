
let cityName = document.querySelector(".weather_city");
let dateTime = document.querySelector(".weather_date_time");
let w_forecast = document.querySelector(".weather_forecast");
let w_icon = document.querySelector(".weather_icon");
let w_temperature = document.querySelector(".weather_temperature");
let w_minTem = document.querySelector(".weather_min");
let w_maxTem = document.querySelector(".weather_max");



let w_feelsLike = document.querySelector(".weather_feelsLike");
let w_humidity = document.querySelector(".weather_humidity");
let w_wind = document.querySelector(".weather_wind");
let w_pressure = document.querySelector(".weather_pressure");

let citySearch = document.querySelector(".weather_search");



// to get actual country name
// const getcountryname=(code)=>{
//     return new Intl.DisplayNames([code], { type: "region" }).of(code);
// };
// to get the date and time
const getDateTime = (dt) => {
    const curDate = new Date(dt*1000); // Convert seconds to milliseconds
    console.log(curDate);
    // // const date = new Date();
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      min: "numeric",
      //sceond
    };

  
    const formatter = new Intl.DateTimeFormat("en-US", options);
    console.log(formatter);
     return formatter.format(curDate);
  };
  let city='pune';
  citySearch.addEventListener('submit',(e)=>{
e.preventDefault();
let cityNameinput=document.querySelector(".city_name");
console.log(cityNameinput.value);
city=cityNameinput.value;
getWeatherData();
cityNameinput.value="";

  });
  
const getWeatherData= async ()=>{

    const weatherUrl= `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=5c43f3ec8cc40f9a981598813b2834ea`;
    
    try{
    const res=await fetch(weatherUrl);
    console.log(res);
    const data=await res.json();
     console.log(data);
    
  
    const { main, name, weather, wind, sys, dt } = data;  
    cityName.innerHTML=`${name},${sys.country}`;

    dateTime.innerHTML=getDateTime(dt);

    w_forecast.innerHTML=weather[0].main;
    // w_icon.innerHTML=`${weather[0].icon}`;
    w_icon.innerHTML = `<img src="http://openweathermap.org/img/wn/${weather[0].icon}@4x.png" />`;
    w_temperature.innerText=main.temp;
    w_temperature.innerHTML=`${main.temp}&#176`;
    w_minTem.innerHTML=`min:${main.temp_min}&#176`;
    w_feelsLike.innerHTML = `${main.feels_like.toFixed(2)}&#176`;
    w_humidity.innerHTML = `${main.humidity}%`;
    w_wind.innerHTML = `${wind.speed} m/s`;
    w_pressure.innerHTML = `${main.pressure} hPa`;


    }
    catch(error){ 
        console.log(error);
    }
};

document.body.addEventListener('load',getWeatherData());
