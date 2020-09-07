
import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

const LayerChoice = ({ setMapLayer }) => {
    const [value, setValue] = useState(layers[0]);
    const [inputValue, sentInputValue] = useState('');
    //setMapLayer(value);
    return (
        <Autocomplete
            id="layer-select"
            value={value}
            options={layers}
            onChange={(event, newValue) => {
                setValue(newValue);
                setMapLayer(newValue);
            }}
            inputValue={inputValue}
            onInputChange={(event, newInputValue) => {
                sentInputValue(newInputValue);
            }}
            getOptionLabel={(option) => option.name}
            style={{ width: 300 }}
            disableClearable
            renderInput={(params) => <TextField {...params} label="Select a layer" variant="outlined" />}
      />
    );
  }
export default LayerChoice;

const layers = [
        {
            "name": "Cases per 10k people",
            "key": "cases_per_10k",
            "description": "Covid-19 cases per 10,000 people"
        },
        {
            "name": "Deaths per 10k people",
            "key": "deaths_per_10k",
            "description": "Covid-19 related deaths per 10,000 people"
        },
        {
            "name": "Community Mobility - Residential",
            "key": "residential",
            "description": "Change in movement from baseline to residential locations."
        },
        {
            "name": "Community Mobility - Workplaces",
            "key": "workplaces",
            "description": "Change in movement from baseline to work locations"
        }
    ];