import Layout from "../../components/Layout/Layout";
import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";
import { useState } from "react";
import {isBlank} from "../../helpers";
import "./AddRoute.css";
import { addRoute, getUID } from "../../firebase";
import { useNavigate } from "react-router";

export default function AddRoute(props){
    function getDateString(date){
        return date.getFullYear()+"-" + (date.getMonth() + 1) + "-"+date.getDate()
    }

    const navigate = useNavigate();
    const today = getDateString(new Date());
    const position = {lat: 30.064637543428862, lng: 31.278832154799975};


    const [marker, setMarker] = useState(null);
    const [date, setDate] = useState(today);
    const [time, setTime] = useState("7:30 AM");
    const [from, setFrom] = useState("Choosen Point");
    const [to, setTo] = useState("Gate 3");
    const [price, setPrice] = useState(20);
    const [error, setError] = useState("");


    function onMapClick(e){
        const newMarker = {};
        newMarker.position = e.detail.latLng;
        newMarker.placeId = e.detail.placeId;
        setMarker(newMarker);
    }

    function changeTime(newTime){
        if(newTime == "7:30 AM"){
            setTo(from);
            setFrom("Choosen Point");
        }else if(newTime == "5:00 PM"){
            setFrom(to);
            setTo("Choosen Point");
        }
        setTime(newTime);
    }

    async function onSubmit(){
        if(isBlank(time) || isBlank(from) || isBlank(to) || isBlank(date) || !price){
            setError("All Fields are Required!");
            return;
        }
        if(marker == null){
            setError("You Must Choose a Location on the Map!");
            return;
        }
        const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${marker.position.lat},${marker.position.lng}&sensor=false&key=${process.env.REACT_APP_API_KEY}`);
        const data = await response.json();
        const address = data.results[0].formatted_address;
        addRoute({
            date: date,
            startTime: time,
            from: from,
            to: to,
            lat: marker.position.lat,
            lng: marker.position.lng,
            price: price,
            address: address,
            driver: getUID(),
            availableSeats: 4
        });
        navigate("/history");
    }

    return(
        <APIProvider apiKey={process.env.REACT_APP_API_KEY}>
            <Layout>
                <h1 className="mb-1">Create Route</h1>
                <div className="add row">
                    <div className="add-location card">
                        <h2 className="primary">1. Choose The Pickup/Dropoff Point</h2>
                        <div style={{height: "50vh"}}>
                            <Map center={position} zoom={10} onClick={onMapClick}>
                                {marker && <Marker position={marker.position}/>}
                            </Map>
                        </div>
                    </div>
                    <div className="add-route-info column card">
                        <div>
                            <h2 className="primary">2. Fill in the Route Info</h2>
                            <span style={{color: "red"}}>{error}</span>
                            <div className="add-item">
                                <label className="add-label primary">Route Date</label>
                                <input className="add-input" type="date" min={today} value={date} onChange={(e) => setDate(e.target.value)}/>
                            </div>
                            <div className="add-item">
                                <label className="add-label primary">Price</label>
                                <input type="number" value={price} onChange={(e) => setPrice(e.target.value)}/>
                            </div>
                            <div className="add-item">
                                <label className="add-label primary">Start Time</label>
                                <select value={time} onChange={(e) => changeTime(e.target.value)}>
                                    <option value="7:30 AM">7:30 AM</option>
                                    <option value="5:00 PM">5:00 PM</option>
                                </select>
                            </div>
                            <div className="add-item">
                                <label className="add-label primary">From</label>
                                {from == "Choosen Point" ? <span>Choosen Point</span> : 
                                <select value={from} onChange={(e) => setFrom(e.target.value)}>
                                    <option>Gate 3</option>
                                    <option>Gate 4</option>
                                </select>}
                            </div>
                            <div className="add-item">
                                <label className="add-label primary">To</label>
                                {to == "Choosen Point" ? <span>Choosen Point</span> : 
                                <select value={to} onChange={(e) => setTo(e.target.value)}>
                                    <option>Gate 3</option>
                                    <option>Gate 4</option>
                                </select>}
                            </div>
                        </div>
                        <button className="button" onClick={onSubmit}>Create Route</button>
                    </div>
                </div>
            </Layout>
        </APIProvider>
    );
}
