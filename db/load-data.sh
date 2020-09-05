psql -c "CREATE TABLE IF NOT EXISTS county_mobility_covid
    (record_id int,
     record_date date,
     state char(2),
     county varchar,
     fips varchar,
     retail_and_recreation int,
     grocery_and_pharmacy int,
     parks int,
     transit_stations int,
     workplaces int,
     residential int,
     total_population int,
     active_cases int,
     deaths int,
     fips_string varchar);"
psql -c "\copy county_mobility_covid FROM '/app/county_mobility_covid.csv' delimiter ',' csv header"