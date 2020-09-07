SELECT record_date, fips, state, county, workplaces, total_population, residential
        FROM county_covid_mobility
        WHERE record_date IN (SELECT MAX(record_date) FROM county_covid_mobility)