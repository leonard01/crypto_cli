module.exports = { showHelp, getPrice, getMarketData, getCoinDataByDate, getArgs, getCompareList, getExchangeRates };
const axios = require('axios')

const prefix = 'https://api.coingecko.com/api/v3/'
const usage = "\nUsage: Crypto <something_here> things";


function showHelp() {                                                            
    console.log(usage);  
    console.log('\nOptions:\r')  
    console.log('\t--version\t      ' + 'Show version number.' + '\t\t' + '[boolean]\r')  
    console.log('    -l, --Something\t' + '      ' + 'Something Something.' + '\t\t' + '[boolean]\r')  
    console.log('\t--help\t\t      ' + 'Show help.' + '\t\t\t' + '[boolean]\n')  
}


async function getPrice(coin, currency = "usd") {
    const data = await axios.get(`${prefix}simple/price?ids=${coin}&vs_currencies=${currency}`).then(response => response.data)
    if (!data[coin]) {
        throw new Error("Coin Not Found")
    }
    return data
}


async function getMarketData(coin) {
    let data
    try {
      data = await axios.get(`${prefix}coins/markets?vs_currency=usd&ids=${coin}&order=market_cap_desc&per_page=100&page=1&sparkline=false`).then(response => response.data)
    } catch (err) {
        throw new Error ("Error: ", err.response.data.error)
    }
    return data

}


async function getCoinDataByDate(coin, date = getTodayDate()) {

    let data
    try {
         data = await axios.get(`${prefix}coins/${coin}/history?date=${date}`).then(response => response.data)
    } catch (err) {
        throw new Error ("Error: ", err.response.data.error)
    }
    return data
}

async function getCompareList() {
    let data
    try {
         data = await axios.get(`${prefix}simple/supported_vs_currencies`).then(response => response.data)
    } catch (err) {
        throw new Error ("Error: ", err.response.data.error)
    }
    return data
}

async function getExchangeRates() {
    let data
    try {
         data = await axios.get(`${prefix}exchange_rates`).then(response => response.data)
    } catch (err) {
        throw new Error ("Error: ", err.response.data.error)
    }
    return data

}

//to change to switch
function getArgs(argsIn) {
    if (JSON.stringify(argsIn).toLowerCase().includes("comparelist")) {
     return "comparelist"
    }
    if (JSON.stringify(argsIn).toLowerCase().includes("coin")) {
        return "coin"
    }
    if (JSON.stringify(argsIn).toLowerCase().includes("exchangerate")) {
        return "exchangerate"
    }
}


function getTodayDate() {
    const today = new Date();
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1; // Months start at 0!
    let dd = today.getDate();

    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;

    const formattedToday = dd + '-' + mm + '-' + yyyy;
    return formattedToday
}


function randomInvestmentAdvice() {
    
    const rand = Math.random()
    console.log(rand)
    switch (rand) {
        case 
    }
}
