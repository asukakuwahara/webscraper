const Nightmare = require("nightmare")
const nightmare = Nightmare({ show: true })

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
  .select(lengthSelector, length) //show 100 entries on screen
  .wait(data)
  .evaluate((header, data)=>{
    let table = [];
    let fields = [];
    $(header).each((index, value) => {
      fields.push(value.innerHTML)
    })
    $(data).each((index, value) => {
      const item = {}
      $(value).children().each((index, value) => {
        item[fields[index]] = value.innerHTML;
      })
      table.push(item)
    })
    const outputData = {table, fields}
    return outputData
  }, header, data)
  .end()
  .then((result) => {
    console.log(result)
  })
  .catch(error => {
    console.error("Search failed:", error)
  })