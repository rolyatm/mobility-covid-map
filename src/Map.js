import React, { memo, useEffect, useState } from 'react';

import { ZoomableGroup, ComposableMap, Geographies, Geography } from "react-simple-maps";
import { scaleQuantile } from "d3-scale";
import { json } from "d3-fetch";

import LayerChoice from './LayerChoice';

const server = (process.env.DEV==='0' ? '/' : 'http://localhost:8080/');
const geoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/counties-10m.json";

const colorRamp = [
    "#ffedea",
    "#ffcec5",
    "#ffad9f",
    "#ff8a75",
    "#ff5533",
    "#e2492d",
    "#be3d26",
    "#9a311f",
    "#782618"
];
const reversedRamp = colorRamp.slice().reverse();

// add selected layer values
const descriptions = {
    cases_per_10k: ((value) => `${value} cases per 10k people`), 
    deaths_per_10k: ((value) => `${value} deaths per 10k people`), 
    residential: ( (value) => {
        const text= (value>=0) ? '% inrease in time spent in residences' : '% decrease in time spent in residences';
        return `${Math.abs(value)}${text}`
    }),
    workplaces: ( (value) => {
        const text= (value>=0) ? '% inrease in time spent in workplaces' : '% decrease in time spent in workplaces';
        return `${Math.abs(value)}${text}`
    })
};

const Map = ({ setTooltipContent }) => {
    const [data, setData] = useState([]);
    const [layer, setLayer] = useState('');

    const layerKey = ((layer) ? layer.key : 'cases_per_10k');
    useEffect(() => {
        // load data
        json(`${server}api/maps`)
            .then(response => {
                if (response) {
                    setData(response)
                } else {
                    setData([])
                }
            });
    }, []);

    const layerScales = {
        cases_per_10k: scaleQuantile()
            .domain(data.map(d => d.cases_per_10k))
            .range(colorRamp),
        deaths_per_10k: scaleQuantile()
        .domain(data.map(d => d.deaths_per_10k))
        .range(colorRamp),
        residential: scaleQuantile()
        .domain([-30,30])
        .range(reversedRamp),
        workplaces: scaleQuantile()
        .domain([-30,30])
        .range(colorRamp)
    }

    return ( 
        <>
        <LayerChoice setMapLayer={setLayer} />
        <ComposableMap data-tip="" projection="geoAlbersUsa">
        <ZoomableGroup>
            <Geographies geography={geoUrl}>
                {({ geographies }) => geographies.map(geo => {
                    const current = data.find(d => d.fips === geo.id);
                    // join our data sources
                    geo.properties = Object.assign(geo.properties, current);
                    // console.log(geo.properties[layerKey])
                    // console.log(current ? layerScales[layerKey](geo.properties[layerKey]) : "#EEE")
                    return ( <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        fill={geo.properties[layerKey] ? layerScales[layerKey](geo.properties[layerKey]) : "#EEE"}
                        stroke="#E4E5E6"
                        strokeWidth={0.5}
                        onMouseEnter={() => {
                            //console.log(geo.properties);
                            // set location for tooltip
                            const { state, county } = geo.properties;
                            let location = `${county}, ${state}`;
                            if (!state || !county) {
                                location = `${geo.properties.name} County`; // fall back for no data
                            }
                            // format for data values
                            let value = 'Not Reported';
                            if (geo.properties[layerKey]) {
                                value = `${descriptions[layerKey](Math.round(geo.properties[layerKey]))}`;
                                //value = `${Math.round(geo.properties[layerKey])}${descriptions[layerKey]}`;
                            }
                            setTooltipContent(`${location}: ${value}`);
                        }}
                        onMouseLeave={() => { setTooltipContent(""); }}
                        style={{
                            default: {
                                outline: '#F53'
                            },
                            hover: {
                                outline: "#F53"
                            },
                            pressed: {
                                outline: "#E42"
                            }
                        }}
                    />
                    );
                })}
            </Geographies>
        </ZoomableGroup>
    </ComposableMap>
    </>
    );
};

export default memo(Map);