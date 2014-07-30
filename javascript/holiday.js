(function(){

    var onButton = document.getElementById('on');
    var offButton = document.getElementById('off');

    var onString = JSON.stringify({ "lights":
      [ "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff",
        "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff",
        "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff",
        "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff",
        "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff",
        "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff",
        "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff",
        "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff",
        "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff",
        "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff"
      ]});
    var offString = JSON.stringify({ "lights":
      [ "#000000", "#000000", "#000000", "#000000", "#000000",
        "#000000", "#000000", "#000000", "#000000", "#000000",
        "#000000", "#000000", "#000000", "#000000", "#000000",
        "#000000", "#000000", "#000000", "#000000", "#000000",
        "#000000", "#000000", "#000000", "#000000", "#000000",
        "#000000", "#000000", "#000000", "#000000", "#000000",
        "#000000", "#000000", "#000000", "#000000", "#000000",
        "#000000", "#000000", "#000000", "#000000", "#000000",
        "#000000", "#000000", "#000000", "#000000", "#000000",
        "#000000", "#000000", "#000000", "#000000", "#000000"
      ]});

    function setLights(lights) {
        var request = new XMLHttpRequest();
        request.open('PUT', '/iotas/0.1/device/moorescloud.holiday/localhost/setlights', true);
        request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        request.send(lights);
    }

    onButton.addEventListener('click', function(){
        setLights(onString);
        return false;
    });
    offButton.addEventListener('click', function(){
        setLights(offString);
        return false;
    });

})();