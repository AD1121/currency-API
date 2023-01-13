// Added html attributes
const searchBtn = document.getElementById('search-btn')
const tblBody = document.querySelector('table tbody')
const searchInput1 = document.getElementById('search-input-one')
const searchInput2 = document.getElementById('search-input-two')
// Getting h3 to add the result of the both input
const comparedCurrencies = document.getElementById('compared-currencies')

// Function for the search button
searchBtn.addEventListener('click', compared_currencies)

async function list_all() {
  try {
    const response = await fetch(
      'https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies.json'
    )
    const list = await response.json()

    // Getting the value for the currency and country
    let currencyHTML = ''
    let countryHTML = ''
    for (let currency of Object.keys(list)) {
      // Making sure that currency have a value, otherwise adding a '-' to it
      if (list[currency] === '') {
        list[currency] = '-'
      }

      countryHTML += `<li>${list[currency]}</li><hr/>`
      currencyHTML += `<li>${currency}</li><hr/>`
    }

    tblBody.innerHTML += `
            <tr>
                <td>
                    <ul>
                        ${currencyHTML}
                    </ul>
                </td>
                <td>
                    <ul>
                        ${countryHTML}
                    </ul>
                </td>
            </tr>
        `
  } catch (error) {
    throw new Error(error)
  }
}

list_all()

// Function that search button have in clikc event
async function compared_currencies() {
  try {
    const response = await fetch(
      `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${searchInput1.value}/${searchInput2.value}.json`
    )
    const list = await response.json()

    let countryHTML = ''
    for (let currency of Object.keys(list)) {
      countryHTML = list[currency]
      console.log(countryHTML)
    }

    // Adding the result into the h3 field
    comparedCurrencies.innerText = `1 ${searchInput1.value} = ${countryHTML} ${searchInput2.value}`

    searchInput1.value = '' // empty the value of the first input
    searchInput2.value = '' // empty the value of the second input
  } catch (error) {
    searchInput1.value = '' // empty the value of the first input
    searchInput2.value = '' // empty the value of the second input
    comparedCurrencies.innerText =
      'Invalid currency, please add a currency from the list below!'
    throw new Error(error)
  }
}
