var dgram = require('dgram'),
    assert = require('assert'),
    util = require('util'),
    events = require('events');

function Holiday(address, port) {
    events.EventEmitter.call(this);
    this.address = address;
    this.port = port || 9988;
    this.socket = dgram.createSocket('udp4');
    this.check = this.check.bind(this);
}

util.inherits(Holiday, events.EventEmitter);

Holiday.prototype.send = function send(frame, callback) {
    var bytes = new Uint8Array(160);
    for (var idx = 0; idx < 50; idx++) {
        var colour = frame[idx],
            offset = 10 + (idx * 3);
        if (colour && colour.length) {
            bytes[offset++] = colour[0] || 0;
            bytes[offset++] = colour[1] || 0;
            bytes[offset] = colour[2] || 0;
        }
    }
    var packet = new Buffer(bytes);
    this.socket.send(packet, 0, packet.length, this.port, this.address, callback || this.check);
};

Holiday.prototype.check = function check(err) {
    if (err) {
        this.emit('error', err);
    }
};

module.exports = Holiday;