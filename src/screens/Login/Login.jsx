import "./Login.css";
import logo from "../../logo.png";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function Login(){
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");

    function handleLogin(){
        console.log(email);
        console.log(pass);
    }

    return(
        <div className="login-screen">
            <div className="login-container">
                <img className="login-image" src={logo} />
                <div className="card">
                    <div className="login-title">Welcome Back!</div>
                    <div className="login-label">Email</div>
                    <input className="login-input" type="text" onChange={(e) => setEmail(e.target.value)}/>
                    <div className="login-label">Password</div>
                    <input className="login-input" type="password" onChange={(e) => setPass(e.target.value)}/>
                    <button className="login-button" onClick={handleLogin}>Login</button>
                    <Link className="login-nav-btn" to="/register">Or Sign Up</Link>
                </div>
            </div>
        </div>
    );
}