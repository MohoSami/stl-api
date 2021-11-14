const NodeStl = require("node-stl");

const DENSITIES = {
    'DEFAULT': 1.24,
    'PLA': 1.25,
    'ABS': 1.05
};

function getStlData(stlFile, material, density) {
    let stlDensity = DENSITIES['DEFAULT'];

    if (density && !isNaN(density)) {
        stlDensity = density;
    } else {
        stlDensity = DENSITIES[material.toUpperCase()] || DENSITIES['DEFAULT'];
    }

    const stl = new NodeStl(stlFile, { density: stlDensity });
    const stlData = {
        volume: {
            value: stl.volume,
            unit: 'cm^3'
        },
        weight: {
            value: stl.weight,
            unit: 'gm'
        },
        boundingBox: {
            value: stl.boundingBox,
            unit: 'mm'
        },
        area: {
            value: stl.area,
            unit: 'm'
        },
        centerOfMass: {
            value: stl.centerOfMass,
            unit: 'mm'
        }
    };

    return stlData;
}

module.exports = {
    getStlData
}