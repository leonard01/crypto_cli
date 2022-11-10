#! /usr/bin/env node

const { demandOption, argv } = require("yargs");

(async () => {
const yargs = require("yargs")
const utils = require("./utils.js")

const usage = "\nUsage: Crypto <command> utilies";
yargs  
    .usage(usage)
    // .option("coin", {  describe: "Return price for coin", type: "boolean", demandOption: true })     
    // .option("market", {  describe: "Return market data for coin", type: "boolean", demandOption: true })
    .help(true)  
    .argv;

    //crypto price commands
yargs.command({
    command: 'price',
    describe: 'Return coin price',
    builder: {
        coin: {
            describe:'Coin To Price',
            demandOption: false, 
            type: 'string'
        },
        currency: {
            describe: 'Currency for comparison, USD by default',
            demandOption: false,
            type: 'string'           
        },
        exchangerate: {
            describe: 'Btc Exchange Rates',
            demandOption: false,
            type: 'string'         
        },
        comparelist: {
            describe: 'Available currencies for comparision',
            demandOption: false,
            type: 'string'
        }
    },

    async handler() {
        let currency
        switch (utils.getArgs(argv)) {
            case "comparelist":
                const compareRes = await utils.getCompareList()
                console.log(compareRes)
                break;
            case "coin":
                if (argv.currency) {
                    currency = argv.currency
                }
                const priceRes = await utils.getPrice(argv.coin, currency)
                console.log("Result for ",
                    (argv.coin) + " \n" +
                    JSON.stringify(priceRes))
                break;
            case "exchangerate":
                const exchangeRes = await utils.getExchangeRates()
                console.log(exchangeRes)
                break;
            default:
                throw new Error("Invalid Args Passed")
        }     
    }
})  
    
 // crypto market commands
yargs.command({
    command: 'market',
    describe: 'Return market data',
    builder: {
        coin: {
            describe:'Coin to return market data for',
            demandOption: 'true', // required
            type: 'string'
        }
    },
    async handler(argv) {
       const res =  await utils.getMarketData(argv.coin)
        console.log("Result for ", 
            (argv.coin) + " \n" +
            JSON.stringify(res))
    }
})

yargs.command({
    command: 'data',
    describe: 'Return coin data by date',
    builder: {
        coin: {
            describe:'Coin to return data for',
            demandOption: true,
            type: 'string'
        },
        date: {
            describe: 'Date for returned data in format 30-12-2020',
            demandOption: false,
            type: 'string' // date type?
        }
    },
    async handler(argv) {
       const res =  await utils.getCoinDataByDate(argv.coin, argv.date)
        console.log("Result for ", 
            (argv.coin) + " on date " + (argv.date) + " \n" +
            JSON.stringify(res))
    }
})

yargs.parse() 
})()