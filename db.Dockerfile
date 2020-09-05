FROM postgres:latest

WORKDIR /app

ENV POSTGRES_PASSWORD er3T*wnw2

# load the data
# see: https://hub.docker.com/_/postgres - Initialization scripts
ADD db/county_mobility_covid.csv.gz .
# add should automatically extract the .gz but it isn't.
RUN gunzip county_mobility_covid.csv.gz
ADD db/load-data.sh /docker-entrypoint-initdb.d