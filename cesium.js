
var options = {
    animation: false,
    baseLayerPicker: false,
    fullscreenButton: false,
    vrButton: false,
    geocoder: false,
    homeButton: false,
    infoBox: false,
    sceneModePicker: false,
    selectionIndicator: false,
    timeline: false,
    navigationHelpButton: false,
    navigationInstructionsInitiallyVisible: false,
    skyBox: false,
    skyAtmosphere: false
};
    window.CESIUM_BASE_URL = "http://127.0.0.1:5500/";

var viewer = new Cesium.Viewer('cesiumContainer', options);





