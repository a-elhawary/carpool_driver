import "./Login.css";
import logo from "../../logo.png";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { isBlank } from "../../helpers";
import { LogIn } from "../../firebase";

export default function Login(){

    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");

    async function handleLogin(){
        if(isBlank(email) || isBlank(pass)){
            setError("All Fields are Required!");
            return;
        }
        setError("");
        const user = await LogIn(email, pass);
        if(typeof user == "string"){
            setError("Invalid Username or Password");
        }else{
            navigate("/history");
        }
    }

    return(
        <div className="login-screen">
            <div className="login-container">
                <img className="login-image" src={logo} />
                <div className="card">
                    <div className="login-title">Welcome Back!</div>
                    <div style={{color: "red"}}>{error}</div>
                    <div className="login-label">Email</div>
                    <input className="login-input" type="text" onChange={(e) => setEmail(e.target.value)}/>
                    <div className="login-label">Password</div>
                    <input className="login-input" type="password" onChange={(e) => setPass(e.target.value)}/>
                    <button className="button" onClick={handleLogin}>Login</button>
                    <Link className="login-nav-btn" to="/register">Or Sign Up</Link>
                </div>
            </div>
        </div>
    );
}