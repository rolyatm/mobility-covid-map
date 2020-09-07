import React, { useState } from 'react';
import ReactTooltip from "react-tooltip";
import { Container, Box, Typography, Link } from '@material-ui/core';
import Map from './Map';

//import TimelineChart from './TimelineChart';

function About() {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        {'Created by Mike Taylor'}
        <br />
        <Link color="inherit" href="https://github.com/rolyatm/mobility-covid-map">
          Github
        </Link>
      </Typography>
    );
  }

  function Header() {
    return (
      <>
      <Typography variant='h4' component='h1' gutterBottom>
        {'Mobility in the time of Coronavirus'}
      </Typography>
      <Typography variant='body1' gutterBottom>
          {'Visualizing the correlation between mobility and COVID-19'}
      </Typography>
      <Typography variant='body2' color='textSecondary'>
          {'In response to the COVID-10 pandemic, Google has released '}
          <Link color='inherit' href='https://www.google.com/covid19/mobility/'>
            {'community mobility reports'}
          </Link>
          {' to track changes in county level community movements patterns.'}
          <br />
          {'By comparing this data with the rate of COVID-19 cases per 10,000 people we can see how Stay-At-Home orders may affect the community spread of the Coronavirus.'}
      </Typography>
      <br />
      </>
    );
  }

export default function App() {
    const [content, setContent] = useState("");
    
    return (
        <Container>
            <Box my={1}>
              <Header />
              <Map setTooltipContent={setContent}/>
              <ReactTooltip>{content}</ReactTooltip>
              <About />
            </Box>
        </Container> 
    );
}