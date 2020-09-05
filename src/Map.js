import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import './Map.css';
//import counties from './counties-10m.json';

mapboxgl.accessToken = 'pk.eyJ1IjoicmFkLWljYWwiLCJhIjoiY2s5dWNkdWVlMDBkcDNtcnVwODJycHVmZiJ9.jtV0TZAE7ZYW4hHz3r8dQA';
//mapboxgl.accessToken = 'pk.eyJ1Ijoiam4xNTMyIiwiYSI6ImNpbnBoczBzejEwMXZ1Mm0zbWowdGxtOHgifQ.OioFRlO4Ou3Og3sMBxmfbA'
const Map = () => {
    const mapContainerRef = useRef(null);

    // const [lng, setLng] = useState(-95);
    // const [lat, setLat] = useState(40);
    // const [zoom, setZoom] = useState(2.5);

    useEffect(() => {
        const map = new mapboxgl.Map({
            container: mapContainerRef.current,
            style: 'mapbox://styles/mapbox/light-v10',
            center: [-95, 40],
            zoom: 2.5
        });

        map.addControl(new mapboxgl.NavigationControl(), 'top-right');

        // map.addSource('counties', {
        //     "type": "vector",
        //     "url": "mapbox://mapbox.82pkq93d"
        // });
    
        // map.addLayer({
        //     "id": "counties",
        //     "type": "fill",
        //     "source": "counties",
        //     "source-layer": "original",
        //     "paint": {
        //         "fill-outline-color": "rgba(0,0,0,0.1)",
        //         "fill-color": "rgba(0,0,0,0.1)"
        //     }
        // }, 'place-city-sm'); // Place polygon under these labels.
        // map.on('load', () => {
        //     map.addSource('counties')
        // })

        // map.on('move', () => {
        //     setLng(map.getCenter().lng.toFixed(4));
        //     setLat(map.getCenter().lat.toFixed(4));
        //     setZoom(map.getZoom().toFixed(2));
        // });

        return () => map.remove();
    }, []);

    return (
        <div>
            <div className='map-container' ref={mapContainerRef}/>
        </div>
    );
};

export default Map;