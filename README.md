# GHG (CO2) Emissions & Air Pollution in PA by County 2009-2019

Group 1 Contributors: Anthony Hopkins, Andrew Kromer, Dipesh Timsina, Megan Spriesterbach

***Application deployed through Heroku: https://ghg-pa.herokuapp.com/***

#### Project Overview

Building off of the first project, we decided to dive deeper into the carbon emissions and air pollution on the county level in Pennsylvania. We utilized two datasets: Air Pollution Data from EDDIE (https://www.phaim1.health.pa.gov/EDD/WebForms/AirQualityCnty.aspx) and Facility Data from the EPA (https://ghgdata.epa.gov/ghgp/main.do). 

#### Project Requirements and Approach

- Dataset with at least 100 records
  - Facility Level data was exported in a multi-sheet CSV file, cleaned in Pandas (handled NaN values, cleaned up county names) and exported directly into a SQLite database
  - Air Pollution data was cleaned utilizing Pandas and exported directly into a SQLite database
- Python Flask-powered API, HTML/CSS, JavaScript, and a database
  - Various app routes were created in a Python Flask-powered API to read in data from the SQLite database in order to access the data to render plots/charts
  - Created functions to build plots/charts and rendered it to the index.html page
  - Index.html built with HTML & CSS for styling
- Visualize the data utilizing D3, Leaflet or Plotly (must have at least 3 views)
  - Utilized Plotly for rendering of Air Pollution & CO2 Emissions graphs/charts & D3 for the bubble chart
- A JS library not covered in Bootcamp
  - Used Anychart for pie graph
- User-driven interaction
  - D3 includes tooltips when hovering over the bubbles

#### Findings

- Based on air quality standards set by the NAAQS, 2010 was the worst year for air quality, and since 2014 has trended around 200 days over the standard.
- From 2009-2018, counties with the worst air quality are Philadelphia and Allegheny; Indiana county was #14
- Indiana and Armstrong had the largest overall carbon emissions in 2019, nearly 20M and 12M respectively.
- Arclight Capital LLC (an energy conglomerate) accounted for nearly 53.4% of all CO2 emissions in Indiana County & 95.8% of all emissions in Armstrong County
- No direct correlation between a county's carbon emissions and air quality.

#### Limitations

- Out of 67 counties in PA, 13 counties reported zero (0) and 27 counties reporting no data at all in terms of air pollution in 2018 dataset from EDDIE
- Total population size of county affects overall-person days; for example, if two counties have the same number of days above NAAQS but one of the counties has a much larger population, that county will have more person-days above NAAQS because: Number of days above NAAQS x number of people = number of person-days above NAAQS. This can explain why there is seemingly no correlation between GHG and air pollution in regards to Indiana and Armstrong county because of their small population size.

#### Next Steps

- Successfully deploy application to Heroku
- Integrate a machine learning aspect into Project 3
- Explore ways to make this data "actionable" - we know carbon emissions have an overall negative impact, but what can be done?
