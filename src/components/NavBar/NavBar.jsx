import "./NavBar.css";
import logo from "../../logo.png";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOut } from "@fortawesome/free-solid-svg-icons";
import { LogOut } from "../../firebase";

export default function NavBar(){

    const navigate = useNavigate();

    function handleLogOut(){
        LogOut();
        navigate("/login");
    }

    return (
        <nav className="navbar">
            <img className="navbar-img" src={logo}></img>
            <div className="navbar-links">
                <Link className="navbar-link" to="/history">Your Routes</Link>
                <Link className="navbar-link" to="/add">Create Route</Link>
                <button className="navbar-btn" onClick={handleLogOut}>
                    Log out &nbsp;
                    <FontAwesomeIcon icon={faSignOut}/>
                </button>
            </div>
        </nav>
    );
}