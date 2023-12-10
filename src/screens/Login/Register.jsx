import "./Login.css";
import logo from "../../logo.png";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { isBlank } from "../../helpers";
import { SignUp } from "../../firebase";

export default function Register(){

    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [confirmPass, setConfirmPass] = useState("");

    async function handleRegister(){
        if(isBlank(email) || isBlank(pass) || isBlank(confirmPass)){
            setError("All Fields are Required!");
            return;
        }
        if(pass != confirmPass){
            setError("Passwords Don't Match!");
            return;
        }
        const regex = /^.*@eng\.asu\.edu\.eg$/;
        if(!regex.test(email)){
            setError("You Must Create an Account with an ASU email");
            return;
        }
        setError("");
        const user = await SignUp(email, pass);
        if(typeof user == "string"){
            setError(user);
        }else{
            // TODO: Save user to local storage for later use
            console.log(user);
            navigate("/home");
        }
    }

    return(
        <div className="login-screen">
            <div className="login-container">
                <img className="login-image" src={logo} />
                <div className="card">
                    <div className="login-title">Let's Get you Driving!</div>
                    <div style={{color: "red"}}>{error}</div>
                    <div className="login-label">Email</div>
                    <input className="login-input" type="text" onChange={(e) => setEmail(e.target.value)}/>
                    <div className="login-label">Password</div>
                    <input className="login-input" type="password" onChange={(e) => setPass(e.target.value)}/>
                    <div className="login-label">Confirm Password</div>
                    <input className="login-input" type="password" onChange={(e) => setConfirmPass(e.target.value)}/>
                    <button className="login-button" onClick={handleRegister}>Sign Up</button>
                    <Link className="login-nav-btn" to="/login">Or Log in</Link>
                </div>
            </div>
        </div>
    );
}