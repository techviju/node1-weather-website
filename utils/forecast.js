const request = require('request')

const forecast = (latitude, longitude, callback)=>{
    const url="http://api.weatherstack.com/current?access_key=9d6fdeb533357a47516021cda65f2d42&query="+encodeURIComponent(latitude)+","+ encodeURIComponent(longitude)+""
    
    request({url, json:true}, (error, { body } = { })=>{
        if(error){
            callback('Unable to connect service!', undefined)
        }
        else if(!body){
            callback("Invalid geocode! Please try with another geocode", undefined)
        }
        else{
            callback(undefined, {
               temperature: body.current.temperature,
               feelslike: body.current.feelslike,
               wind_speed: body.current.wind_speed,
               wind_dir: windDir(body.current.wind_dir),
               precip: body.current.precip,
               localtime: body.location.localtime,
               location: body.location.name,
               country: body.location.country,
               descr: body.current.weather_descriptions[0]
            })
        }
    })
}
const windDir = (dir)=>{
    switch(dir) {
        case 'E': return 'East';
        case 'W': return 'West';
        case 'N': return 'North';
        case 'S': return 'South';
        default: return dir;
    }
}

module.exports = forecast
