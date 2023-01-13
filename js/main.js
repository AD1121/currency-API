const searchBtn = document.getElementById('search-btn')
const tblBody = document.querySelector('table tbody')

// searchBtn.addEventListener('click', list_choosen_currency)

async function list_all() {
  try {
    const response = await fetch(
      'https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies.json'
    )
    const list = await response.json()
    console.log(list)

    let currencyHTML = ''
    let countryHTML = ''
    for (let currency of Object.keys(list)) {
      if (list[currency] === '') {
        list[currency] = '-'
      }
      countryHTML += `<li>${list[currency]}</li><hr/>`
      currencyHTML += `<li>${currency}</li><hr/>`
      console.log(currencyHTML, countryHTML)
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
