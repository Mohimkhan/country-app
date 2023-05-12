const differentCurrrencies = [
    "ISK",
    "JPY",
    "XPF",
    "SOS",
    "CLP",
    "LSL",
    "NZD",
    "LBP",
    "ZAR",
    "NOK",
    "GBP",
    "USD",
    "EUR",
    "WST",
    "JOD",
    "ERN",
    "NPR",
    "NOK",
    "TOP",
    "XOF",
    "EGP",
    "ILS",
    "CNY",
    "MYR",
    "TRY",
    "XPF",
    "ETB",
    "PYG",
    "CZK",
    "IRR",
    "GHS",
    "SEK",
    "GYD",
    "BND",
    "SGD",
    "SDG",
    "VES",
    "SZL",
    "ZAR",
    "EGP",
    "ILS",
    "JOD",
    "IMP",
    "STN",
    "BWP",
    "MUR",
    "AUD",
    "DJF",
    "BAM",
    "IDR",
    "TVD",
    "GNF",
    "CHF",
    "XCD",
    "JMD",
    "LKR",
    "RSD",
    "KHR",
    "GBP",
    "KYD",
    "MWK",
    "COP",
    "TOP",
    "QAR",
    "SHP",
    "KGS",
    "ZAR",
    "SLL",
    "WST",
    "MXN",
    "KWD",
    "NAD",
    "LAK",
    "IMP",
    "RON",
    "MDL",
    "TMT",
    "CVE",
    "TWD",
    "XAF",
    "PGK",
    "KES",
    "MRU",
    "XOF",
    "BTN",
    "GEL",
    "ALL",
    "BHD",
    "UZS",
    "SBD",
    "MNT",
    "ANG",
    "MRU",
    "AZN",
    "AFN",
    "UGX",
    "KPW",
    "GTQ",
    "CAD",
    "PLN",
    "FOK",
    "DKK",
    "BOB",
    "BIF",
    "CUP",
    "CUC",
    "XCD",
    "VUV",
    "TND",
    "BRL",
    "SRD",
    "BDT",
    "AWG",
    "YER",
    "XOF",
    "MMK",
    "INR",
    "ERN",
    "BBD",
    "ARS",
    "NZD",
    "CKD",
    "LRD",
    "XAF",
    "MKD",
    "ZWL",
    "NGN",
    "AUD",
    "CDF",
    "VND",
    "EGP",
    "IQD",
    "SHP",
    "PEN",
    "XOF",
    "XCD",
    "HNL",
    "FJD",
    "AUD",
    "SYP",
    "DZD",
    "MAD",
    "XCD",
    "SGD",
    "KZT",
    "AMD",
    "SCR",
    "KZT",
    "AWG",
    "NGN",
    "KMF",
    "PHP",
    "SAR",
    "MGA",
    "KID",
    "AUD",
    "BZD",
    "GIP",
    "XOF",
    "GGP",
    "GBP",
    "TTD",
    "NZD",
    "XCD",
    "FKP",
    "XPF",
    "HUF",
    "INR",
    "KMF",
    "JEP",
    "NPR",
    "XAF",
    "AOA",
    "RUB",
    "OMR",
    "GMD",
    "SSP",
    "DKK",
    "BGN",
    "PAB",
    "ILS",
    "DOP",
    "MZN",
    "MOP",
    "UAH",
    "BMD",
    "HKD",
    "TZS",
    "MAD",
    "THB",
    "CRC",
    "LYD",
    "MRU",
    "DZD",
    "HTG",
    "AED",
    "BSD",
    "SHP"
];
// removing the duplicate items from differentCurrrencies array
export const allTheCurrencies = [...new Set(differentCurrrencies)];



// const shouldDuplicate = [
//     {
//         "SAR": {
//             "name": "Saudi riyal",
//             "symbol": "ر.س"
//         }
//     },
//     {
//         "BSD": {
//             "name": "Bahamian dollar",
//             "symbol": "$"
//         },
//     },
//     {
//         "AED": {
//             "name": "United Arab Emirates dirham",
//             "symbol": "د.إ"
//         }
//     },
//     {
//         "HTG": {
//             "name": "Haitian gourde",
//             "symbol": "G"
//         }
//     },
//     {
//         "DZD": {
//             "name": "Algerian dinar",
//             "symbol": "دج"
//         },
//         "MAD": {
//             "name": "Moroccan dirham",
//             "symbol": "DH"
//         },
//         "MRU": {
//             "name": "Mauritanian ouguiya",
//             "symbol": "UM"
//         }
//     },
//     {
//         "LYD": {
//             "name": "Libyan dinar",
//             "symbol": "ل.د"
//         }
//     },
//     {
//         "XAF": {
//             "name": "Central African CFA franc",
//             "symbol": "Fr"
//         }
//     },
//     {
//         "CRC": {
//             "name": "Costa Rican colón",
//             "symbol": "₡"
//         }
//     },
//     {
//         "THB": {
//             "name": "Thai baht",
//             "symbol": "฿"
//         }
//     },
//     {
//         "DKK": {
//             "name": "krone",
//             "symbol": "kr."
//         }
//     },
//     {
//         "MAD": {
//             "name": "Moroccan dirham",
//             "symbol": "د.م."
//         }
//     },
//     {
//         "TZS": {
//             "name": "Tanzanian shilling",
//             "symbol": "Sh"
//         }
//     },
//     {
//         "XCD": {
//             "name": "Eastern Caribbean dollar",
//             "symbol": "$"
//         }
//     },
//     {
//         "HKD": {
//             "name": "Hong Kong dollar",
//             "symbol": "$"
//         }
//     },
//     {
//         "BMD": {
//             "name": "Bermudian dollar",
//             "symbol": "$"
//         }
//     },
//     {
//         "UAH": {
//             "name": "Ukrainian hryvnia",
//             "symbol": "₴"
//         }
//     },
//     {
//         "MOP": {
//             "name": "Macanese pataca",
//             "symbol": "P"
//         }
//     },
//     {
//         "MZN": {
//             "name": "Mozambican metical",
//             "symbol": "MT"
//         }
//     },
//     {
//         "DOP": {
//             "name": "Dominican peso",
//             "symbol": "$"
//         }
//     },
//     {
//         "XCD": {
//             "name": "Eastern Caribbean dollar",
//             "symbol": "$"
//         }
//     },
//     {
//         "ILS": {
//             "name": "Israeli new shekel",
//             "symbol": "₪"
//         }
//     },
//     {
//         "PAB": {
//             "name": "Panamanian balboa",
//             "symbol": "B/."
//         },
//     },
//     {
//         "BGN": {
//             "name": "Bulgarian lev",
//             "symbol": "лв"
//         }
//     },
//     {
//         "XOF": {
//             "name": "West African CFA franc",
//             "symbol": "Fr"
//         }
//     },
//     {
//         "DKK": {
//             "name": "Danish krone",
//         }
//     },
//     {
//         "SSP": {
//             "name": "South Sudanese pound",
//             "symbol": "£"
//         }
//     },
//     {
//         "GMD": {
//             "name": "dalasi",
//             "symbol": "D"
//         }
//     },
//     {
//         "OMR": {
//             "name": "Omani rial",
//             "symbol": "ر.ع."
//         }
//     },
//     {
//         "RUB": {
//             "name": "Russian ruble",
//             "symbol": "₽"
//         }
//     },
//     {
//         "AOA": {
//             "name": "Angolan kwanza",
//             "symbol": "Kz"
//         }
//     },
//     {
//         "XAF": {
//             "name": "Central African CFA franc",
//             "symbol": "Fr"
//         }
//     },
//     {
//         "NPR": {
//             "name": "Nepalese rupee",
//             "symbol": "₨"
//         }
//     },
//     {
//         "EUR": {
//             "name": "Euro",
//             "symbol": "€"
//         }
//     },
//     {
//         "GBP": {
//             "name": "British pound",
//             "symbol": "£"
//         },
//         "JEP": {
//             "name": "Jersey pound",
//             "symbol": "£"
//         }
//     },
//     {
//         "KMF": {
//             "name": "Comorian franc",
//             "symbol": "Fr"
//         }
//     },
//     {
//         "INR": {
//             "name": "Indian rupee",
//             "symbol": "₹"
//         }
//     },
//     {
//         "HUF": {
//             "name": "Hungarian forint",
//             "symbol": "Ft"
//         }
//     },
//     {
//         "USD": {
//             "name": "United States dollar",
//             "symbol": "$"
//         }
//     },
//     {
//         "XPF": {
//             "name": "CFP franc",
//             "symbol": "₣"
//         }
//     },
//     {
//         "FKP": {
//             "name": "Falkland Islands pound",
//             "symbol": "£"
//         }
//     },
//     {
//         "XCD": {
//             "name": "Eastern Caribbean dollar",
//             "symbol": "$"
//         }
//     },
//     {
//         "EUR": {
//             "name": "Euro",
//             "symbol": "€"
//         }
//     },
//     {
//         "NZD": {
//             "name": "New Zealand dollar",
//             "symbol": "$"
//         }
//     },
//     {
//         "TTD": {
//             "name": "Trinidad and Tobago dollar",
//             "symbol": "$"
//         }
//     },
//     {
//         "GBP": {
//             "name": "British pound",
//             "symbol": "£"
//         },
//         "GGP": {
//             "name": "Guernsey pound",
//             "symbol": "£"
//         }
//     },
//     {
//         "XOF": {
//             "name": "West African CFA franc",
//             "symbol": "Fr"
//         }
//     },
//     {
//         "GIP": {
//             "name": "Gibraltar pound",
//             "symbol": "£"
//         }
//     },
//     {
//         "XCD": {
//             "name": "Eastern Caribbean dollar",
//             "symbol": "$"
//         }
//     },
//     {
//         "BZD": {
//             "name": "Belize dollar",
//             "symbol": "$"
//         }
//     },
//     {
//         "AUD": {
//             "name": "Australian dollar",
//             "symbol": "$"
//         },
//         "KID": {
//             "name": "Kiribati dollar",
//             "symbol": "$"
//         }
//     },
//     {
//         "MGA": {
//             "name": "Malagasy ariary",
//             "symbol": "Ar..."
//         }
//     }]