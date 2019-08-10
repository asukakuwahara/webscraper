const Nightmare = require("nightmare");
const fs = require("fs")
const { Parser } = require("json2csv");

const nightmare = Nightmare({ show: true })

//list of inputs
const google = "https://www.google.com/"
const inputContent = "datatables"
const searchBar = ".gLFyf"
const searchButton = ".gNO89b"
const resultElem = ".r > a"
const correctURL = "https://datatables.net/"
const headerElem = "table#example thead th"
const dataElem = "table#example tbody tr"
const lengthSelector = "select[name='example_length']"
const length = 100;

nightmare
  //opens google, type "datatables" and search
  .goto(google)
  .type(searchBar, inputContent)
  .click(searchButton)
  .wait(resultElem)

  //finds the link that matches to the correct URL and clicks
  .evaluate((resultElem, correctURL) => {
    const searchResult = Array.from(document.querySelectorAll(resultElem)).filter(a => a.href === correctURL)
    searchResult[0].click()
  }, resultElem, correctURL) //passes parameters from Node scope to browser scope
  .wait(dataElem)
  .select(lengthSelector, length) //show all entries on screen
  .wait(dataElem)
  .evaluate((headerElem, dataElem)=>{
    const table = [];
    const fields = [];

    //store all headers to the fields array
    $(headerElem).each((index, value) => {
      fields.push(value.innerHTML)
    })

    //store all data to the table array
    $(dataElem).each((index, value) => {
      const item = {}
      $(value).children().each((index, value) => {
        item[fields[index]] = value.innerHTML;
      })
      table.push(item)
    })

    //store headers and data in an object
    const outputData = {table, fields}
    return outputData
  }, headerElem, dataElem) //passes parameters from Node scope to browser scope
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