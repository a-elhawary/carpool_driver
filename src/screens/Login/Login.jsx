import "./Login.css";
import logo from "../../logo.png";

export default function Login(){
    return(
        <div className="login-screen">
            <div className="login-container">
                <img className="login-image" src={logo} />
                <div className="card">
                    <div className="login-title">Welcome Back!</div>
                    <div className="login-label">Email</div>
                    <input className="login-input" type="text" />
                    <div className="login-label">Password</div>
                    <input className="login-input" type="password" />
                    <div className="login-label">Confirm Password</div>
                    <input className="login-input" type="password" />
                    <button className="login-button">Login</button>
                </div>
            </div>
        </div>
    );
}