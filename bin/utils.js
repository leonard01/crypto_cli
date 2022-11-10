module.exports = { showHelp, getPrice, getMarketData, getCoinDataByDate, getArgs, getCompareList, getExchangeRates, randomInvestmentAdvice };
const axios = require('axios')
const fs = require('fs')
const arrPath = "./bin/coins.json"
const coinArry = ["btc", "eth", "usdt", "bnb", "usdc", "busd", "xrp", "ada", "doge", "matic"]  // temp


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
    randomCoin()
    randomBuySell()
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
    const rand = Math.floor(Math.random() * 10)
    switch (true) {
        case rand <= 1:
            console.log("Jamie Dimon is calling the death of BTC. Buy, buy, buy. Go all in")
            break;
        case rand > 1 && rand <= 3:
            console.log("If the taxi driver is talking about it then you know it's time to sell")
            break;
        case rand > 3 && rand <= 5:
            console.log("Mt. Gox is hiring, caution advised")
            break;
        case rand > 5 && rand <= 7:
            console.log("Hodl")
            break;
        case rand > 7 && rand <= 10:
            console.log(`You should ${randomBuySell()} ${randomCoin()}`)
            break;
        default:
            throw new Error("Random number generator messed up")
    }
}

function randomCoin() {
    const randCoin = coinArry[Math.floor(Math.random() * coinArry.length)]
    return randCoin
}

function randomBuySell() {
    const rand = Math.floor(Math.random() * Math.floor(2))
    if (rand == 0) {
        return "Buy"
    } else {
        return "Sell"
    }
}


function readJsonArrFromFile(path) {
    const data = JSON.parse(fs.readFileSync(path))
    console.log(data)
    return data
}