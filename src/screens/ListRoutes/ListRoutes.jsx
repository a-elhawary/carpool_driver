import { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import { changeRouteStatus, getRoutes } from "../../firebase";
import {getDateString} from "../../helpers";
import "./ListRoutes.css"

function Loading(){
    return <span>Loading...</span>
}

export default function ListRoutes(){
    const [routes, setRoutes] = useState(null);
    const [refresh, setRefesh] = useState(true);

    useEffect(()=>{
        getRoutes().then(
            (routes) => setRoutes(routes)
        );
    }, [refresh]);

    console.log(routes);

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
                        <td>{getDateString(new Date(route.data.date.seconds * 1000))}</td>
                        <td>{route.data.startTime}</td>
                        <td>{route.data.from == "Choosen Point" ? route.data.address : route.data.from}</td>
                        <td>{route.data.to == "Choosen Point" ? route.data.address : route.data.to}</td>
                        <td>{route.data.price}</td>
                        <td>{route.data.availableSeats}</td>
                        <td>
                            <select className={route.data.status} value={route.data.status} onChange={async (e) => {await changeRouteStatus(route.id, e.target.value); setRefesh(!refresh);}}>
                                <option value="accepting">Accepting</option>
                                <option value="pending">Pending</option>
                                <option value="running">Running</option>
                                <option value="completed">Completed</option>
                            </select>
                        </td>
                    </tr>)}
                </tbody>
            </table>
            }
        </Layout>
    );
}