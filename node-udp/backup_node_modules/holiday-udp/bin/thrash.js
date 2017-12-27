#!/usr/bin/env node

var Holiday = require('../lib/'),
    util = require('util'),
    optimist = require('optimist')
        .usage('Usage: $0 [options] address')
        .options('h', { alias: 'help', boolean: true, describe: 'Help' });
    argv = optimist.argv;

if (argv._.length !== 1 || argv.help) {
    optimist.showHelp();
    process.exit(1);
}

var address = argv._[0],
    holiday = new Holiday(address),
    globes = new Array(50);

console.log(util.format('spamming %s', address));

function randomGlobe() {
    return Math.round(Math.random() * 49);
}

function randomByteValue() {
    return Math.round(Math.random() * 256);
}

function randomColour() {
    return [ randomByteValue(), randomByteValue(), randomByteValue() ];
}

function spam() {
    globes[randomGlobe()] = randomColour();
    holiday.send(globes);
}

setInterval(spam, 0).unref();