(function(){

    var viewingLocalhost = (window.location.protocol != 'file:'); // boolean

    // log(content) {
    //     if (viewingLocalhost) {
    //         console.log(content);
    //     }
    // }

    /* Takes a string and converts it to an array. Presumes that the string is array-like, ie. has square brackets and commas. Coerces number strings to numbers. */
    /*
    function strToArray (source) {
        var strings, result = [];
        var regexMulti = /\]\s?\,\s?\[/g; // ],[
        var regexBrackets = /[\[\]]/g; // [ and ]

        function convertToArr(str) {
            var sourcestr = str.replace(regexBrackets,'');
            var arr = sourcestr.split(',');
            // coerce number strings
            for(var i=0, ii = arr.length; i<ii; i++) {
                if ( !isNaN(arr[i]) ) {
                    arr[i] = +arr[i];
                }
            }
            return arr;
        }

        if (typeof(source) === 'string') {
            if (regexMulti.test(source)) {
                strings = source.split(regexMulti);
                for (var i = 0, ii = strings.length; i < ii; i++) {
                    result.push( convertToArr(strings[i]) );
                }
            } else {
                result = convertToArr(source);
            }
            return result;
        } else {
            return 'Error: input not a string.';
        }

    }
    */

    // Returns array of desired length created by looping through source array
    function fillArr(source, size) {
        var arr = [],
            i,
            limit = source.length - 1,
            counter = 0;

        for (i=0; i<size; i++) {
            arr.push(source[counter]);
            counter = (counter === limit) ? 0 : counter+1;
        }

        return arr;
    }

    /*  Returns { "lights": [ "#ffffff", "#ffffff", ... ]} with 50 values in total.
        Filler: Hex value to "fill" the array to 50
        Runner: Array of hex values to start the array */
    function createFrame(filler,runner) {
        var frame = [],
            fillSource = filler.split(','),
            fillLength = 50,
            result = {};

        frame = fillArr(fillSource, fillLength);
        console.log("frame: " + frame);
        console.log("filler: " + JSON.stringify(filler));

        if (runner) {
            var runLen = runner.length;
            fillLength = fillLength - runLen;
            for (var i = 0; i < runLen; i++) {
                frame.push(runner[i]);
            }
            console.log("runner: " + JSON.stringify(runner));
            console.log("Lengths: runner - " + runner.length + ", filler - " + fillLength);
        }

        currentLightFrame = { "lights": frame };
        console.log("currentLightFrame", currentLightFrame);
        return currentLightFrame;
    }

    // cheers to http://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
    function hexToRgb(hex) {
        console.log("hex: " + hex);
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        var res = result ? [
            parseInt(result[1], 16),
            parseInt(result[2], 16),
            parseInt(result[3], 16)
        ] : hex;

        console.log("hex converted: ", res);
        return res;
    }

    function createGradFrame(from,to,steps) {
        var gradFrom = from || [0, 0, 0];
        var gradTo = to || [255, 0, 0];
        var gradSteps = steps || 50; // 50 = 1 second

        if ( typeof gradFrom === 'string') {
            gradFrom = hexToRgb(gradFrom);
        }
        if ( typeof gradTo === 'string') {
            gradTo = hexToRgb(gradTo);
        }

        var gradJSON = {
            "begin": gradFrom,
            "end": gradTo,
            "steps": gradSteps
        };
        console.log("createGradFrame", gradJSON);
        return gradJSON;
    }

    function setLights(lights,lightType) {
        var type = lightType || 'setlights'; // can be 'setlights' or 'gradient'
        var apiURL = '/iotas/0.1/device/moorescloud.holiday/localhost/' + type;

        // console.log("setLights",lights);
        // console.log("lightType",lightType);
        // console.log("apiURL",apiURL);
 
        var request = new XMLHttpRequest();
        request.open('PUT', apiURL, true);
        request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        request.send(JSON.stringify(lights));
    }

    function visualiseLights(lights,lightType) {
        var current = document.getElementById('current');
        current.innerHTML = '';

        if (lights) {
            var currentLightArray = lights;
            len = 50;

            if (lightType != 'gradient') {
                len = currentLightArray.lights.length;
            }

            for(var i=0; i < len; i++) {
                var currentLight = document.createElement('span');
                var currentColour;

                if (lightType === 'gradient') {
                    currentColour = currentLightArray.end;
                    currentLight.style.background = 'rgb(' + currentColour + ')';
                } else {
                    currentColour = currentLightArray.lights[i];
                    currentLight.style.background = currentColour;

                    if (currentColour === '#000000') {
                        currentLight.style.borderColor = '#fff';
                    }
                }

                current.appendChild(currentLight);
            }
        }
    }

    function setAndVisualise(lights,lightType) {
        // setLights only works on the holiday; so if you're viewing this locally 
        // we just skip hitting the API. You can still visualise the lights.
        if (document.getElementById('visualise').checked) {
            visualiseLights(lights,lightType);
        } else {
            visualiseLights(false);
        }
        if (viewingLocalhost) {
            setLights(lights,lightType);
        }
    }

    function shiftFrame() {
        var shifted = currentLightFrame.lights.shift();
        currentLightFrame.lights.push(shifted);
    }

    function stopChase() {
        if (timer !== null) {
            clearInterval(timer);
            timer = null;
        }
    }
    var chaseintInput = document.getElementById('chaseint');
    var timer = null,
        value = 0;
    document.getElementById('startChase').addEventListener('click', function(){
        var interval = chaseintInput.value || 1000;
        if (interval < 100) {
            alert("Interval of 100+ recommended.");
            return;
        }
        stopChase();
        timer = setInterval(function () {
            shiftFrame();
            setAndVisualise(currentLightFrame);
        }, interval);
        return false;
    });
    document.getElementById('stopChase').addEventListener('click', function(){
        stopChase();
        return false;
    });

    document.getElementById('on').addEventListener('click', function(){
        setAndVisualise(createFrame('#ffffff'));
        return false;
    });
    document.getElementById('off').addEventListener('click', function(){
        setAndVisualise(createFrame('#000000'));
        stopChase();
        return false;
    });

    var html5hexInput = document.getElementById("html5hex");
    document.getElementById("html5hexOn").addEventListener('click', function(){
        setAndVisualise(createFrame(html5hexInput.value));
        // this.innerText = "Set on (" + html5hexInput.value + ")";
        return false;
    });

    var multiHexInput = document.getElementById("multiHex");
    document.getElementById("multiHexOn").addEventListener('click', function(){
        setAndVisualise(createFrame(multiHexInput.value));
        return false;
    });

    var hexInput = document.getElementById("hex");
    document.getElementById("hexOn").addEventListener('click', function(){
        var hexColour = hexInput.value;
        setAndVisualise(createFrame(hexInput.value));
        return false;
    });

    var gradInput = document.getElementById("grad");
    document.getElementById("gradOn").addEventListener('click', function(){
        setAndVisualise(createGradFrame('#000000', gradInput.value),'gradient');
        return false;
    });
    document.getElementById("gradOff").addEventListener('click', function(){
        setAndVisualise(createGradFrame(gradInput.value, [0,0,0]),'gradient');
        return false;
    });

})();