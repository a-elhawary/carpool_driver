import { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import { getRoutes } from "../../firebase";
import "./ListRoutes.css"

function Loading(){
    return <span>Loading...</span>
}

export default function ListRoutes(){
    const [routes, setRoutes] = useState(null);

    useEffect(()=>{
        getRoutes().then(
            (routes) => setRoutes(routes)
        );
    }, []);

    return(
        <Layout>
            <h1>Your Routes</h1>
            {routes == null ? <Loading /> : 
            <table className="routes">
                <thead>
                    <tr className="heading">
                        <th>Date</th>
                        <th>Start Time</th>
                        <th>From</th>
                        <th>To</th>
                        <th>Price</th>
                        <th>Available Seats</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {routes.map((route, index) => <tr key={index} className="route">
                        <td></td>
                        <td>{route.data.startTime}</td>
                        <td>{route.data.from == "Choosen Point" ? route.data.address : route.data.from}</td>
                        <td>{route.data.to == "Choosen Point" ? route.data.address : route.data.to}</td>
                        <td>{route.data.price}</td>
                        <td>{route.data.availableSeats}</td>
                        <td><span className={route.data.status}>{route.data.status}</span></td>
                    </tr>)}
                </tbody>
            </table>
            }
        </Layout>
    );
}