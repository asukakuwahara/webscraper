const Nightmare = require("nightmare")
const nightmare = Nightmare({ show: true })

//list of inputs
const google = "https://www.google.com/"
const inputContent = "datatables"
const searchBar = ".gLFyf"
const searchButton = ".gNO89b"
const resultElements = ".r > a"
const correctURL = "https://datatables.net/"


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
  .wait(2000)
  .end()
  .then((result) => {
    console.log(result)
    // console.log(result[0])
  })
  .catch(error => {
    console.error("Search failed:", error)
  })