
import {AiOutlineSearch} from "react-icons/ai"
import {Link} from "react-router-dom"
import "./index.css"


const Header =()=>(
    <nav  className="nav_head">
    <Link to="/">
    <img className="logo" src="https://res.cloudinary.com/ducrzzdqj/image/upload/v1683996565/18552765_sz4q_8ak6_210430_jnnnnw.jpg" alt="weather_logo"/>
    </Link>
    <ul className="link-list">
        <li>
            <Link to="/" className="lick-url">
            My location
            </Link>
        </li>   
        <li>
            <Link to="favoritelocations" className="lick-url">
           Favorite locations
        </Link>
        </li>
        <li>
            <Link to="/search">
            <AiOutlineSearch size={20} color="white" />
            </Link>
        </li>
    </ul>
</nav>
)


export default Header