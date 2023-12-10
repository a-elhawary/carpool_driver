import NavBar from "../NavBar/NavBar";
import "./Layout.css";

export default function Layout(props){
    return(
        <>
            <NavBar />
            <div className="content">
                {props.children}
            </div>
        </>
    );
}