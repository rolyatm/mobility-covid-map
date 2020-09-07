# mobility-covid-map

Visualizing the correlation between mobility and COVID-19

In response to the COVID-10 pandemic, Google has released community mobility reports to track changes in county level community movements patterns.
By comparing this data with the rate of COVID-19 cases per 10,000 people we can see how Stay-At-Home orders may affect the community spread of the Coronavirus.


Server uses docker-compose to manage back-end.

## Production mode
```
docker-compose up --build -d
```
This command will build the back-end components and creates a production build of the react app.

Navigate to localhost:8080 to see site.

## Development mode
Build db
```
docker build -t mobility-covid-map:db .
docker run -p 5432:5432 mobility-covid-map:db
```

To start server
```
npm run start-server
```

Start client
```
npm start
```

Navigate to localhost:3000 to see site.