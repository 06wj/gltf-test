var modelInfo = ModelIndex.getCurrentModel();
if (!modelInfo) {
    modelInfo = TutorialModelIndex.getCurrentModel();
}
if (!modelInfo) {
    modelInfo = TutorialPbrModelIndex.getCurrentModel();
}
if (!modelInfo) {
    modelInfo = TutorialFurtherPbrModelIndex.getCurrentModel();
}
if (!modelInfo) {
    modelInfo = TutorialAgiPbrModelIndex.getCurrentModel();
}
if (!modelInfo) {
    document.getElementById('container').innerHTML = 'Please specify a model to load';
    throw new Error('Model not specified or not found in list.');
}

var url = "../../" + modelInfo.category + "/" + modelInfo.path;

var ROTATE = true;
var gui = new dat.GUI();
var mapRotate = gui.add(window, 'ROTATE').name('Rotate');

var viewer = new QMV.Viewer(document.getElementById('container'), {
    // Full config at
    // https://github.com/pissang/qtek-model-viewer/blob/master/src/defaultSceneConfig.js
    devicePixelRatio: 1,
    // Enable shadow
    shadow: true,
    shadowQuality: 'high',
    // Environment panorama texture url.
    mainLight: {
        intensity: 1.0
    },
    ambientCubemapLight: {
        exposure: 1,
        diffuseIntensity: 0.2
    }
});

// Load a glTF model
// Model will be fit in 10x10x10 automatically after load.
// Return an eventful object.
viewer.loadModel(url, {
        // Shading mode. 'standard'|'lambert'
        shader: 'standard'
    })
    // Model loaded. not include textures.
    .on('loadmodel', function (modelStat) {
        // Set camera options.
        viewer.setCameraControl({
            // Alpha is rotation from bottom to up.
            alpha: 10,
            // Beta is rotation from left to right.
            beta: 30,
            distance: 20,
            // Min distance of zoom.
            minDistance: 1,
            // Max distance of zoom.
            maxDistance: 100,

            // Center of target.
            center: [0, 0, 0],

            // If auto rotate.
            //autoRotate: true,
            autoRotate: ROTATE,

            // Degree per second.
            autoRotateSpeed: 20,

            // Direction of autoRotate. cw or ccw when looking top down.
            autoRotateDirection: 'cw',

            // Start auto rotating after still for the given time
            autoRotateAfterStill: 30
        });

        // Set main light options.
        viewer.setMainLight({
            // Main light intensity
            intensity: 1,
            // Main light color string
            color: '#fff',
            // Alpha is rotation from bottom to up.
            alpha: 45,
            // Beta is rotation from left to right.
            beta: 45
        });
/*
        // Set ambient light options
        viewer.setAmbientLight({
            // Ambient light intensity
            intensity: 0.8
        });
*/
        // Set ambient cubemap light options
        viewer.setAmbientCubemapLight({
            // Ambient cubemap light intensity
            intensity: 0.8,
            // Ambient Cubemap Texture
            texture: '../../textures/hdr/pisa.hdr'
        });
        viewer.start();
/*
        // Load extra animation glTF
        viewer.loadAnimation('asset/xiniu/xiniu_stand_as.gltf')
            .on('success', function () {
                console.log('Changed animation')
            });
*/
        // Animation pause and start
        viewer.pauseAnimation();
        viewer.resumeAnimation();

    })
    .on('ready', function () {
        console.log('All loaded inlcuding textures.');
    })
    .on('error', function () {
        console.log('Model load error');
    });

mapRotate.onChange(function (value) {
    viewer.setCameraControl({autoRotate: value});
});
