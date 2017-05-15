/*
hlToCountry maps Google Suggest supported options for the
HL parameter to country speaking this language.
It attributes a Country to a language when the latter is
the most widely used in former, or when it significantly used
in a country where the first or official language is not supported
by Google.
Main source is Wikipedia.
*/

var hlToCountry = {
    'sv': {
        "langName": "Swedish",
        "countries": [
            {"id": "SE", "countryName": "Sweden"},
        ]
    },
    'da': {
        "langName": "Danish",
        "countries": [
            {"id": "DK", "countryName": "Denmark"},
        ]
    },
    'lt': {
        "langName": "Lithuanian",
        "countries": [
            {"id": "LT" , "countryName": "Lithuania" },
        ]
    },
    'de': {
        "langName": "German",
        "countries": [
            {"id": "DE", "countryName": "Germany"},
            {"id": "CH", "countryName": "Switzerland"},
            {"id": "AT", "countryName": "Austria"},
        ]
    },
    'hr': {
        "langName": "Croatian",
        "countries": [
            {"id": "HR", "countryName": "Croatia"},
        ]
    },
    'et': {
        "langName": "Estonian",
        "countries": [
            {"id": "EE", "countryName": "Estonia"},
        ]
    },
    'ar': {
        "langName": "Arabic",
        "countries": [
            {"id": "DZ", "countryName": "Algeria"},
            {"id": "EG", "countryName": "Egypt"},
            {"id": "IQ", "countryName": "Iraq"},
            {"id": "JO", "countryName": "Jordan"},
            {"id": "KW", "countryName": "Kuwait"},
            {"id": "LB", "countryName": "Lebanon"},
            {"id": "LY", "countryName": "Libya"},
            {"id": "MR", "countryName": "Mauritania"},
            {"id": "MA", "countryName": "Morocco"},
            {"id": "OM", "countryName": "Oman"},
            {"id": "QA", "countryName": "Qatar"},
            {"id": "SA", "countryName": "Saudi Arabia"},
            {"id": "SD", "countryName": "Sudan"},
            {"id": "SY", "countryName": "Syria"},
            {"id": "TN", "countryName": "Tunisia"},
            {"id": "EH", "countryName": "Western Sahara"},
            {"id": "AE", "countryName": "United Arab Emirates"},
            {"id": "YE", "countryName": "Yemen"}
        ]
    },
    'ru': {
        "langName": "Russian",
        "countries": [
            {"id": "RU", "countryName": "Russia"},
            {"id": "BY", "countryName": "Belarus"},
        ]
    },
    'mg': {
        "langName": "Malagasy",
        "countries": [
            {"id": "MG", "countryName": "Madagascar"},
        ]
    },
    'ro': {
        "langName": "Romanian",
        "countries": [
            {"id": "RO", "countryName": "Romania"},
            {"id": "MD", "countryName": "Moldova"},
        ]
    },
    'vi': {
        "langName": "Vietnamese",
        "countries": [
            {"id": "VN", "countryName": "Vietnam"},
        ]
    },
    'is': {
        "langName": "Icelandic",
        "countries": [
            {"id": "IS", "countryName": "Iceland"},
        ]
    },
    'pt-PT': {
        "langName": "Portuguese (Portugal)",
        "countries": [
            {"id": "PT", "countryName": "Portugal"},
            {"id": "AO", "countryName": "Angola"},
            {"id": "MZ", "countryName": "Mozambique"},
        ]
    },
    'sl': {
        "langName": "Slovenian",
        "countries": [
            {"id": "SI", "countryName": "Slovenia"},
        ]
    },
    'tr': {
        "langName": "Turkish",
        "countries": [
            {"id": "TR", "countryName": "Turkey"},
        ]
    },
    'lv': {
        "langName": "Latvian",
        "countries": [
            {"id": "LV", "countryName": "Latvia"},
        ]
    },
    'hu': {
        "langName": "Hungarian",
        "countries": [
            {"id": "HU", "countryName": "Hungary"},
        ]
    },
    'th': {
        "langName": "Thai",
        "countries": [
            {"id": "TH", "countryName": "Thailand"},
        ]
    },
    'rw': {
        "langName": "Kinyarwanda",
        "countries": [
            {"id": "RW", "countryName": "Rwanda"},
        ]
    },
    'sw': {
        "langName": "Swahili",
        "countries": [
            {"id": "UG", "countryName": "Uganda"},
            {"id": "TZ", "countryName": "Tanzania"},
            {"id": "KE", "countryName": "Kenya"},
        ]
    },
    'it': {
        "langName": "Italian",
        "countries": [
            {"id": "IT", "countryName": "Italy"},
        ]
    },
    'fi': {
        "langName": "Finnish",
        "countries": [
            {"id": "FI", "countryName": "Finland"},
        ]
    },
    'ms': {
        "langName": "Malay",
        "countries": [
            {"id": "MY", "countryName": "Malaysia"},
            {"id": "BN", "countryName": "Brunei"},
        ]
    },
    'hi': {
        "langName": "Hindi",
        "countries": [
            {"id": "IN", "countryName": "India"},
        ]
    },
    // 'ca': {
    //     "langName": "Catalan",
    //     "countries": [
    //         {"id": , "countryName": },
    //     ]
    // },
    'ko': {
        "langName": "Korean",
        "countries": [
            {"id": "KP", "countryName": "North Korea"},
            {"id": "KR", "countryName": "South Korea"},
        ]
    },
    'pl': {
        "langName": "Polish",
        "countries": [
            {"id": "PL", "countryName": "Poland"},
        ]
    },
    'id': {
        "langName": "Indonesian",
        "countries": [
            {"id": "ID", "countryName": "Indonesia"},
        ]
    },
    'bg': {
        "langName": "Bulgarian",
        "countries": [
            {"id": "BG", "countryName": "Bulgaria"},
        ]
    },
    'ti': {
        "langName": "Tigrinya",
        "countries": [
            {"id": "ER", "countryName": "Eritrea"},
        ]
    },
    'nl': {
        "langName": "Dutch",
        "countries": [
            {"id": "NL", "countryName": "Netherlands"},
            {"id": "SR", "countryName": "Suriname"},
            {"id": "BE", "countryName": "Belgium"},
        ]
    },
    'sk': {
        "langName": "Slovak",
        "countries": [
            {"id": "SK", "countryName": "Slovakia"},
        ]
    },
    'el': {
        "langName": "Greek",
        "countries": [
            {"id": "GR", "countryName": "Greece"},
            {"id": "CY", "countryName": "Cyprus"},
        ]
    },
    'uk': {
        "langName": "Ukrainian",
        "countries": [
            {"id": "UA", "countryName": "Ukraine"},
        ]
    },
    'ja': {
        "langName": "Japanese",
        "countries": [
            {"id": "JP", "countryName": "Japan"},
        ]
    },
    'cs': {
        "langName": "Czech",
        "countries": [
            {"id": "CZ", "countryName": "Czech Republic"},
        ]
    },
    'sr': {
        "langName": "Serbian",
        "countries": [
            {"id": "RS", "countryName": "Serbia"},
        ]
    },
    'zh-TW': {
        "langName": "Chinese (Traditional)",
        "countries": [
            {"id": "TW", "countryName": "Taiwan"},
        ]
    },
    'ta': {
        "langName": "Tamil",
        "countries": [
            {"id": "LK", "countryName": "Sri Lanka"},
        ]
    },
    'pt-BR': {
        "langName": "Portuguese (Brazil)",
        "countries": [
            {"id": "BR", "countryName": "Brazil"},
        ]
    },
    'iw': {
        "langName": "Hebrew",
        "countries": [
            {"id": "IL", "countryName": "Israel"},
        ]
    },
    'zh-CN': {
        "langName": "Chinese (Simplified)",
        "countries": [
            {"id": "CN", "countryName": "China"},
        ]
    },
    // 'ch': {
    //     "langName": "Chamorro",
    //     "countries": [
    //         {"id": , "countryName": },
    //     ]
    // },
    'fil': {
        "langName": "Filipino",
        "countries": [
            {"id": "PH", "countryName": "Philippines"},
        ]
    },
    'fr': {
        "langName": "French",
        "countries": [
            {"id": "FR", "countryName": "France"},
            {"id": "CD", "countryName": "Democratic Republic of Congo"},
            {"id": "CM", "countryName": "Cameroon"},
            {"id": "CI", "countryName": "Ivory Coast"},
            {"id": "BF", "countryName": "Burkina Faso"},
            {"id": "NE", "countryName": "Niger"},
            {"id": "SN", "countryName": "Senegal"},
            {"id": "ML", "countryName": "Mali"},
            {"id": "HT", "countryName": "Haiti"},
            {"id": "GN", "countryName": "Guinea"},
            {"id": "GF", "countryName": "French Guiana"},
            {"id": "BJ", "countryName": "Benin"},
            {"id": "CG", "countryName": "Republic of Congo"},
            {"id": "GA", "countryName": "Gabon"},
        ]
    },
    'en': {
        "langName": "English",
        "countries": [
            {"id": "NG", "countryName": "Nigeria"},
            {"id": "CA", "countryName": "Canada"},
            {"id": "GH", "countryName": "Ghana"},
            {"id": "MW", "countryName": "Malawi"},
            {"id": "ZM", "countryName": "Zambia"},
            {"id": "SS", "countryName": "South Sudan"},
            {"id": "IE", "countryName": "Ireland"},
            {"id": "LR", "countryName": "Liberia"},
            {"id": "GM", "countryName": "Gambia"},
            {"id": "GY", "countryName": "Guyana"},
            {"id": "BS", "countryName": "Bahamas"},
            {"id": "BZ", "countryName": "Belize"},
            {"id": "AU", "countryName": "Australia"},
            {"id": "NZ", "countryName": "New Zealand"},
            {"id": "GB", "countryName": "United Kingdom"},
            {"id": "US", "countryName": "United States"},
        ]
    },
    'es': {
        "langName": "Spanish",
        "countries": [
            {"id": "MX", "countryName": "Mexico"},
            {"id": "CO", "countryName": "Colombia"},
            {"id": "ES", "countryName": "Spain"},
            {"id": "AR", "countryName": "Argentina"},
            {"id": "PE", "countryName": "Peru"},
            {"id": "VE", "countryName": "Venezuela"},
            {"id": "CL", "countryName": "Chile"},
            {"id": "EC", "countryName": "Ecuador"},
            {"id": "GT", "countryName": "Guatemala"},
            {"id": "CU", "countryName": "Cuba"},
            {"id": "BO", "countryName": "Bolivia"},
            {"id": "DO", "countryName": "Dominican Republic"},
            {"id": "HN", "countryName": "Honduras"},
            {"id": "PY", "countryName": "Paraguay"},
            {"id": "SV", "countryName": "El Salvador"},
            {"id": "NI", "countryName": "Nicaragua"},
            {"id": "CR", "countryName": "Costa Rica"},
            {"id": "PR", "countryName": "Puerto Rico"},
            {"id": "PA", "countryName": "Panama"},
            {"id": "UY", "countryName": "Uruguay"},
        ]
    },
    'no': {
        "langName": "Norwegian",
        "countries": [
            {"id": "NO", "countryName": "Norway"},
        ]
    },
}
