# Webscraper

## Overview
This webscraper performs the following tasks:
1. Navigates to https://google.com.
2. Types "datatables" into google search.
3. Select https://datatables.net/ out of the results and clicks.
4. Finds a table example with some data. 
5. Fetches/extracts data from the table into array.
6. Exports the array as a CSV file.

## Getting Started
1. Clone the repository

```
git clone git@github.com:asucarlos/webscraper.git
```

2. CD into server folder and install dependencies

```
cd webscraper
npm i
```

3. Execute the file from terminal  <br />
*Delete the output.csv before executing to see the new file created 

```
node index.js
```

4. Check the created output.csv file to see the result

## Dependencies
  - nightmare
  - jQuery
  - json2csv
  - bluebird
