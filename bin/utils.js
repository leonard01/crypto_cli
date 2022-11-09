module.exports = { showHelp, getPrice, getMarketData, getCoinDataByDate, getArgs, getCompareList };
const axios = require('axios')

const usage = "\nUsage: Crypto <something_here> things";


function showHelp() {                                                            
    console.log(usage);  
    console.log('\nOptions:\r')  
    console.log('\t--version\t      ' + 'Show version number.' + '\t\t' + '[boolean]\r')  
    console.log('    -l, --Something\t' + '      ' + 'Something Something.' + '\t\t' + '[boolean]\r')  
    console.log('\t--help\t\t      ' + 'Show help.' + '\t\t\t' + '[boolean]\n')  
}


async function getPrice(coin, currency = "usd") {

    const data = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=${coin}&vs_currencies=${currency}`).then(response => response.data)
    if (!data[coin]) {
        throw new Error("Coin Not Found")
    }
    return data
}


async function getMarketData(coin) {
    
    const data = await axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${coin}&order=market_cap_desc&per_page=100&page=1&sparkline=false`).then(response => response.data)
    // todo add error handling for coin not found
    return data

}


async function getCoinDataByDate(coin, date) {
    // todo: add date validation
    let data
    try {
         data = await axios.get(`https://api.coingecko.com/api/v3/coins/${coin}/history?date=${date}`).then(response => response.data)
    } catch (err) {
        throw new Error ("Error: ", err.response.data.error)
    }
    return data
}

async function getCompareList() {
    let data
    try {
         data = await axios.get(`https://api.coingecko.com/api/v3/simple/supported_vs_currencies`).then(response => response.data)
    } catch (err) {
        throw new Error ("Error: ", err.response.data.error)
    }
    return data
}


function getArgs(argsIn) {
    if (JSON.stringify(argsIn).toLowerCase().includes("comparelist")) {
     return "comparelist"
    } else if (JSON.stringify(argsIn).toLowerCase().includes("coin")) {
        return "coin"
 }
}