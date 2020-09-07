psql -c "CREATE TABLE IF NOT EXISTS county_covid_mobility
    (record_date date,
     fips varchar,
     active_cases int,
     deaths int,
     state char(2),
     county varchar,
     total_population int,
     workplaces int,
     residential int);"
psql -c "\copy county_covid_mobility FROM '/app/county_covid_mobility.csv' delimiter ',' csv header"