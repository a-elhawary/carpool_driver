import { useNavigate } from "react-router";
import { getUID } from "../../firebase";
import NavBar from "../NavBar/NavBar";
import { useEffect, useState} from "react";
import { listenForRequests, changeRequestStatus } from "../../firebase";
import "./Layout.css";

export default function Layout(props){
    const navigate = useNavigate();
    const [requests, setRequests] = useState([]);

    useEffect(
        function (){
            if(getUID() == null){
                navigate("/login")
            }

            const unsubscribe = listenForRequests((requests) => {
                setRequests(requests);
            });
            
            return () => unsubscribe();
        }
    , []);

    return(
        <>
            <NavBar />
            {
                requests.map((request) => (
                    <div className="request">
                        <div className="request-content">
                            <div className="request-title">Someone Requested a Ride!</div>
                            <div className="request-actions">
                                <button onClick={()=>changeRequestStatus(request.id, "accepted")} className="request-accept button">Accept</button>
                                <button onClick={()=>changeRequestStatus(request.id, "rejected")} className="request-reject button">Reject</button>
                            </div>
                        </div>
                    </div>
                ))
            }
            <div className="content">
                {props.children}
            </div>
        </>
    );
}