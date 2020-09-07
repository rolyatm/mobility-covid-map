import React, { memo, useEffect, useState } from 'react';
import { json } from "d3-fetch";
import {XYPlot, XAxis, YAxis, HorizontalGridLines, VerticalGridLines, LineSeries} from 'react-vis';

import CountiesChoice from './CountiesChoice';

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


// get timeline data if we haven't already
//console.log(geo.properties);
// if (!('timeline' in geo.properties)) {
//     const timeline = getCountyTimeline(geo.id);
//     console.log(timeline)
//     geo.properties.timeline = timeline;
// }
const TimelineChart = () => {
    const [data, setData] = useState([]);
    const [county, setCounty] = useState('');
    const fips = ((county) ? county.id : '11001');
    
    // get initial data
    useEffect(() => {
        // load data
        json(`http://localhost:8080/api/counties/${fips}`)
            .then(response => {

                if (response) {
                    const series = {
                        'cases_per_10k': [],
                        'deaths_per_10k': [],
                        'residential': [],
                        'workplaces': []
                    };
                    for (let i=0; i < response.length; i++) {
                        series.cases_per_10k.push({x: new Date(response[i].record_date).getTime(), y:response[i].cases_per_10k});
                        series.deaths_per_10k.push({x: new Date(response[i].record_date).getTime(), y:response[i].deaths_per_10k});
                        series.residential.push({x: new Date(response[i].record_date).getTime(), y:response[i].residential});
                        series.workplaces.push({x: new Date(response[i].record_date).getTime(), y:response[i].workplaces});
                    }
                    const d = [];
                    for (const layer in series) {
                        d.push({
                            color: 'red',
                            fill: 'none',
                            key: layer,
                            data: series[layer]
                        })
                    }
                    setData(d);
                    // setData(response)
                } else {
                    setData([])
                }
            });
    }, []);
    return (
        <>
        <CountiesChoice setChartCounty={setCounty} />
        <XYPlot
            width={600}
            height={300}>
            <VerticalGridLines />
            <HorizontalGridLines />
            <XAxis
                title="Date"
                style={{
                    line: {stroke: '#ADDDE1'},
                    ticks: {stroke: '#ADDDE1'},
                    text: {stroke: 'none', fill: '#6b6b76', fontWeight: 600}
                }}
            />
            
            {data.map(props => (
                <LineSeries {...props} />
            ))}
        </XYPlot>
        </>
    )
}

export default memo(TimelineChart);