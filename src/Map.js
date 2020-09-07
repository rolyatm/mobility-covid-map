import React, { memo, useEffect, useState } from 'react';

import { ZoomableGroup, ComposableMap, Geographies, Geography } from "react-simple-maps";
import { scaleQuantile } from "d3-scale";
import { json } from "d3-fetch";

const geoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/counties-10m.json";

function getCountyTimeline(fips) {
    json(`http://localhost:8080/api/counties/${fips}`)
        .then(response => {
            if (response) {
                return response
            } else {
                return []
            }
        });
}

const Map = ({ setTooltipContent, layer }) => {
    const [data, setData] = useState([]);
    const layerKey = ((layer) ? layer.key : 'cases_per_10k');
    console.log(layerKey)
    useEffect(() => {
        // load data
        json("http://localhost:8080/api/maps")
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
            .range([
                "#ffedea",
                "#ffcec5",
                "#ffad9f",
                "#ff8a75",
                "#ff5533",
                "#e2492d",
                "#be3d26",
                "#9a311f",
                "#782618"
            ]),
        deaths_per_10k: scaleQuantile()
        .domain(data.map(d => d.deaths_per_10k))
        .range([
            "#ffedea",
            "#ffcec5",
            "#ffad9f",
            "#ff8a75",
            "#ff5533",
            "#e2492d",
            "#be3d26",
            "#9a311f",
            "#782618"
        ]),
        residential: scaleQuantile()
        .domain(data.map(d => d.residential))
        .range([
            "#ffedea",
            "#ffcec5",
            "#ffad9f",
            "#ff8a75",
            "#ff5533",
            "#e2492d",
            "#be3d26",
            "#9a311f",
            "#782618"
        ]),
        workplaces: scaleQuantile()
        .domain(data.map(d => d.workplaces))
        .range([
            "#ffedea",
            "#ffcec5",
            "#ffad9f",
            "#ff8a75",
            "#ff5533",
            "#e2492d",
            "#be3d26",
            "#9a311f",
            "#782618"
        ]),           
    }

    return (
        <ComposableMap data-tip="" projection="geoAlbersUsa">
            <ZoomableGroup>
                <Geographies geography={geoUrl}>
                    {({ geographies }) =>
                        geographies.map(geo => {
                            // TODO data missing some counties - need a more complete source or better handling
                            const current = data.find(d => d.fips === geo.id);
                            // join our data sources
                            geo.properties = Object.assign(geo.properties, current);

                            return (
                                <Geography
                                    key={geo.rsmKey}
                                    geography={geo}
                                    fill={current ? layerScales[layerKey](geo.properties[layerKey]) : "#EEE"}
                                    stroke="#E4E5E6"
                                    strokeWidth={0.5}
                                    onMouseEnter={() => {
                                        // get timeline data if we haven't already
                                        //console.log(geo.properties);
                                        // if (!('timeline' in geo.properties)) {
                                        //     const timeline = getCountyTimeline(geo.id);
                                        //     console.log(timeline)
                                        //     geo.properties.timeline = timeline;
                                        // }
                                        console.log(geo.properties);
                                        const { state, county } = geo.properties;
                                        let value = `${Math.round(geo.properties[layerKey])} cases per 10k people`;
                                        if (!geo.properties[layerKey]) {
                                            value = 'Not Reported';
                                        }
                                        let location = `${county}, ${state}`;
                                        if (!state || !county) {
                                            location = `${geo.properties.name} County`; // fall back for no data
                                        }
                                        
                                        setTooltipContent(`${location} — ${value}`);
                                        }}
                                        onMouseLeave={() => {
                                        setTooltipContent("");
                                        }}
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
                        })
                    }
                </Geographies>
            </ZoomableGroup>
        </ComposableMap>
    );
};

export default memo(Map);