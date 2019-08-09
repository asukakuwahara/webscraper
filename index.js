const Nightmare = require("nightmare");
const nightmare = Nightmare({ show: true })
const fs = require("fs")
const { Parser } = require("json2csv");
const { Promise } = require("bluebird");
Promise.promisifyAll(fs) 

//list of inputs
const google = "https://www.google.com/"
const inputContent = "datatables"
const searchBar = ".gLFyf"
const searchButton = ".gNO89b"
const resultElements = ".r > a"
const correctURL = "https://datatables.net/"
const header = "table#example thead th"
const data = "table#example tbody tr"
const lengthSelector = "select[name='example_length']"
const length = 100;

nightmare
  //opens google, type "datatables" and search
  .goto(google)
  .type(searchBar, inputContent)
  .click(searchButton)
  .wait(resultElements)

  //finds the link that matches to the correct URL and clicks
  .evaluate((resultElements, correctURL) => {
    const searchResult = Array.from(document.querySelectorAll(resultElements)).filter(a => a.href === correctURL)
    searchResult[0].click()
  }, resultElements, correctURL) //passes parameters from Node scope to browser scope
  .wait(data)
  .select(lengthSelector, length) //show all entries on screen
  .wait(data)
  .evaluate((header, data)=>{
    const table = [];
    const fields = [];

    //store all headers to the fields array
    $(header).each((index, value) => {
      fields.push(value.innerHTML)
    })

    //store all data to the table array
    $(data).each((index, value) => {
      const item = {}
      $(value).children().each((index, value) => {
        item[fields[index]] = value.innerHTML;
      })
      table.push(item)
    })

    //store headers and data in an object
    const outputData = {table, fields}
    return outputData
  }, header, data)
  .end()
  .then((result) => {

    //parse header and data arrays to csv
    const fields = result.fields
    const json2csvParser = new Parser({ fields });
    const csv = json2csvParser.parse(result.table);

    //produce a csv file and save it in root folder
    fs.writeFileSync("output.csv", csv, (err)=>{
      if(err) throw err;
      console.log("done!");
    })
  })
  .catch(error => {
    console.error("Search failed:", error)
  })