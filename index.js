const Nightmare = require("nightmare")
const nightmare = Nightmare({ show: true })

//list of inputs
const google = "https://www.google.com/"
const inputContent = "datatables"
const searchBar = ".gLFyf"
const searchButton = ".gNO89b"
const resultElement = "h3.r > a"

nightmare
  //go to google, type "datatables" and search
  .goto(google)
  .type(searchBar, inputContent)
  .click(searchButton)
  .wait(resultElement)
  .evaluate(() => {
    return 'working'
  })
  .end()
  .then((result) => {
    console.log(result)
  })
  .catch(error => {
    console.error("Search failed:", error)
  })