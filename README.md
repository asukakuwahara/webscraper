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

2. CD into the folder and install dependencies

```
cd webscraper
npm i
```

3. Execute the file from terminal  <br />
*Delete the output.csv before executing to see the new file created 

```
node index.js
```

4. Check the created output.csv file to see the result <br />
   <br />
*If output.csv cannot be found, 
try installing xvfb for virtual server display as follows.
- Install dependencies for xvfb
```
sudo apt-get update &&\
  sudo apt-get install -y libgtk2.0-0 libgconf-2-4 \
  libasound2 libxtst6 libxss1 libnss3 xvfb
```

- Run code with xvfb
```
xvfb-run node index.js
```

Source: <br />
https://github.com/segmentio/nightmare/issues/224#issuecomment-141575361

## Dependencies
  - nightmare
  - jQuery
  - json2csv
