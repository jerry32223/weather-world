import React, { useState, useEffect } from "react";
import ReactMapGL, { Popup } from "react-map-gl";
import Weather from './weather'

const Map = () => {

    // const [gpsposition, setGpspositon] = useState({})

    useEffect(() => {
        if (navigator.geolocation) {
            let long = ""
            let lat = ""
            navigator.geolocation.getCurrentPosition(async (position) => {
                long = await position.coords.longitude.toFixed(4);
                lat = await position.coords.latitude.toFixed(4);
                // console.log(lat, long);

                setViewport({
                    width: '100vw',
                    height: '100vh',
                    latitude: parseFloat(lat),
                    longitude: parseFloat(long),
                    zoom: 8,
                })
            });
        }
    }, [])


    const [viewport, setViewport] = useState({
        width: '100vw',
        height: '100vh',
        latitude: 37.7577,
        longitude: -122.4376,
        zoom: 3,
    });

    const [showPopup, setShowPopup] = useState(false)
    const [addEntryLocation, setAddEntryLocation] = useState(null)

    const showCityPopup = event => {
        // console.log(event.srcEvent);
        const [longitude, latitude] = event.lngLat
        setAddEntryLocation({
            latitude: latitude,
            longitude: longitude
        })
        setShowPopup(true)
    }

    return (
        <ReactMapGL
            {...viewport}
            onViewportChange={setViewport}
            mapStyle="mapbox://styles/jerry3222/ckclf0wex00641ip2x07h7iiv"
            mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
            onClick={showCityPopup}
        >

            {showPopup && <Popup
                latitude={addEntryLocation.latitude}
                longitude={addEntryLocation.longitude}
                closeButton={true}
                closeOnClick={false}
                dynamicPosition={true}
                onClose={() => setShowPopup(false)}
                anchor="top" >
                <Weather latitude={addEntryLocation.latitude} longitude={addEntryLocation.longitude} />
            </Popup>}
        </ReactMapGL>
    );
}


export default Map;
