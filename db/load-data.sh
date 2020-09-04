#!/bin/bash
set -e

psql -c "COPY county_mobility_covid FROM 'county_mobility_covid.csv' delimiter ',' csv;"