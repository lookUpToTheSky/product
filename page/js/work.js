importScripts('./three.min.js', './BufferGeometryUtils.js', './OBJLoader.js', './MTLLoader.js');
self.addEventListener('message', (e) => {
    const xhr = new XMLHttpRequest()
    xhr.open('get', '/geojson/cs_city.json')
    xhr.onload = (res) => {
        if (xhr.status === 200) {
            data = JSON.parse(xhr.response)
            const cityArr = []
            data.features.forEach(item => {
                item.geometry.coordinates.forEach(ele => {
                    let shape = new THREE.Shape()
                    ele.forEach((val, i) => {
                    let x = val[0], y = val[1];
                        i === 0 ?  shape.moveTo(x, y) : shape.lineTo(x,y)
                    })
                    let extrudeSettings = { 
                        depth: item.properties.height/20000,
                        curveSegments: 6,
                        bevelEnabled: false
                    }
                    let Sgeo = new THREE.ExtrudeGeometry( shape, extrudeSettings );
                    cityArr.push(Sgeo)
                })
            })
            const geometry = THREE.BufferGeometryUtils.mergeBufferGeometries(cityArr)
            postMessage(geometry.attributes)
        }
    }
    xhr.send()
})
