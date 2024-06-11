let country_list = {
  AED: "AE",
  AFN: "AF",
  XCD: "AG",
  ALL: "AL",
  AMD: "AM",
  ANG: "AN",
  AOA: "AO",
  AQD: "AQ",
  ARS: "AR",
  AUD: "AU",
  AZN: "AZ",
  BAM: "BA",
  BBD: "BB",
  BDT: "BD",
  XOF: "BE",
  BGN: "BG",
  BHD: "BH",
  BIF: "BI",
  BMD: "BM",
  BND: "BN",
  BOB: "BO",
  BRL: "BR",
  BSD: "BS",
  NOK: "BV",
  BWP: "BW",
  BYR: "BY",
  BZD: "BZ",
  CAD: "CA",
  CDF: "CD",
  XAF: "CF",
  CHF: "CH",
  CLP: "CL",
  CNY: "CN",
  COP: "CO",
  CRC: "CR",
  CUP: "CU",
  CVE: "CV",
  CYP: "CY",
  CZK: "CZ",
  DJF: "DJ",
  DKK: "DK",
  DOP: "DO",
  DZD: "DZ",
  ECS: "EC",
  EEK: "EE",
  EGP: "EG",
  ETB: "ET",
  EUR: "FR",
  FJD: "FJ",
  FKP: "FK",
  GBP: "GB",
  GEL: "GE",
  GGP: "GG",
  GHS: "GH",
  GIP: "GI",
  GMD: "GM",
  GNF: "GN",
  GTQ: "GT",
  GYD: "GY",
  HKD: "HK",
  HNL: "HN",
  HRK: "HR",
  HTG: "HT",
  HUF: "HU",
  IDR: "ID",
  ILS: "IL",
  INR: "IN",
  IQD: "IQ",
  IRR: "IR",
  ISK: "IS",
  JMD: "JM",
  JOD: "JO",
  JPY: "JP",
  KES: "KE",
  KGS: "KG",
  KHR: "KH",
  KMF: "KM",
  KPW: "KP",
  KRW: "KR",
  KWD: "KW",
  KYD: "KY",
  KZT: "KZ",
  LAK: "LA",
  LBP: "LB",
  LKR: "LK",
  LRD: "LR",
  LSL: "LS",
  LTL: "LT",
  LVL: "LV",
  LYD: "LY",
  MAD: "MA",
  MDL: "MD",
  MGA: "MG",
  MKD: "MK",
  MMK: "MM",
  MNT: "MN",
  MOP: "MO",
  MRO: "MR",
  MTL: "MT",
  MUR: "MU",
  MVR: "MV",
  MWK: "MW",
  MXN: "MX",
  MYR: "MY",
  MZN: "MZ",
  NAD: "NA",
  XPF: "NC",
  NGN: "NG",
  NIO: "NI",
  NPR: "NP",
  NZD: "NZ",
  OMR: "OM",
  PAB: "PA",
  PEN: "PE",
  PGK: "PG",
  PHP: "PH",
  PKR: "PK",
  PLN: "PL",
  PYG: "PY",
  QAR: "QA",
  RON: "RO",
  RSD: "RS",
  RUB: "RU",
  RWF: "RW",
  SAR: "SA",
  SBD: "SB",
  SCR: "SC",
  SDG: "SD",
  SEK: "SE",
  SGD: "SG",
  SKK: "SK",
  SLL: "SL",
  SOS: "SO",
  SRD: "SR",
  STD: "ST",
  SVC: "SV",
  SYP: "SY",
  SZL: "SZ",
  THB: "TH",
  TJS: "TJ",
  TMT: "TM",
  TND: "TN",
  TOP: "TO",
  TRY: "TR",
  TTD: "TT",
  TWD: "TW",
  TZS: "TZ",
  UAH: "UA",
  UGX: "UG",
  USD: "US",
  UYU: "UY",
  UZS: "UZ",
  VEF: "VE",
  VND: "VN",
  VUV: "VU",
  YER: "YE",
  ZAR: "ZA",
  ZMK: "ZM",
  ZWD: "ZW",
};

const dropList = document.querySelectorAll("form select"),
  fromCurrency = document.querySelector(".from select"),
  toCurrency = document.querySelector(".to select"),
  formBtn = document.querySelector("form button"),
  exchangeIcon = document.querySelector("form .icon");

for (let i = 0; i < dropList.length; i++) {
  for (let currencyCode in country_list) {

    let selectedCountry =
      i === 0
        ? currencyCode === "USD"
          ? "selectedCurrency"
          : ""
        : currencyCode === "NPR"
        ? "selectedCurrency"
        : "";

    let optionTag = `<option value="${currencyCode}" ${selectedCountry}>${currencyCode}</option>`;
    dropList[i].insertAdjacentHTML("beforeend", optionTag);
  }
  dropList[i].addEventListener("change", (event) => {
    loadFlag(event.target);
  });
}

function loadFlag(currencyElement) {
  for (let codeCountry in country_list) {
    if (codeCountry === currencyElement.value) {
      let imgTag = currencyElement.parentElement.querySelector("img");
      imgTag.src = `https://flagcdn.com/48x36/${country_list[
        codeCountry
      ].toLowerCase()}.png`;
    }
  }
}

window.addEventListener("load", getExchangeRate);

formBtn.addEventListener("click", (event) => {
  event.preventDefault();
  getExchangeRate();
});

exchangeIcon.addEventListener("click", () => {
  let temporaryCountryCode = fromCurrency.value;
  fromCurrency.value = toCurrency.value;
  toCurrency.value = temporaryCountryCode;
  loadFlag(fromCurrency);
  loadFlag(toCurrency);
  getExchangeRate();
});

function getExchangeRate() {
  const amount = document.querySelector("form input");
  const exchangeRateText = document.querySelector(".exchange-rate");
  let amountValue = amount.value;
  if (amountValue === "" || amountValue === "0") {
    amount.value = "1";
    amountValue = 1;
  }
  exchangeRateText.innerHTML = `Получение данных с сервера...`;


  let url = `https://v6.exchangerate-api.com/v6/2242ccf23fb6ec06d11d6b2c/latest/${fromCurrency.value}`;
  fetch(url)
    .then((response) => response.json())
    .then((result) => {
    let exchangeRate = result.conversion_rates[toCurrency.value];
      let totalRate = (amountValue * exchangeRate).toFixed(2);
      exchangeRateText.innerText = `${amountValue} ${fromCurrency.value} = ${totalRate} ${toCurrency.value}`;
    })

    .catch(() => {
      exchangeRateText.innerText = `Что то пошло не так`;
    });
}

