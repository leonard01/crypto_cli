#! /usr/bin/env node
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

yargs.command({
    command: 'price',
    describe: 'Return coin price',
    builder: {
        coin:
        {
            describe:'Coin To Price',
            demandOption: 'true', // required
            type: 'string'
        }
    },
   async handler(argv) {
       const res =  await utils.getPrice(argv.coin)
        console.log("Result for ", 
            (argv.coin) + " \n" +
            JSON.stringify(res))
    }
})
 
yargs.command({
    command: 'market',
    describe: 'Return market data',
    builder: {
        coin:
        {
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
        coin:
        {
            describe:'Coin to return data for',
            demandOption: 'true', // required
            type: 'string'
        },
        date:
        {
            describe: 'Date for returned data in format 30-12-2020',
            demandOption: 'true', // todo: default to today,
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



yargs.parse() // To set above changes
})()