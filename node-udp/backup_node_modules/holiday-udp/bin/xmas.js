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

// A simple sprite: a span of colour with a position along the string of
// globes and a per-frame velocity. 
function MovingSpan(colour, width, velocity) {
    this.offset = 0;
    this.colour = colour;
    this.width = width;
    this.velocity = velocity;
}

MovingSpan.prototype.paint = function(frame) {
    var begin = Math.round(this.offset),
        end = begin + this.width;
    for (var pos = begin; pos < end; pos++) {
        var idx = pos % 50;
        if (idx < 0) { 
            idx += 50;
        }
        frame[idx] = this.colour;
    }
    this.offset += this.velocity;
};

// A simple animation engine: each frame, calls each sprite's paint
// method with a frame as an argument, then sends it to the Holiday.
function LoopPainter(holiday, background) {
    this.holiday = holiday;
    this.background = background;
    this.frame = new Array(50);
    this.sprites = [];
}

LoopPainter.prototype.start = function(ms) {
    this.timer = setInterval(this.paint.bind(this), ms || 10);
    this.timer.unref();
    process.once('exit', this.stop.bind(this));
};

LoopPainter.prototype.stop = function() {
    if (this.timer) {
        clearInterval(this.timer);
        this.timer = undefined;
    }
};

LoopPainter.prototype.push = function(sprite) {
    this.sprites.push(sprite);
};

LoopPainter.prototype.paint = function() {
    var frame = this.frame;
    this.fill();
    this.sprites.forEach(function(sprite) {
        sprite.paint(frame);
    });
    this.holiday.send(this.frame);
};

LoopPainter.prototype.fill = function(colour) {
    for (var idx = 0; idx < 50; idx++) {
        this.frame[idx] = colour || this.background;
    }
};

var address = argv._[0],
    holiday = new Holiday(address),
    WHITE = [ 255, 255, 255 ],
    GREEN = [ 0, 128, 0 ],
    RED = [ 255, 0, 0 ],
    painter = new LoopPainter(holiday, GREEN);

painter.push(new MovingSpan(RED, 7, 0.2));
painter.push(new MovingSpan(RED, 5, 0.25));
painter.push(new MovingSpan(WHITE, 5, 0.3));
painter.push(new MovingSpan(WHITE, 2, -0.1));
painter.start();

console.log(util.format('animating red and white spans on green background on %s', address));
