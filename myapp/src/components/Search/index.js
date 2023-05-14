import { Component } from "react"
import {AiOutlineSearch} from "react-icons/ai"
import {Link} from "react-router-dom"



import "./index.css"

const initialApiStatus={
    initial:"INITIAL",
    progress:"IN_PROGRESS",
    success:"SUCCESS",
    failure: "FAILURE"
}

class Search extends Component{
   state={
    city:"",
    isCityEmpty:false,
    cityWeatherDetails:[],
    apiStatus:initialApiStatus.initial
   }


   cityUpdate=(event)=>{
    this.setState({city:event.target.value})
   }

   searchWeather=()=>{
    const {city}=this.state
    if(city!==""){
     this.renderData()      
    }
   }

renderData=async ()=>{
    this.setState({apiStatus:initialApiStatus.progress})
    const {city}=this.state
    const response=await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=67ff15dadf20008c0a3b66fa51ecffbd&units=metric`)
    if(response.ok===true){
        this.setState({isCityEmpty:true})
        const data=await response.json()
        const Details={
            latitude:data.coord.lat,
            longitude:data.coord.lon,
            city:data.name.toUpperCase(),
            temp:data.main.temp,
            humidity:data.main.humidity,
            description:data.weather[0].description,
            main:data.weather[0].main,
            icon:data.weather[0].icon,
            windDegre:data.wind.deg,
            windSpeed:data.wind.speed,
            country:data.sys.country,
        }
        this.setState({cityWeatherDetails:Details,apiStatus:initialApiStatus.success})
    }else{
        alert("City Not Found")
    }
}




    render(){
        const {isCityEmpty,cityWeatherDetails}=this.state
        const {latitude,longitude,description,city,windSpeed,temp,country}=cityWeatherDetails
        return(
            <div className="main-containe">
                <div className="search-details">
                <input className="search" type="search" placeholder="Enter The City Name" onChange={this.cityUpdate}/>
                <button className="search-button" type="button" onClick={this.searchWeather}><AiOutlineSearch color="white"/></button>
                </div>
                <Link to="/">
                <button onClick={this.returnHome} className="back-button" type="button">Back</button></Link>
                {isCityEmpty?(<div className="currentLocationContainer">
                    <h1 className="search-head">{city} </h1>
                    <p className="search-para">Weather Details</p>
                    <div className="latitudeandlongitudeDetails">
                        <h1 className="lat-and-log">Latitude : <span>{latitude}</span></h1>
                        <h1 className="lat-and-log">Longitude : <span>{longitude}</span></h1>
                    </div>
                    <div>
                    <h1 className="header">Weather:  <span className="spanElement">{description}</span></h1>
                    <h1 className="header">City:<span className="spanElement">{city}</span></h1>
                    <h1 className="header">Country:<span className="spanElement">{country}</span></h1>
                    <h1 className="header">Temparature:<span className="spanElement">{temp}</span> <span className="deg">Deg Cel</span></h1>
                    <h1 className="header">WindSpeed:<span className="spanElement">{windSpeed}</span> <span className="deg">Km/h</span></h1>
                </div>            
                </div>):null}
            </div>
        )
    }
}


export default Search
