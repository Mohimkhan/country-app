// variables
import '../css/style.css';
const searchParams = new URLSearchParams(window.location.search);
const countryName = searchParams.get('name');
const countriesDiv = document.querySelector("#countries");

// Function to fetch specific data from the server based on entries and type
const getDataByEntriesAndType = ({ entries, type }) => {
  // Create an object to store keys of different types
  const obj = {
    currencieKeys: [], // Array to store currency keys
    languageKeys: []  // Array to store language keys
  };

  switch (type) {
    case "currencie":
      // Loop through each key in entries
      for (const key in entries) {
        // Add currency keys to the currencieKeys array
        obj.currencieKeys.push(key);
      }

      // Remove duplicate currency keys from the array
      const uniqueCurrencieKeys = [...new Set(obj.currencieKeys)];

      // Filter out invalid keys and map the valid ones to HTML spans
      return uniqueCurrencieKeys
        .filter(Boolean)
        .map((currencyKey) => {
          if (entries.hasOwnProperty(currencyKey)) {
            // Return HTML span with currency name
            return `<span class="text-dark-gray-700">${entries[currencyKey].name + ", "}</span>`;
          }
        })
        .join('') || 'Not found';

    case "language":
      // Loop through each key in entries
      for (const key in entries) {
        // Add language keys to the languageKeys array
        obj.languageKeys.push(key);
      }

      // Remove duplicate language keys from the array
      const uniqueLanguageKeys = [...new Set(obj.languageKeys)];

      // Filter out invalid keys and map the valid ones to HTML spans
      return uniqueLanguageKeys
        .filter(Boolean)
        .map((languageKey) => {
          if (entries.hasOwnProperty(languageKey)) {
            // Return HTML span with language name
            return `<span class="text-dark-gray-700">${entries[languageKey] + ", "}</span>`;
          }
        })
        .join('') || `<span class="text-dark-gray-700">Not Found</span>`;

    default:
      return entries;
  }
};

// fetching data of countries 
const fetchData = async () => {
  const res = await fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`).catch((err) => err);

  if (res.ok && res.status === 200) {
    const data = await res.json();
    const countryData = data[0];

    // html template
    let htmlData = `
        <div class="country-information rounded fullscreen z-50 px-10 flex lg:items-center pt-[12rem] items-stretch lg:pt-0 lg:justify-between lg:overflow-hidden lg:flex-row flex-col dark:darkElementColor shadow-[0px_0px_14px_rgba(0,0,0,0.2)] shadow-grey-50 overflow-y-scroll scroll-smooth">
        <a href="../index.html"  type="button"
        class="backBtn top-28 absolute px-8 py-2 bg-white-700 shadow-sm shadow-dark-gray-700 rounded-lg  dark:darkElementColor"
            ><i class="fa-solid fa-arrow-left-long"></i>Back</a>
            <div class="country-image flex lg:basis-1/2">
            <img data-src=${countryData?.flags?.png || countryData?.flags?.svg} alt=${countryData?.flags?.alt || countryData?.name?.common} class="lazyload hover:contrast-[1.5] scale-1 hover:scale-110 transition-transform transform-gpu">
            </div>
            <div class="country-details flex-col flex lg:basis-1/2">
            <h1 class="text-3xl my-6"><strong class="heading"></strong></h1>
            <div class="details gap-8 flex-col sm:flex-row lg:gap-40 flex justify-between items-baseline">
            <div class="main-details">
            <p ><strong>Native Name: </strong><span
            class="text-dark-gray-700">${countryData?.name?.common || "Not Found"}</span></p>
            <p><strong>Population: </strong><span class="text-dark-gray-700">${countryData?.population?.toLocaleString("en-IN") || "Not Found"}</span></p>
            <p> <strong class="region">Region: </strong><span class="text-dark-gray-700">${countryData?.region || "Not Found"}</span></p>
            <p > <strong>Sub Region: </strong><span
            class="text-dark-gray-700">${countryData?.subregion || "Not Found"}</span></p>
            <p>
            <strong>Capital: </strong><span class="text-dark-gray-700">${countryData?.capital || "Not Found"}</span>
            </p>
            </div>
            <div class="additional-details" >
            <p><strong>Top Level Domain: </strong>
            ${countryData?.tld !== undefined ? countryData?.tld.map((topLevelDomain) => {
      return `<span class="text-dark-gray-700">${topLevelDomain}</span>`
    }).join("") : `<span class="text-dark-gray-700">Not Found</span>`}</p>
            <p><strong>Currencies: </strong>
            ${countryData?.currencies !== undefined ? getDataByEntriesAndType({ entries: countryData?.currencies, type: 'currencie' }) : "Not Found"}</p>
            <p><strong>Languages: </strong>
            ${countryData?.languages !== undefined ? getDataByEntriesAndType({ entries: countryData?.languages, type: 'language' }) : "Not Found"}</p>
            </div>
            </div>
            <p class="mt-10 BorderCountry flex items-center justify-start flex-wrap gap-2 pb-12 lg:pb-0"
                >
                <strong>Border Countries:</strong>
                ${countryData?.borders !== undefined ? countryData?.borders.map((bor) => {
      return `<span class="text-dark-gray-700 px-8 py-2 bg-white-700 shadow-sm shadow-dark-gray-700 rounded-md  dark:darkElementColor">${bor}</span>`;
    }).join("") : `<span class="text-dark-gray-700 px-8 py-2 bg-white-700 shadow-sm shadow-dark-gray-700 rounded-md  dark:darkElementColor"> Not Found</span>`}
    
    </p>
    </div>
    </div>
    `;

    countriesDiv.innerHTML = htmlData;

  } else {
    // html template
    let htmlData = `<p class="error">There is something wrong in server side</p>`;

    countriesDiv.innerHTML = htmlData;
  }

}

fetchData();