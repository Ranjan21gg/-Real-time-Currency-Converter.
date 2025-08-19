//currency converter
const BASE_URL = "https://latest.currency-api.pages.dev/v1/currencies";

const dropdowns = document.querySelectorAll(".dropdown datalist");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from input");
const toCurr = document.querySelector(".to input");
const msg = document.querySelector(".msg");
const date = document.querySelector(".date");


for (let datalist of dropdowns) {
  for (currCode in countryList) {
    //creating new option
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;
    datalist.append(newOption);
  };
  fromInput.addEventListener("input", (evt) => {
    updateFlag(evt.target);
    // if(Toinput === true){ updateExchangeRate()}
  })
  toInput.addEventListener("input", (evt) => {
    updateFlag(evt.target);
    updateExchangeRate();
  })
};


const updateExchangeRate = async () => {
  let amount = document.querySelector(".amount input");
  let amtVal = amount.value;
  if (amtVal === "" || amtVal < 1) {
    amtVal = 1;
    amount.value = "1";
  }

  const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;
  let response = await fetch(URL);
  let data = await response.json();

  let Date = data.date
  date.innerText = `DATE : ${Date}`

  let selectedCurrency = fromCurr.value.toLowerCase(); // e.g., 'usd'
  let currencyData = data[selectedCurrency]; // object containing all key-value pairs for that currency
  let rate = currencyData[toCurr.value.toLowerCase()]; // specific value
  let finalAmount = (amtVal * rate).toFixed(2);
  msg.innerText = `Exchange Value : ${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
  
  if (amtVal) {
    updateExchangeRate()
  }
};


const updateFlag = (element) => {
  let currCode = element.value;
  let countryCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
}


// btn.addEventListener("click", (evt) => {
// evt.preventDefault();
//   updateExchangeRate();
// });

window.document.addEventListener("load", (evt) => {
  evt.preventDefault();
  updateExchangeRate();
});

