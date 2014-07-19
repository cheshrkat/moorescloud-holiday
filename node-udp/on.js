var args = process.argv,
    holidayName = args[2] || 'enlightenment',
    Holiday = require('holiday-udp'),
    holiday = new Holiday(holidayName);

// This is a bit contrived/unusual, but since the on/off demos are so simple 
// it makes sense to exit the process immediately as they can't do anything more.
function successCallback() {
    console.log("...and done!");
    process.exit(0); // stops the script http://nodejs.org/api/process.html#process_process_exit_code
}

var frame = [
    [255,255,255], [255,255,255], [255,255,255], [255,255,255], [255,255,255], [255,255,255],
    [255,255,255], [255,255,255], [255,255,255], [255,255,255], [255,255,255], [255,255,255],
    [255,255,255], [255,255,255], [255,255,255], [255,255,255], [255,255,255], [255,255,255],
    [255,255,255], [255,255,255], [255,255,255], [255,255,255], [255,255,255], [255,255,255],
    [255,255,255], [255,255,255], [255,255,255], [255,255,255], [255,255,255], [255,255,255],
    [255,255,255], [255,255,255], [255,255,255], [255,255,255], [255,255,255], [255,255,255],
    [255,255,255], [255,255,255], [255,255,255], [255,255,255], [255,255,255], [255,255,255],
    [255,255,255], [255,255,255], [255,255,255], [255,255,255], [255,255,255], [255,255,255],
    [255,255,255], [255,255,255], [255,255,255], [255,255,255], [255,255,255], [255,255,255],
    [255,255,255], [255,255,255], [255,255,255], [255,255,255], [255,255,255], [255,255,255]
];

console.log("Usage: node on.js <holidayname>");
console.log("Holiday named " + holiday.address + " lights on...");
holiday.send(frame, successCallback);