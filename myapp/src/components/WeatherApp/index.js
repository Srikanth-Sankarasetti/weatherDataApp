import {Component} from "react"
import Header from "../Header"
import CurrentLocation from "../CurrentLocation"

import "./index.css"


class WeatherApp extends Component{
    render(){
        return(
            <div className="main-container">
               <Header/>
               <CurrentLocation/>
            </div>
        )
    }
}

export default WeatherApp