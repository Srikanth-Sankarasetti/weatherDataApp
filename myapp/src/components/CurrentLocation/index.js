import { Component } from "react";
import {TailSpin} from "react-loader-spinner"
import "./index.css"

const initialApiStatus={
    initial:"INITIAL",
    progress:"IN_PROGRESS",
    success:"SUCCESS",
    failure: "FAILURE"
}

class CurrentLocation extends Component{
    state={
        username:"",
        isUserNameEmpty:false,
        weatherDetails:[],
        apiStatus:initialApiStatus.initial
    }

 componentDidMount(){
    navigator.geolocation.getCurrentPosition((position)=>{
        this.gettingWeatherDetails(position)
        
    },
    (error)=>{
        alert("Error code="+error.code+" - "+error.message)
    }
    )
 }


gettingWeatherDetails=async(position)=>{
    this.setState({apiStatus:initialApiStatus.progress})
    const response=await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=67ff15dadf20008c0a3b66fa51ecffbd&units=metric`)
    if(response.ok===true){
    const data=await response.json()
    const Details={
        latitude:data.coord.lat,
        longitude:data.coord.lon,
        city:data.name,
        temp:data.main.temp,
        humidity:data.main.humidity,
        description:data.weather[0].description,
        main:data.weather[0].main,
        icon:data.weather[0].icon,
        windDegre:data.wind.deg,
        windSpeed:data.wind.speed,
        country:data.sys.country
    }
    this.setState({weatherDetails:Details,apiStatus:initialApiStatus.success})
}
}


renderLoader=()=>(
    <div className="loader">
    <TailSpin color="red" width="50" height="50" ariaLabel="tail-spin-loading" visible={true}/>
    </div>
)

 subimitName=()=>{
    const {username}=this.state
    if(username!==""){
    this.setState({isUserNameEmpty:true})
}

 }

 usernameChange=(event)=>{
    this.setState({username:event.target.value})
 }

 renderWeatherDetails=()=>{
    const {weatherDetails,username}=this.state
    const {latitude,longitude,description,city,windSpeed,temp,country}=weatherDetails
    return(<>
    <div className="currentLocationContainer"> 
                <h1 className="NameHead">Hi {username.toUpperCase()}</h1>
                <p className="para">Your Current Location weather detials are</p>
                <div className="latitudeandlongitudeDetails">
                    <p>Latitude: <span className="spanElement">{latitude} </span></p>
                    <p>Longitude: <span className="spanElement">{longitude}</span></p>
                </div>
                <div>
                    <h1 className="header">Weather:  <span className="spanElement">{description}</span></h1>
                    <h1 className="header">City:<span className="spanElement">{city}</span></h1>
                    <h1 className="header">Country:<span className="spanElement">{country}</span></h1>
                    <h1 className="header">Temparature:<span className="spanElement">{temp}</span> <span className="deg">Deg Cel</span></h1>
                    <h1 className="header">WindSpeed:<span className="spanElement">{windSpeed}</span> <span className="deg">Km/h</span></h1>
                </div>
            </div>
    </>
 )}


 renderDataOnApiStatus=()=>{
    const {apiStatus}=this.state
    switch(apiStatus){
        case initialApiStatus.progress:
            return this.renderLoader()
        case initialApiStatus.success:
            return this.renderWeatherDetails()
        default:
            return null
    }
 }

    render(){
        const {isUserNameEmpty}=this.state
        if(isUserNameEmpty===false){
           return <>
            <div className="username-container">
                <h1 className="name-header">Please Enter Your Name</h1>
                <input className="name-input" type="text" placeholder="Your Name" onChange={this.usernameChange} required/>
                <button onClick={this.subimitName} className="button" type="button">Enter</button>
            </div>
            </>
        }
        return(<>
            {this.renderDataOnApiStatus()}
        </>)
    }
}

export default CurrentLocation