const locationForm = document.querySelector('form');
const inputSearch = document.querySelector('input');
const locationMessage1 = document.querySelector('#divLocation-1')
const tempMessage1 = document.querySelector('#divTemp-1');
const dateMessage = document.querySelector('#divDateTime');
const percipMessage = document.querySelector('#spPerc');
const windSpeedMessage = document.querySelector('#spWindSpeed');
const windDirMessage = document.querySelector('#spWindDir');

locationMessage1.textContent = '';
tempMessage1.textContent = 0;
dateMessage.textContent = null;
percipMessage.textContent = '0%';
windSpeedMessage.textContent = '';
windDirMessage.textContent = '';

let baseURL = 'http://localhost:3000/'
locationForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    document.querySelector('#divLoading').style.display = 'block'
    console.log(inputSearch.value)
    const weatherUrl = baseURL+'weather?address='+ inputSearch.value +'';
    fetch(weatherUrl).then((response)=>{
        response.json().then((data)=>{
            document.querySelector('#divLoading').style.display = 'none'
            if(data.error){
                alert(data.error);
            } 
            else{
                locationMessage1.textContent = data.location +'  : '+ data.descr;
                tempMessage1.textContent = data.temperature;
                dateMessage.textContent = data.localtime;
                percipMessage.textContent = data.precip*100 + ' %';
                windSpeedMessage.textContent = data.wind_speed + ' km/h';
                windDirMessage.textContent = data.wind_dir;
            }
        })
    })
})
