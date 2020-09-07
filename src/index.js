import React from 'react';
import ReactDOM from 'react-dom';
import { CssBaseline } from '@material-ui/core';

import './styles.css';

import App from './App';

ReactDOM.render(
    <React.Fragment>
        <CssBaseline />
        <App />
    </React.Fragment>,
    document.getElementById('root')
);