'use strict';

/**
 * todo optimize the functions (will be done last)
 * todo make the pop up extra-information more simple (remove complex access of children and adding or removing of tailwind class's) (will be done last)
 * todo box-shadow: 0px 0px 14px rgba(0,0,0,0.2); on information div was good
 * todo make animation of extra-information
 * todo optimize the code and structure it 
 */

/**
 * * dependencies's
 */
import { allTheCurrencies } from "../Currencies";
import { languages } from "../Languages";
/**
 * * Variable's
 */
const countriesSec = document.getElementById("countries");
const url = "https://restcountries.com/v3.1/all";
// const backBtn = document.querySelectorAll(".backBtn");
const extraDetails = document.querySelectorAll('[data-detail="more"]');
const information = document.querySelectorAll(".country-information");
const details = document.querySelector(".details");
const countryDetails = document.querySelector(".country-details");
const ImageContainer = document.querySelector(".country-image");
const filterUl = document.querySelector('#filterUl');
const filterLi = document.querySelector('#filterUl li');
const secondUl = filterUl.querySelector('ul');
const filterIcon = document.querySelector('#filterIcon');
const darkAndLightBtn = document.querySelector("#ColorSwitchBtn");
const elementsWithDarkMode = document.querySelectorAll("[data-mode]");
const regions = document.querySelectorAll('.regions li');
const searchInput = document.querySelector('#searchCountry');
const suggestions = document.querySelector('#suggestions');
const container = document.querySelector('.container');
const showResult = document.querySelector('#showResult');
const scrollToTopBtn = document.querySelector("#scroll-to-top-btn");


// const flags = document.querySelectorAll('.country-image img');
/**
 * country.flags.png flag
 * country.name.common name
 * country.name second name
 * country.population population
 * country.region region
 * country.subregion subregion
 * country.capital capital
 */

//  currencies	Object { BGN: {…} }
//  BGN	Object { name: "Bulgarian lev", symbol: "лв" }
//  name	"Bulgarian lev"
//  symbol	"лв"

// languages	Object { bul: "Bulgarian" }
// bul	"Bulgarian"
// fetching data (countries information) from the server 
// async function getCountries() {
//     // if (cache.hasOwnProperty('data')) {
//     //     console.log(`true`);
//     //     showCountrys(cache['data']);
//     // } else {
//     //     console.log(`false`);
//     // }
//     const fetchData = await fetch(url, { cache: "force-cache" });
//     const Countries = await fetchData.json();

//     return Countries;
// }

// so that user can search right away
searchInput.focus();

async function fetchData(url, cacheObject = { cache: "no-store" }) {
    // validate the inputs
    let URL = typeof (url) === 'string' ? url : false;
    let cacheObj = typeof (cacheObject) === 'object' && cacheObject.hasOwnProperty('cache') ? cacheObject : false;

    if (URL && cacheObj) {
        const response = await fetch(URL, cacheObj).catch((e) => console.log(e));
        const data = await response.json().catch((e) => console.log(e));

        if (response.ok) {
            return data
        } else {
            console.log(`The server is down for some reason`);
        }

    }
}

// fetching data (countries information) from the server 
const data = await fetchData(url, { cache: 'no-cache' });

// languages.filter(Boolean).map((lang) => {
//     if (country?.languages?.hasOwnProperty(lang)) {
//         return `<span class="text-dark-gray-700">${country?.languages?.[lang] + " , "}</span>`
//     }
// }).join('') || `<span class="text-dark-gray-700">Not Found</span>`

// to fetch correct data from server according to entries given
const getData = ({ entries, type }) => {
    // store each arrOfKey in an obj
    const obj = {
        currencieKeys: [],
        languageKeys: []
    }

    switch (type) {
        case "currencie":
            for (const k in entries) {
                // to make an array of keys 
                obj.currencieKeys.push(k);
            }

            // removing duplicate key from array
            const newArrOfCurrencieKeys = [...new Set(obj.currencieKeys)];

            return newArrOfCurrencieKeys.filter(Boolean).map((currencieKey) => {
                if (entries.hasOwnProperty(currencieKey)) {
                    // console.log(entries[currencieKey].name);
                    return `<span class="text-dark-gray-700">${entries[currencieKey].name + " , "}</span>`
                }
            }).join('') || 'Not found';
        case "language":
            for (const k in entries) {
                // to make an array of keys
                obj.languageKeys.push(k);
            }

            // removing duplicate key from array
            const newArrOfLanguageKeys = [...new Set(obj.languageKeys)];

            return newArrOfLanguageKeys.filter(Boolean).map((languageKey) => {
                if (entries.hasOwnProperty(languageKey)) {
                    return `<span class="text-dark-gray-700">${entries[languageKey] + " , "}</span>`
                }
            }).join('') || `<span class="text-dark-gray-700">Not Found</span>`
        default:
            return entries;
    }
}
// show all the information in the UI
function showCountries(Countries) {
    // initial value
    let str = '';
    Countries.filter(Boolean).forEach((country) => {
        str += `                        <div data-mode-element="true" class="country-information rounded countries items-stretch lg:pt-0 lg:justify-between lg:overflow-hidden lg:flex-row flex-col dark:darkElementColor shadow-[0px_0px_14px_rgba(0,0,0,0.2)] shadow-grey-50">
                    <button data-mode-element="true" type="button"
                        class="hidden backBtn top-28 px-8 py-2 bg-white-700 shadow-sm shadow-dark-gray-700 rounded-lg  dark:darkElementColor"
                        data-detail="more"><i class="fa-solid fa-arrow-left-long"></i>Back</button>
                    <div class="country-image">
                        <img data-src=${country?.flags?.png} alt=${country?.flags?.alt || country?.name?.common || 'Not Found'} class="lazyload hover:blur-[1px] hover:contrast-[1.5] opacity-0">
                    </div>
                    <div class="country-details flex-col pl-5 pb-10">
                        <h1 class="text-3xl my-6"><strong class="heading">${country?.name?.common || 'Not Found'}</strong></h1>
                        <div class="details gap-8 flex-col sm:flex-row lg:gap-40">
                            <div class="main-details">
                                <p class="hidden" data-detail="more"><strong>Native Name: </strong><span
                                        class="text-dark-gray-700">${country?.name?.common || 'Not Found'}</span></p>
                                <p><strong>Population: </strong><span class="text-dark-gray-700">${country?.population || 'Not Found'} </span></p>
                                <p> <strong class="region">Region: </strong><span class="text-dark-gray-700"> ${country?.region || 'Not Found'}</span></p>
                                <p class="hidden" data-detail="more"> <strong>Sub Region:</strong><span
                                        class="text-dark-gray-700"> ${country?.subregion || 'Not Found'}</span></p>
                                <p>
                                    <strong>Capital: </strong><span class="text-dark-gray-700">${country?.capital || 'Not Found'}</span>
                                </p>
                            </div>
                            <div class="additional-details hidden" data-detail="more">
                                <p><strong>Top Level Domain:</strong><span class="text-dark-gray-700">.be</span></p>
                                <p><strong>Currencies:</strong> ${country?.currencies !== undefined && getData({ entries: country?.currencies, type: 'currencie' })}</p>
                                <p><strong>Languages:</strong>
                                ${country?.languages !== undefined && getData({ entries: country?.languages, type: 'language' })}
                                </p>
                            </div>
                        </div>
                        <p class="mt-10 hidden BorderCountry flex items-center flex-wrap gap-2 pb-12 lg:pb-0" data-detail="more">
                            <strong>Border Countries:</strong> ${country?.borders !== undefined ? country?.borders.map((bor) => {
            // console.log(bor);
            return `<span data-mode-element="true"
                                    class="text-dark-gray-700 px-8 py-2 bg-white-700 shadow-sm shadow-dark-gray-700 rounded-md  dark:darkElementColor">${bor}
                                    </span>`;
        }).join("") : `<span data-mode-element="true"
                          class="text-dark-gray-700 px-8 py-2 bg-white-700 shadow-sm shadow-dark-gray-700 rounded-md  dark:darkElementColor"> Not Found
                          </span>`
            }
                        </p>
                    </div>
                </div>`;
    });
    countriesSec.innerHTML = str;
}
// call the func
showCountries(data);
// all the style's
function AddOrRemoveStyles() {
    // countriesSec.classList.remove('countries');
    // countriesSec.classList.add('fullscreen');
    // backBtn.classList.add('backBtn');
    // information.classList.add('flex', 'justify-between', 'gap[50px]');
    // details.classList.add('flex', 'justify-between', 'items-baseline', 'gap[160px]');
    // flag.classList.add('basis-1/2');
    // countryDetails.classList.add('basis-1/2');
    countriesSec.classList.toggle('countries');
    countriesSec.classList.toggle('fullscreen');
    backBtn.classList.toggle('backBtn');
    information.classList.toggle('flex', 'justify-between', 'gap[50px]');
    details.classList.toggle('flex', 'justify-between', 'items-baseline', 'gap[160px]');
    flag.classList.toggle('basis-1/2');
    countryDetails.classList.toggle('basis-1/2');
}

// if user click on flags it will show pop up with extra information about countries
const countriesFlags = document.querySelectorAll('.country-image img');
countriesFlags.forEach((flag) => {
    flag.addEventListener('click', (e) => {
        // countries section
        // const countrySec = e.target.parentElement.parentElement.parentElement;

        // disable scrollToTopBtn
        scrollToTopBtn.classList.add('hidden');
        // country-information section
        const information = e.target.parentElement.parentElement;
        // console.log(information);
        const backBtn = information.querySelector('.backBtn');
        // country-image section
        const ImageContainer = information.children[1];
        // country-details
        const countryDetails = information.children[2];
        // details 
        const details = countryDetails.children[1];
        const extraDetails = information.querySelectorAll('[data-detail="more"]');
        // prevent scrolling in body
        document.body.classList.add('overflow-y-hidden');
        information.classList.remove('countries');
        // countrySec.classList.add('fullscreen', 'z-50', 'justify-center');
        information.classList.add('fullscreen', 'z-50', 'px-10');
        backBtn.classList.add('top-28', 'absolute');
        information.classList.add('flex', 'lg:items-center', 'pt-[12rem]', 'overflow-scroll');
        details.classList.add('flex', 'justify-between', 'items-baseline');
        ImageContainer.classList.add('flex', 'lg:basis-1/2');
        countryDetails.classList.add('flex', 'lg:basis-1/2');
        countryDetails.classList.remove('pl-5', 'pb-10', 'shadow-lg', 'shadow-grey-50');
        extraDetails.forEach((ele) => {
            ele.classList.toggle('hidden');
        })
    });

    // to add animation on load
    flag.addEventListener('load', () => {
        // Apply the animation to the image once it has finished loading
        flag.classList.add('opacity-[1]');
        flag.classList.add('transition-opacity', 'ease-in-out', 'delay-200');
    })
})

// to close the pop up with extra information
const backBtns = document.querySelectorAll('.backBtn');
backBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        // console.log(`It has been clicked`);
        // const countrySec = e.parentElement.parentElement;
        // disable scrollToTopBtn
        scrollToTopBtn.classList.remove('hidden');
        // country-information section
        const information = e.currentTarget.parentElement;
        // console.log(information);
        const backBtn = information.querySelector('.backBtn');
        // country-image section
        const ImageContainer = information.children[1];
        // country-details
        const countryDetails = information.children[2];
        // details 
        const details = countryDetails.children[1];
        const extraDetails = information.querySelectorAll('[data-detail="more"]');
        // let scrolling in body
        document.body.classList.remove('overflow-y-hidden');
        information.classList.add('countries');
        // countrySec.classList.remove('fullscreen', 'justify-center');
        information.classList.remove('fullscreen', 'px-10');
        backBtn.classList.remove('top-28', 'absolute');
        information.classList.remove('flex', 'lg:items-center', 'pt-[12rem]', 'overflow-scroll');
        details.classList.remove('flex', 'justify-between', 'items-baseline');
        ImageContainer.classList.remove('flex', 'lg:basis-1/2');
        countryDetails.classList.remove('flex', 'lg:basis-1/2');
        countryDetails.classList.add('pl-5', 'pb-10', 'shadow-lg', 'shadow-grey-50');
        extraDetails.forEach((ele) => {
            ele.classList.toggle('hidden');
        })
    })
})

// filter icon animation
filterUl.addEventListener('click', () => {
    // to hide/show
    secondUl.classList.toggle('top-[-9999px]');
    // to rotate
    filterIcon.classList.toggle('rotate-180');
});

// region select
regions.forEach((region) => {
    region.addEventListener('click', (e) => {
        // removing the previous selected region
        regions.forEach((element) => {
            element.classList.remove("font-bold");
        })
        // to show the region
        const text = e.target.innerText === 'Unselect' ? 'Filter by Region' : e.target.innerText;

        filterLi.innerHTML = text + `<i class="fa-solid fa-angle-down transition-all rotate-180"
        id="filterIcon"></i>`;
        // the targeted region
        e.target.classList.add("font-bold");
        // search country according to selected region
        search();
    })
});

// auto suggestion country names
function autoSuggestion(matchStr, Countries, selectedRegion) {
    // validate input 
    let matchedCountryName = typeof (matchStr) === 'string' && matchStr.length > 0 ? matchStr : false;

    let allTheCountries = Countries;

    let matchLength = matchedCountryName.length;

    let suggestion = "";

    allTheCountries.forEach((country) => {
        const informationDiv = country.parentElement;

        // get all the regions 
        const regionsNames = country.children[1].children[0].children[2].children[0].nextElementSibling.textContent.trim().toLowerCase();
        const countryRegions = regionsNames === 'americas' ? 'america' : regionsNames;
        // get all the country names
        const countryNames = country.children[0].children[0].textContent.toLowerCase();
        // if country name is given and region is not selected then do this
        if (matchedCountryName && selectedRegion === 'Not Selected') {
            if (countryNames.startsWith(matchedCountryName)) {
                // get all the rest country name that were match
                let restCountryNames = countryNames.slice(matchLength);
                // generate suggestions 
                suggestion += `<li class="suggestion cursor-pointer"><p class="str">${matchedCountryName}<b>${restCountryNames}</b></p></li>`;
            }
        }
        // if country name is given and region is selected then do this
        if (matchedCountryName && selectedRegion !== 'Not Selected') {
            if (countryNames.startsWith(matchedCountryName) && countryRegions === selectedRegion) {
                // console.log(`This is a ${matchedCountryName} ${selectedRegion}`);
                // console.log(countryNames, selectedRegion, countryRegions);
                // get all the rest country name that were match
                let restCountryNames = countryNames.slice(matchLength);
                // generate suggestions 
                suggestion += `<li class="suggestion cursor-pointer"><p class="str">${matchedCountryName}<b>${restCountryNames}</b></p></li>`;
            }
        }

        // if (matchedCountryName && selectedRegion !== 'Not Selected') {
        //     if (countryNames.startsWith(matchedCountryName) && countryRegions !== selectedRegion) {
        //         console.log(`This is a ${countryNames} ${countryRegions} ${selectedRegion}`);
        //         // console.log(countryNames, selectedRegion, countryRegions);
        //         // get all the rest country name that were match
        //         // let restCountryNames = countryNames.slice(matchLength);
        //         // generate suggestions 
        //         suggestion = "";
        //     }



        // }
    })

    suggestions.innerHTML = suggestion;


    getSuggestionValue(suggestions);
}


searchInput.addEventListener('input', search);

// search for the country with name and region
function search() {
    const allTheCountries = document.querySelectorAll('.country-information .country-details');
    // validate the input
    const searchValue = searchInput.value ? searchInput.value.toLowerCase() : "";
    const selectedRegion = filterLi.textContent.trim() === 'Filter by Region' ? 'Not Selected' : filterLi.textContent.trim().toLowerCase();


    allTheCountries.forEach((country) => {
        // const arrayOfInformationDiv = document.querySelectorAll('country-information');
        // get all the div with class 'country-information'
        const informationDiv = country.parentElement;
        // get all the regions 
        const regionsNames = country.children[1].children[0].children[2].children[0].nextElementSibling.textContent.trim().toLowerCase();
        const countryRegions = regionsNames === "americas" ? "america" : regionsNames;


        // console.log(countryRegions);
        // get all the country names
        const countryNames = country.children[0].children[0].textContent.toLowerCase();

        // if country name is given and region is not selected then do this
        if (searchValue && selectedRegion === 'Not Selected') {
            if (countryNames.startsWith(searchValue)) {
                // console.log(`Nice`);
                // if previously hidden country has a match then show 
                informationDiv.classList.remove('hidden');
                // show all the suggestions
                suggestions.classList.remove('hidden');
                // it will suggest completed country name
                autoSuggestion(searchValue, allTheCountries, selectedRegion);
                // console.log(`Good`);
                // console.log(countryNames);
            } else {
                // otherwise hide it
                informationDiv.classList.add('hidden');

                const allTheInformationDiv = document.querySelectorAll('.country-information');

                const arrayOfInformationDiv = [...allTheInformationDiv]

                const result = arrayOfInformationDiv.every((div) => {
                    if (div.classList.contains('hidden')) {
                        return true;
                    }
                });

                if (result) {
                    showResult.innerHTML = `<p class="font-bold text-3xl">There is no such country available with the name: ${searchValue} </p>`;
                    console.log(`YEs it's working`);
                } else {
                    showResult.innerHTML = "";
                }
            }
        }

        // if country name is given and region is also given then do this
        if (searchValue && selectedRegion !== 'Not Selected') {
            // console.log(countryRegions, selectedRegion);
            if (countryNames.startsWith(searchValue) && countryRegions === selectedRegion) {
                // if previously hidden country has a match then show 
                // console.log(`Here`);
                informationDiv.classList.remove('hidden');
                // show all the suggestions
                suggestions.classList.remove('hidden');
                // it will suggest completed country name
                autoSuggestion(searchValue, allTheCountries, selectedRegion);
                // console.log(`Double good`);
            } else {
                // otherwise hide it
                informationDiv.classList.add('hidden');
                const allTheInformationDiv = document.querySelectorAll('.country-information');

                const arrayOfInformationDiv = [...allTheInformationDiv]

                const result = arrayOfInformationDiv.every((div) => {
                    if (div.classList.contains('hidden')) {
                        return true;
                    }
                });

                if (result) {
                    showResult.innerHTML = `<p class="font-bold text-3xl">There is no such country available with the name: ${searchValue} in ${selectedRegion}</p>`;
                } else {
                    showResult.innerHTML = "";
                }
            }
        }

        // if only region is given then do this
        if (searchValue === "" && selectedRegion !== 'Not Selected') {
            // console.log(countryRegions, selectedRegion);
            // as there is no searchValue so showResult should be hidded
            showResult.innerHTML = "";
            // hide all the suggestions
            suggestions.classList.add('hidden');
            // console.log(`Thriple yes`);
            if (countryRegions === selectedRegion) {
                // if previously hidden country has a match then show 
                informationDiv.classList.remove('hidden');
            } else {
                // otherwise hide it
                informationDiv.classList.add('hidden');
            }
        }

        // if country name and region is not given then do this
        if (searchValue === "" && selectedRegion === 'Not Selected') {
            // hide all the suggestions
            suggestions.classList.add('hidden');
            // as there is no searchValue so showResult should be hidded
            showResult.innerHTML = "";
            // show all the hidden countries (no match)
            informationDiv.classList.remove('hidden');
        }
    })

}

// show  or hide auto suggestion on focus
searchInput.addEventListener('focus', () => {
    const suggestionLenght = suggestions.children.length;
    // if there is no suggestions to show then hide it and if there is suggestion's then show
    if (suggestionLenght === 0) {
        suggestions.classList.add('hidden');
    } else {
        suggestions.classList.remove('hidden');
    }
})

// hide auto suggestion when lost focus
searchInput.addEventListener('blur', () => {
    // Delay the execution of the blur event to allow click events to be processed first
    setTimeout(() => {
        // checking if it's showing
        if (!suggestions.classList.contains('hidden')) {
            // if it's showing then hide it
            suggestions.classList.add('hidden');
        }
    }, 150);
})

// get name from auto suggestion and search according to it
function getSuggestionValue(suggestions) {
    const allTheSuggestions = suggestions.querySelectorAll('.str');

    allTheSuggestions.forEach((sug) => {
        sug.addEventListener('click', (e) => {
            const index = e.currentTarget.innerHTML.indexOf("<b>");
            // extracting the string before <b> tag
            const match = e.currentTarget.innerHTML.substring(0, index);
            // extracting the string after <b> (takes up 3 characters) tag
            // index + 3 is used because we want to get the text that comes after the <b> tag.
            const restCountryName = e.currentTarget.innerHTML.substring(index + 3, e.currentTarget.innerHTML.indexOf("</b>"));
            const fullCountryName = match + restCountryName;
            // setting the value in searchInput so that we can get the desire country information
            searchInput.value = fullCountryName.trim();
            search();
            // hide the suggestions
            suggestions.classList.add('hidden');
        })
    })
}


// scroll to top btn logic
window.onscroll = function () {
    const informationElements = document.querySelectorAll(".country-information");
    // an array of country-information element's
    const informationArray = [...informationElements];

    // check any of the country-information element has fullscreen classs 
    const hasFullScreenClass = informationArray.find((infoElement) => {
        if (infoElement.classList.contains("fullscreen")) {
            return true;
        }
    })

    if (hasFullScreenClass) {
        // when country-information element is fullscreen it doesn't need scroll btn
        scrollToTopBtn.classList.add('hidden');
    } else {
        // handle scroll btn 
        // When the user scrolls down 20px from the top of the document, show the button else hide it
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            scrollToTopBtn.classList.remove('hidden');
        } else {
            scrollToTopBtn.classList.add('hidden');
        }
    }
};

// if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
//     // if it is fullscreen it doesn't need scroll btn
//     if (infoElement.classList.contains("fullscreen")) {
//         console.log(infoElement.classList.contains("fullscreen"));
//         scrollToTopBtn.classList.add('hidden')
//     } else {
//         scrollToTopBtn.classList.remove('hidden');
//     }

// } else {
//     scrollToTopBtn.classList.add('hidden');
// }
// When the user clicks on the button, scroll to the top of the document
scrollToTopBtn.onclick = function () {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
};


