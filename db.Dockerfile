FROM postgres:latest

WORKDIR app

ENV POSTGRES_PASSWORD er3T*wnw2

# load the data
# see: https://hub.docker.com/_/postgres - Initialization scripts
ADD ./db/county_mobility_covid.csv.gz /docker-entrypoint-initdb.d
ADD ./db/load_data.sh /docker-entrypoint-initdb.d