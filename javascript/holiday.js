(function(){

    /* Takes a string and converts it to an array. Presumes that the string is array-like, ie. has square brackets and commas. Coerces number strings to numbers. */
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

    /* 
    Returns 
    { "lights": [ "#ffffff", "#ffffff", ... ]} 
    ...with 50 values in total.
    Filler: Hex value to "fill" the array to 50
    Runner: Array of hex values to start the array
    */
    function createFrame(filler,runner) {
        var frame = [];
        var fillSource = filler.split(',');
        var fillLength = 50;

        // for (var ii = 0; ii < fillLength; ii++) {
        //     frame.push(filler);
        // }
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

        return JSON.stringify({ "lights": frame });
    }

    function setLights(lights) {
        console.log("Lights: " + lights);
        var request = new XMLHttpRequest();
        request.open('PUT', '/iotas/0.1/device/moorescloud.holiday/localhost/setlights', true);
        request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        request.send(lights);
    }

    function visualiseLights(lights) {
        var current = document.getElementById('current');
        current.innerHTML = '';

        if (lights) {
            var currentLightArray = JSON.parse(lights);

            for(var i=0; i < currentLightArray.lights.length; i++) {
                var currentLight = document.createElement('span');
                var currentColour = currentLightArray.lights[i];

                currentLight.style.background = currentColour;

                if (currentColour === '#000000') {
                    currentLight.style.borderColor = '#fff';
                }

                current.appendChild(currentLight);
            }
        }
    }

    function setAndVisualise(lights) {
        // setLights only works on the holiday; so if you're viewing this locally 
        // we just skip hitting the API. You can still visualise the lights.
        if (window.location.protocol != 'file:') {
            setLights(lights);
        }
        if (document.getElementById('visualise').checked) {
            visualiseLights(lights);
        } else {
            visualiseLights(false);
        }
    }

    var onButton = document.getElementById('on');
    var offButton = document.getElementById('off');
    onButton.addEventListener('click', function(){
        setAndVisualise(createFrame('#ffffff'));
        return false;
    });
    offButton.addEventListener('click', function(){
        setAndVisualise(createFrame('#000000'));
        return false;
    });

    var html5hexInput = document.getElementById("html5hex");
    var html5hexOnButton = document.getElementById("html5hexOn");
    html5hexOnButton.addEventListener('click', function(){
        setAndVisualise(createFrame(html5hexInput.value));
        return false;
    });

    var multiHexInput = document.getElementById("multiHex");
    var multiHexOnButton = document.getElementById("multiHexOn");
    multiHexOnButton.addEventListener('click', function(){
        setAndVisualise(createFrame(multiHexInput.value));
        return false;
    });

    var hexInput = document.getElementById("hex");
    var hexOnButton = document.getElementById("hexOn");
    hexOnButton.addEventListener('click', function(){
        var hexColour = hexInput.value;
        if (hexColour.length === 6) {
            setAndVisualise(createFrame('#' + hexInput.value));
        } else {
            alert("You must enter 6 digits, no #.");
            setTimeout(function(){hexInput.focus();}, 1);
        }
        return false;
    });

})();