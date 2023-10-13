// 'use strict';

/**
 * todo box-shadow: 0px 0px 14px rgba(0,0,0,0.2); on information div was good
 * todo if possible add infinite scrolling
 * todo fix font problem asap
 */

/**
 * * Variable's
 */
import '../css/style.css';
const countriesSec = document.getElementById("countries");
const url = "https://restcountries.com/v3.1/all";
const filterUl = document.querySelector('#filterUl');
const filterLi = document.querySelector('#filterUl li');
const regionContainer = filterUl.querySelector('#regionContainer');
const filterIcon = document.querySelector('#filterIcon');
const listOfRegions = document.querySelectorAll('#regionContainer li');
const searchInput = document.querySelector('#searchCountry');
const suggestions = document.querySelector('#suggestions');
const showResult = document.querySelector('#showResult');
const scrollToTopBtn = document.querySelector("#scroll-to-top-btn");
const { scrollAnimation } = require('./intersectionObserver');
const countryInformationTemplate = document.querySelector('#country-information-template');
let flags;


// so that user can search right away
searchInput.focus();
// generating some element from template so that skeleton effect can take place
for (let i = 0; i < 8; i++) {
    countriesSec.append(countryInformationTemplate.content.cloneNode(true));
}
// func to fetch data from the server
async function fetchData(url, cacheObject = { cache: "no-store" }) {
    // Validate the inputs
    const URL = typeof url === 'string' ? url : null;
    const cacheObj = typeof cacheObject === 'object' && cacheObject.hasOwnProperty('cache') ? cacheObject : null;

    if (URL && cacheObj) {
        const response = await fetch(URL, cacheObj);
        if (!response.ok) {
            throw new Error('Network response was not ok.');
        }
        const data = await response.json();

        return data;
    } else {
        throw new Error('Invalid URL or cache object provided.');
    }
}
// show all the information in the UI
function updateCountriesToUI(Countries) {
    // initial value
    let countriesHtml = '';
    // Build the HTML string for each country
    Countries.filter(Boolean).forEach((country) => {
        countriesHtml += `                        <div class="country-information rounded countries items-stretch lg:pt-0 lg:justify-between lg:overflow-hidden lg:flex-row flex-col dark:darkElementColor shadow-[0px_0px_14px_rgba(0,0,0,0.2)] shadow-grey-50 scale-1 hover:scale-110 transition-transform transform-gpu">
                    <div class="country-image">
                        <a href="../pages/country.html?name=${country?.name?.common}"><img data-src=${country?.flags?.png} alt=${country?.flags?.alt || country?.name?.common || 'Not Found'} class="lazyload hover:contrast-[1.5] opacity-0" /></a>
                    </div>
                    <div class="country-details flex-col pl-5 pb-10">
                        <h1 class="text-3xl my-6"><strong class="heading">${country?.name?.common || 'Not Found'}</strong></h1>
                        <div class="details gap-8 flex-col sm:flex-row lg:gap-40">
                            <div class="main-details">
                                <p><strong>Population: </strong><span class="text-dark-gray-700">${country?.population.toLocaleString("en-IN") || 'Not Found'} </span></p>
                                <p> <strong>Region: </strong><span class="text-dark-gray-700 region"> ${country?.region || 'Not Found'}</span></p>
                                <p><strong>Capital: </strong><span class="text-dark-gray-700">${country?.capital || 'Not Found'}</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>`;
    });

    countriesSec.innerHTML = countriesHtml;

    flags = document.querySelectorAll('.country-image img');
}
// call the func to fetch data from server update the UI
try {
    const data = await fetchData(url, { cache: 'force-cache' });
    updateCountriesToUI(data);
    loadingEffect();

} catch (err) {
    throw new Error("Something is wrong");
}



// small effect on image load
function loadingEffect() {
    // Apply the effect to the image once it has finished loading
    flags.forEach((flag) => {
        flag.addEventListener('load', () => {
            flag.classList.remove('opacity-0');
            flag.classList.add('opacity-100');
            flag.classList.add('transition-opacity', 'ease-in-out', 'delay-200');
        })
    })
}


// filter icon effect
filterUl.addEventListener('click', () => {
    // to hide/show
    regionContainer.classList.toggle('top-[-9999px]');
    // to rotate
    filterIcon.classList.toggle('rotate-180');
});

// region select
listOfRegions.forEach((region) => {
    region.addEventListener('click', (e) => {
        // removing the previous selected region
        listOfRegions.forEach((region) => {
            region.classList.remove("font-bold");
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
function autoSuggestions(match, Countries, selectedRegion) {
    // validate input 
    let matchedCountryName = typeof (match) === 'string' && match.length > 0 ? match : false;

    let allTheCountries = [...Countries];

    let matchLength = matchedCountryName.length;

    let suggestion = "";

    allTheCountries.forEach((country, index) => {

        // get the corresponding region name
        const region = document.querySelectorAll(".region")[index].textContent.trim().toLowerCase();
        const updatedRegion = region === 'americas' ? 'america' : region;
        // get all the country name
        const countryName = document.querySelectorAll(".heading")[index].textContent.toLowerCase()
        // if country name is given and region is not selected then do this
        if (matchedCountryName && selectedRegion === 'Not Selected') {
            if (countryName.startsWith(matchedCountryName)) {
                // get all the rest country name that were match
                let restMatchedCountryName = countryName.slice(matchLength);
                // generate suggestions 
                suggestion += `<li class="suggestion cursor-pointer"><p class="sugPara hover:dark:bg-slate-600 hover:bg-gray-300">${matchedCountryName}<b>${restMatchedCountryName}</b></p></li>`;
            }
        }
        // if country name is given and region is selected then do this
        if (matchedCountryName && selectedRegion !== 'Not Selected') {
            if (countryName.startsWith(matchedCountryName) && updatedRegion === selectedRegion) {
                // get all the rest country name that were match
                let restMatchedCountryName = countryName.slice(matchLength);
                // generate suggestions 
                suggestion += `<li class="suggestion cursor-pointer"><p class=
                "hover:dark:bg-slate-600 hover:bg-gray-300 sugPara">${matchedCountryName}<b>${restMatchedCountryName}</b></p></li>`;
            }
        }
    })

    suggestions.innerHTML = suggestion;


    getSuggestionValue(suggestions);
}

// get name from auto suggestion and search according to it
function getSuggestionValue(suggestions) {
    const allTheSuggestions = suggestions.querySelectorAll('.sugPara');

    allTheSuggestions.forEach((sug) => {
        sug.addEventListener('click', (e) => {
            console.log(e);
            const index = e.currentTarget.innerHTML.indexOf("<b>");
            // extracting the string before <b> tag
            const match = e.currentTarget.innerHTML.substring(0, index);
            // extracting the string after <b> (takes up 3 characters) tag
            // index + 3 is used because we want to get the text that comes after the <b> tag.
            const restMatchedCountryName = e.currentTarget.innerHTML.substring(index + 3, e.currentTarget.innerHTML.indexOf("</b>"));
            const fullCountryName = match + restMatchedCountryName;
            // setting the value in searchInput so that we can get the desire country information
            searchInput.value = fullCountryName.trim();
            search();
            // hide the suggestions
            suggestions.classList.add('hidden');
        })
    })
}

searchInput.addEventListener('input', () => {
    // adding delay 
    setTimeout(search, 500);
});


// search for the country with name and region
function search() {
    const allTheCountryDetails = document.querySelectorAll('.country-information .country-details');
    // validate the input
    const searchValue = searchInput.value ? searchInput.value.toLowerCase() : "";
    const selectedRegion = filterLi.textContent.trim() === 'Filter by Region' ? 'Not Selected' : filterLi.textContent.trim().toLowerCase();


    allTheCountryDetails.forEach((country, index) => {
        // get all the div with class 'country-information'
        const informationDiv = country.parentElement;
        // get the corresponding region name
        const region = document.querySelectorAll(".region")[index].textContent.trim().toLowerCase();
        const updatedRegion = region === "americas" ? "america" : region;
        // get the corresponding country names
        const countryName = document.querySelectorAll(".heading")[index].textContent.toLowerCase();

        // if country name is given and region is not selected then do this
        if (searchValue && selectedRegion === 'Not Selected') {
            if (countryName.startsWith(searchValue)) {
                // if previously hidden country has a match then show 
                informationDiv.classList.remove('hidden');
                // show all the suggestions
                suggestions.classList.remove('hidden');
                // it will suggest completed country name
                autoSuggestions(searchValue, allTheCountryDetails, selectedRegion);
            } else {
                // otherwise hide it
                informationDiv.classList.add('hidden');
                // if no match found
                const allTheInformationDiv = document.querySelectorAll('.country-information');

                const arrayOfInformationDiv = [...allTheInformationDiv]

                // check if every informatinDiv has hidden class
                const result = arrayOfInformationDiv.every((div) => {
                    if (div.classList.contains('hidden')) {
                        return true;
                    }
                });

                if (result) {
                    showResult.innerHTML = `<p class="font-bold text-3xl">There is no such country start with the name: " ${searchValue}" </p>`;
                } else {
                    showResult.innerHTML = "";
                }
            }
        }

        // if country name is given and region is also given then do this
        if (searchValue && selectedRegion !== 'Not Selected') {
            // console.log(updatedRegion, selectedRegion);
            if (countryName.startsWith(searchValue) && updatedRegion === selectedRegion) {
                // if previously hidden country has a match then show 
                informationDiv.classList.remove('hidden');
                // show all the suggestions
                suggestions.classList.remove('hidden');
                // it will suggest completed country name
                autoSuggestions(searchValue, allTheCountryDetails, selectedRegion);
            } else {
                // otherwise hide it
                informationDiv.classList.add('hidden');
                // if no match found
                const allTheInformationDiv = document.querySelectorAll('.country-information');

                const arrayOfInformationDiv = [...allTheInformationDiv]

                // check if every informationDiv has hidden class
                const result = arrayOfInformationDiv.every((div) => {
                    if (div.classList.contains('hidden')) {
                        return true;
                    }
                });

                if (result) {
                    showResult.innerHTML = `<p class="font-bold text-3xl">There is no such country start with the name: " ${searchValue} " in ${selectedRegion}</p>`;
                } else {
                    showResult.innerHTML = "";
                }
            }
        }

        // if only region is given then do this
        if (searchValue === "" && selectedRegion !== 'Not Selected') {
            // console.log(updatedRegion, selectedRegion);
            // as there is no searchValue so showResult should be hidden
            showResult.innerHTML = "";
            // hide all the suggestions
            suggestions.classList.add('hidden');
            // console.log(`Thriple yes`);
            if (updatedRegion === selectedRegion) {
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
    const suggestionLength = suggestions.children.length;
    // if there is no suggestions to show then hide it and if there is suggestion's then show
    if (suggestionLength === 0) {
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

// scroll to top btn logic
window.onscroll = function () {
    // handle scroll btn 
    // When the user scrolls down 20px from the top of the document, show the button else hide it
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        scrollToTopBtn.classList.remove('hidden');
    } else {
        scrollToTopBtn.classList.add('hidden');
    }
};

// When the user clicks on the button, scroll to the top of the document
scrollToTopBtn.onclick = function () {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
};

// animation 
const countries = document.querySelectorAll('.country-information');
scrollAnimation(countries, {
    threshold: 0.7,
});
