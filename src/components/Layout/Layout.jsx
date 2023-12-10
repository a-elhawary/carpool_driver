import { useNavigate } from "react-router";
import { getUID } from "../../firebase";
import NavBar from "../NavBar/NavBar";
import "./Layout.css";
import { useEffect } from "react";

export default function Layout(props){
    const navigate = useNavigate();

    useEffect(
        () => {
            if(getUID() == null){
                navigate("/login")
            }
        }
    , []);

    return(
        <>
            <NavBar />
            <div className="content">
                {props.children}
            </div>
        </>
    );
}