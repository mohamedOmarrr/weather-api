const searchInput = document.querySelector('main input')
const searchBtn = document.querySelector('main button')
const main = document.querySelector('main .cards-space')

searchInput.addEventListener('input', async function(){
    let city = searchInput.value
    if (city.length < 3){
        return
    }

    const weatherData = await weatherOnCity(city)
    bulidCard(weatherData)
    
})

document.addEventListener('DOMContentLoaded', async function () {
    let defaultCity = 'Alexandria';
    const weatherData = await weatherOnCity(defaultCity);
    bulidCard(weatherData);
});

searchBtn.addEventListener("click", function(){
    searchInput.value = ''
})

async function weatherOnCity(city) {
    try{
        let response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=ab58c17c978941a082b85931250507&q=${city}&days=3`)

        let weatherData = await response.json()        
        return weatherData
    }catch(error){
        
        console.log(error);
    } 

}

function bulidCard(data) {
    // get day one date
  let dayOne = data.forecast.forecastday[0].date

  let dayOneName = new Date(dayOne).toLocaleDateString("en-US", {
  weekday: "long"
  });

  let numDate = new Date(dayOne).toLocaleDateString("en-US", {
  day: "numeric",
  month: "long"
  });

//get day two date
  let dayTwo = data.forecast.forecastday[1].date 
 
  let dayTwoName = new Date(dayTwo).toLocaleDateString("en-US", {
  weekday: "long"
  });

// get day three date 
  let dayThree = data.forecast.forecastday[2].date

  let dayThreeName = new Date(dayThree).toLocaleDateString("en-US", {
  weekday: "long"
  });

// icon path 
  let iconOne = data.current.condition.icon
  let iconTwo = data.forecast.forecastday[1].day.condition.icon
  let iconThree = data.forecast.forecastday[2].day.condition.icon

  const Card = document.createElement('div');
  Card.className = 'weather-sec row my-5';

  Card.innerHTML = `
    <div class="today gx-0 col-lg-4">
                    <div class="date d-flex justify-content-between px-2 mb-4">
                        <h4>${dayOneName}</h4>
                        <h4>${numDate}</h4>
                    </div>
                    <div class="main-content px-2">

                        <h3 class="fs-1 fw-bolder">${data.location.name}</h3>
                        <div class="deg d-flex">
                                <h1 class="position-relative me-2">${data.current.temp_c}<span class="me-3 position-absolute">o</span></h1>
                                <h1>c</h1>
                        </div>
                        <div class="status d-flex align-items-center mb-3">
                            <h6 class="me-2 fw-light fs-3">${data.current.condition.text}</h6>
                            <img style="width: 40px;" src="https:${iconOne}" alt="weather status icon">
                        </div>
                        <div class="bottom-bar d-flex justify-content-between">
                            <div class="rain d-flex align-items-baseline">
                                <img class="me-2" style="width: 20px; height: 20px;" src="./images/icon-umberella.png" alt="umberella">
                                <h4 class="fs-5 fw-normal">${data.forecast.forecastday[0].day.daily_chance_of_rain}%</h4>
                            </div>
                            <div class="wind d-flex align-items-baseline">
                                <img class="me-2" style="width: 20px; height: 20px;" src="./images/icon-wind.png" alt="wind">
                                <h4 class="fs-5 fw-normal">${data.current.wind_kph}Km/h</h4>
                            </div>
                            <div class="dir d-flex align-items-baseline">
                                <img class="me-2" style="width: 20px; height: 20px;" src="./images/icon-compass.png" alt="compass">
                                <h4 class="fs-5 fw-normal">${data.current.wind_dir}</h4>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="tomorrow gx-0 col-lg-4 d-flex flex-column align-items-center">
                    <div class="date w-100 d-flex justify-content-center">
                        <h4 class="py-1 fs-5">${dayTwoName}</h4>

                    </div>
                    <div class="main-content d-flex flex-column align-items-center">
                        <img class="mt-5 mb-3" src="https:${iconTwo}" alt="weather status icon">
                        <div class="deg d-flex">
                                <h1 class="fs-2 position-relative me-2">${data.forecast.forecastday[1].day.maxtemp_c}<span class="me-3 position-absolute">o</span></h1>
                                <h1 class="fs-2">c</h1>
                        </div>
                        <div class="deg d-flex ">
                                <h5 class="fw-normal mb-4 position-relative me-2">${data.forecast.forecastday[1].day.mintemp_c}<span class="me-3 position-absolute">o</span></h5>
                                <h5 class="fw-normal">c</h5>
                        </div>
                        <h5 class="mb-5">${data.forecast.forecastday[1].day.condition.text}</h5>
                    </div>
                </div>
                <div class="after-tomorrow col-lg-4 gx-0 d-flex flex-column align-items-center">
                    <div class="date w-100 d-flex justify-content-center">
                        <h4 class="py-1 fs-5">${dayThreeName}</h4>

                    </div>
                    <div class="main-content d-flex flex-column align-items-center">
                        <img class="mt-5 mb-3" src="https:${iconThree}" alt="weather status icon">
                        <div class="deg d-flex">
                                <h1 class="fs-2 position-relative me-2">${data.forecast.forecastday[2].day.maxtemp_c}<span class="me-3 position-absolute">o</span></h1>
                                <h1 class="fs-2">c</h1>
                        </div>
                        <div class="deg d-flex ">
                                <h5 class="fw-normal mb-4 position-relative me-2">${data.forecast.forecastday[2].day.mintemp_c}<span class="me-3 position-absolute">o</span></h5>
                                <h5 class="fw-normal">c</h5>
                        </div>
                        <h5 class="mb-5">${data.forecast.forecastday[2].day.condition.text}</h5>
                    </div>
                </div>`;
    display(Card)            

}

function display(Card) {
  main.innerHTML = '';
  main.appendChild(Card);
}
