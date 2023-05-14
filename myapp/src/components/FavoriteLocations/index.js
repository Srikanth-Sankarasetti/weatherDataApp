import { Component } from "react";
import Header  from "../Header";
import {v4 as uuidv4} from "uuid"
import Popup from "reactjs-popup"

import "./index.css"

const citys=[{
    id:uuidv4(),
    city:"Hyderabad"
},{
    id:uuidv4(),
    city:"Delhi"
},
{
    id:uuidv4(),
    city:"pune"
}]

class FavoriteLocations extends Component{
    state={
        cityDetails:citys,
        cityname:""
    }

    addcity=(event)=>{
        this.setState({cityname:event.target.value})
    }

    addCityToList=()=>{
        const{cityname}=this.state
        if(cityname!==""){
        const newCity={
            id:uuidv4(),
            city:cityname
        }
        this.setState(prevState=>({
            cityDetails:[...prevState.cityDetails,newCity],
            cityname:""
        }))
    }
    }

    render(){
        const {cityDetails,cityname}=this.state
        return(
            <div className="main-container">
            <Header/>
            <div className="city-container"> 
                <h1>Your Favorite City's</h1>
                <ul className="ul-list">
                    {cityDetails.map(each=>(
                        <li key={each.id}>
                            {each.city}
                        </li>
                    ))}
                </ul>
                <Popup
                    modal
                    trigger={
                    <button type="button" className="trigger-button">
                        Add City
                    </button>
                    }
                >
                    {close => (
                    <>
                        <div className="pop-container">
                        <p>Please Enter Your Favorite City name</p>
                        <input value={cityname} className="cityaddinput" type="text" placeholder="City Name" onChange={this.addcity}/>
                        <div className="addandclosebutton">
                        <button
                        type="button"
                        className="trigger-button"
                        onClick={this.addCityToList}
                        >
                        Add
                        </button>
                        <button
                        type="button"
                        className="trigger-button"
                        onClick={() => close()}
                        >
                        Close
                        </button>
                        </div>
                        </div>
                    </>
                    )}
                </Popup>
            </div>
            </div>
        )
    }
}

export default FavoriteLocations