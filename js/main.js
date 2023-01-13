const searchBtn = document.getElementById('search-btn')
const tblBody = document.querySelector('table tbody')
const searchInput1 = document.getElementById('search-input-one')
const searchInput2 = document.getElementById('search-input-two')
const comparedCurrencies = document.getElementById('compared-currencies')

searchBtn.addEventListener('click', compared_currencies)

async function list_all() {
  try {
    const response = await fetch(
      'https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies.json'
    )
    const list = await response.json()

    let currencyHTML = ''
    let countryHTML = ''
    for (let currency of Object.keys(list)) {
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
    console.log(error)
  }
}

list_all()

async function compared_currencies() {
  try {
    const response = await fetch(
      `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${searchInput1.value}/${searchInput2.value}.json`
    )
    const list = await response.json()
    console.log(list)

    let countryHTML = ''
    for (let currency of Object.keys(list)) {
      // if (list[currency] === '') {
      //   list[currency] = '-'
      // }
      countryHTML = list[currency]
      console.log(countryHTML)
    }

    comparedCurrencies.innerText = `1 ${searchInput1.value} = ${countryHTML} ${searchInput2.value}`

    searchInput1.value = ''
    searchInput2.value = ''
  } catch (error) {
    console.log(error)
  }
}
